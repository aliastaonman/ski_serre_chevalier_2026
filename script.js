// ==========================================
// 1. VERROU DE SÉCURITÉ & BIENVENUE
// ==========================================
if (localStorage.getItem('skiAccess') !== 'granted') {
    window.location.href = "index.html"; 
}

// Affichage du prénom
window.onload = function() {
    const userName = localStorage.getItem('userName') || "AGENT";
    const welcomeEl = document.getElementById('userWelcome');
    if (welcomeEl) welcomeEl.innerHTML = "WELCOME " + userName;
};

// ==========================================
// 2. CONFIGURATION DU DÉCOMPTE
// ==========================================
const countdownElement = document.getElementById("countdown");
const targetDate = new Date("2026-03-07T19:00:00").getTime();

function updateCountdown() {
  const now = Date.now();
  const diff = targetDate - now;

if (diff <= 0) {
    countdownElement.innerHTML = "READY<br>LET'S GO!";
    const startBtn = document.getElementById("startBtn");
    if (startBtn) {
        startBtn.innerHTML = "LAUNCH VIDEO";
        startBtn.classList.remove("locked");
        startBtn.disabled = false;
        startBtn.style.background = "#ffd700";
        startBtn.style.color = "#000";
    }
    // SUPPRIME OU COMMENTE CETTE LIGNE :
    // document.querySelector(".hint-text").innerHTML = "ENJOY THE RIDE!"; 
    return;
}

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

updateCountdown();
setInterval(updateCountdown, 1000);

const music = document.getElementById('bg-music');
const volumeBtn = document.getElementById('volume-control');
const volumeIcon = document.getElementById('volume-icon');

if (volumeBtn && music) {
    volumeBtn.addEventListener('click', () => {
        if (music.paused) {
            music.play().catch(e => console.log("L'audio n'a pas pu démarrer :", e));
            volumeIcon.innerText = "🔊";
        } else {
            music.pause();
            volumeIcon.innerText = "🔇";
        }
    });
}