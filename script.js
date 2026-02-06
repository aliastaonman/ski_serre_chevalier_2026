// ==========================================
// 1. VERROU DE SÉCURITÉ & BIENVENUE
// ==========================================
if (localStorage.getItem('skiAccess') !== 'granted') {
    window.location.href = "index.html"; 
}

window.onload = function() {
    const userName = localStorage.getItem('userName') || "AGENT";
    const welcomeEl = document.getElementById('userWelcome');
    if (welcomeEl) welcomeEl.innerHTML = "WELCOME " + userName;
};

// ==========================================
// 2. CONFIGURATION DU DÉCOMPTE & UNLOCK
// ==========================================
const countdownElement = document.getElementById("countdown");
const targetDate = new Date("2026-02-06T12:43:00").getTime();
let videoLaunched = false; 

function updateCountdown() {
    const now = Date.now();
    const diff = targetDate - now;
    const startBtn = document.getElementById("startBtn");

    // SI LE TEMPS N'EST PAS FINI
    if (diff > 0) {
        document.getElementById("countdown-container").style.display = "block";
        document.getElementById("video-reveal").style.display = "none";
        
        const s = Math.floor(diff / 1000);
        const d = Math.floor(s / 86400);
        const h = Math.floor((s % 86400) / 3600);
        const m = Math.floor((s % 3600) / 60);
        const sec = s % 60;

        const dDisplay = d < 10 ? "0" + d : d;
        const hDisplay = h < 10 ? "0" + h : h;
        const mDisplay = m < 10 ? "0" + m : m;
        const sDisplay = sec < 10 ? "0" + sec : sec;

        countdownElement.innerHTML = `${dDisplay}D ${hDisplay}H<br>${mDisplay}M ${sDisplay}S`;
    } 
    // SI LE TEMPS EST FINI
    else {
        if (!videoLaunched && startBtn && startBtn.classList.contains("locked")) {
            countdownElement.innerHTML = "SYSTEM READY";
            startBtn.innerHTML = "UNLOCK VIDEO";
            startBtn.disabled = false;
            startBtn.classList.remove("locked");
            startBtn.classList.add("unlocked");

            // AU CLIC SUR LE BOUTON
            startBtn.onclick = function() {
                startBtn.style.display = "none";
                runLoadingSequence();
            };
        }
    }
}

// FONCTION BARRE DE CHARGEMENT
function runLoadingSequence() {
    const loadingZone = document.getElementById("loading-zone");
    const progressFill = document.getElementById("progress-fill");
    loadingZone.style.display = "block";

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 3; // Vitesse du chargement
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(revealVideo, 500); 
        }
        progressFill.style.width = progress + "%";
    }, 60);
}

// FONCTION RÉVÉLATION VIDÉO
function revealVideo() {
    // On cache tout le container du décompte et de chargement
    document.getElementById("countdown-container").style.display = "none";
    
    // On affiche le bloc avec le logo YouTube
    const videoReveal = document.getElementById("video-reveal");
    videoReveal.style.display = "block";
    
    // On retire le !important du style inline si nécessaire
    videoReveal.style.setProperty('display', 'block', 'important');

    if (music) music.pause(); // On coupe la musique
    videoLaunched = true;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ==========================================
// 3. GESTION DU SON
// ==========================================
const music = document.getElementById('bg-music');
const volumeBtn = document.getElementById('volume-control');
const volumeIcon = document.getElementById('volume-icon');

if (volumeBtn && music) {
    volumeBtn.addEventListener('click', () => {
        if (music.paused) {
            music.play().catch(e => console.log("Bloqué"));
            volumeIcon.innerText = "🔊";
        } else {
            music.pause();
            volumeIcon.innerText = "🔇";
        }
    });
}