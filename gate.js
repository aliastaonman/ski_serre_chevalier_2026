const PASSWORDS_MAP = {
  "TMTHT20263001SRCH": "TOM",
  "MRLH20263001SRCH": "MARIE",
  "M4X4EVER20263001SRCH": "MAX",
  "MNMS20263001SRCH": "EMMA",
  "ETTBRT20263001SRCH": "ETIENNE",
  "CHLBRT20263001SRCH": "CHLOÉ",
  "XRDFBN20263001SRCH": "FAB",
  "RH20263001SRCH": "ROSE",
  "MTSMNCH20263001SRCH": "MATHIS",
  "JHFR20263001SRCH": "JOHAN",
  "ANNACONDA20263001SRCH": "ANNA",
  "RCD20263001SRCH": "REMI"
};

function checkAccess() {
  const input = document.getElementById('passInput').value.trim().toUpperCase();
  const error = document.getElementById('errorMessage');

  if (PASSWORDS_MAP[input]) {

    // accès général
    localStorage.setItem('skiAccess', 'granted');

    // prénom (si encore utilisé ailleurs)
    localStorage.setItem('userName', PASSWORDS_MAP[input]);

    // 🔥 NOUVEAU : code agent complet
    localStorage.setItem('agentCode', input);

    window.location.href = "countdown.html";

  } else {
    error.style.display = "block";
    document.getElementById('passInput').classList.add('shake');

    setTimeout(() => {
      document.getElementById('passInput').classList.remove('shake');
    }, 500);
  }
}

document.getElementById('passInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') checkAccess();
});
