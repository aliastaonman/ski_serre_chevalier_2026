// ==========================================
// 0. DONNÉES DES AGENTS (À ajouter ici !)
// ==========================================
const AGENTS_DATA = {
    "TMTHT20263001SRCH": { fullName: "TOM THETIOT", avatar: "Photos pixels/pxArtTom.png" },
    "MRLH20263001SRCH": { fullName: "MARIE LE HENAFF", avatar: "Photos pixels/pxArtMarie.png" },
    "M4X4EVER20263001SRCH": { fullName: "MAXIME L'HUILIER", avatar: "Photos pixels/pxArtMaxime.png" },
    "MNMS20263001SRCH": { fullName: "EMMA DASCALU", avatar: "Photos pixels/pxArtEmma.png" },
    "ETTBRT20263001SRCH": { fullName: "ETIENNE BROTTIN", avatar: "Photos pixels/pxArtEtienne.png" },
    "CHLBRT20263001SRCH": { fullName: "CHLOÉ BROUETTE", avatar: "Photos pixels/pxArtChloe.png" },
    "XRDFBN20263001SRCH": { fullName: "FABIEN DEREUX", avatar: "Photos pixels/pxArtFabien.png" },
    "RH20263001SRCH": { fullName: "ROSE HOANG", avatar: "Photos pixels/pxArtRose.png" },
    "MTSMNCH20263001SRCH": { fullName: "MATHIS MANACH", avatar: "Photos pixels/pxArtMathis.png" },
    "JHFR20263001SRCH": { fullName: "JOHAN FAURE", avatar: "Photos pixels/pxArtJohan.png" },
    "ANNACONDA20263001SRCH": { fullName: "ANNA SHTETO", avatar: "Photos pixels/pxArtAnna.png" },
    "RCD20263001SRCH": { fullName: "REMI CARREAUD", avatar: "Photos pixels/pxArtRemi.png" }
};

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
// const targetDate = new Date("2026-03-07T19:40:00").getTime();
const targetDate = new Date("2026-02-06T17:10:00").getTime();
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
            countdownElement.innerHTML = "YOUR SKI PASS IS READY";
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
    // 1. Récupérer les infos de l'agent
    const code = localStorage.getItem('agentCode');
    const agentNameEl = document.getElementById('agentName');
    const agentAvatarEl = document.getElementById('agentAvatar');

    if (code && AGENTS_DATA[code]) {
        // On remplace le nom et la photo par les vrais
        if (agentNameEl) agentNameEl.innerText = AGENTS_DATA[code].fullName;
        if (agentAvatarEl) agentAvatarEl.src = AGENTS_DATA[code].avatar;
    }

    // 2. Affichage
    document.getElementById("countdown-container").style.display = "none";
    const videoReveal = document.getElementById("video-reveal");
    videoReveal.style.display = "block";
    videoReveal.style.setProperty('display', 'block', 'important');

    if (music) music.pause(); 
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