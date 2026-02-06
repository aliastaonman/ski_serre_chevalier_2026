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
// 2. CONFIGURATION DU DÉCOMPTE (TEST 12h10)
// ==========================================
const countdownElement = document.getElementById("countdown");
// MODIFIE LA DATE CI-DESSOUS POUR LE TEST
const targetDate = new Date("2026-02-06T13:20:00").getTime();

function updateCountdown() {
  const now = Date.now();
  const diff = targetDate - now;

  if (diff <= 0) {
	  const iframe = document.getElementById("reveal-video");
if (iframe) {
    iframe.src += "&autoplay=1"; // On ajoute l'autoplay seulement à la fin !
}
      // 1. On change le texte du décompte
      countdownElement.innerHTML = "READY<br>LET'S GO!";
      
      // 2. On cache le bouton locked et le container du décompte
      const startBtn = document.getElementById("startBtn");
      const countdownContainer = document.getElementById("countdown-container");
      
      if (startBtn) startBtn.style.display = "none";
      if (countdownContainer) countdownContainer.style.display = "none";

      // 3. ON AFFICHE LA VIDÉO
      const videoReveal = document.getElementById("video-reveal");
      if (videoReveal) {
          videoReveal.style.display = "block";
      }

      // 4. On coupe la musique pour laisser le son de la vidéo
      if (music) music.pause();
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

// ==========================================
// 3. GESTION DU SON
// ==========================================
const music = document.getElementById('bg-music');
const volumeBtn = document.getElementById('volume-control');
const volumeIcon = document.getElementById('volume-icon');

if (volumeBtn && music) {
    volumeBtn.addEventListener('click', () => {
        if (music.paused) {
            music.play().catch(e => console.log("Bloqué par le navigateur"));
            volumeIcon.innerText = "🔊";
        } else {
            music.pause();
            volumeIcon.innerText = "🔇";
        }
    });
}