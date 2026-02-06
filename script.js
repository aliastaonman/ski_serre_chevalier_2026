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
// 2. CONFIGURATION DU DÉCOMPTE (TEST 13h20)
// ==========================================
const countdownElement = document.getElementById("countdown");
const targetDate = new Date("2026-02-06T13:20:00").getTime();
let videoLaunched = false; // Pour éviter que la vidéo recharge en boucle

function updateCountdown() {
  const now = Date.now();
  const diff = targetDate - now;

  // SI LE TEMPS N'EST PAS FINI
  if (diff > 0) {
      document.getElementById("countdown-container").style.display = "block";
      document.getElementById("video-reveal").style.display = "none";
  } 
  // SI LE TEMPS EST FINI
  else {
      if (!videoLaunched) { // On ne le fait qu'une seule fois
          const iframe = document.getElementById("reveal-video");
          if (iframe) {
              iframe.src += "&autoplay=1"; 
          }
          
          document.getElementById("countdown-container").style.display = "none";
          document.getElementById("video-reveal").style.display = "block";
          
          if (music) music.pause();
          videoLaunched = true;
          return;
      }
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
            music.play().catch(e => console.log("Bloqué"));
            volumeIcon.innerText = "🔊";
        } else {
            music.pause();
            volumeIcon.innerText = "🔇";
        }
    });
}