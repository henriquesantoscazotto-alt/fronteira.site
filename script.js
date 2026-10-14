const input   = document.getElementById('codeInput');
const message = document.getElementById('message');
const granted = document.getElementById('granted');

// ⚠️ CONFIGURE AQUI
const REDIRECT_URL  = 'https://exemplo.com';   // troque pelo destino
const VALID_ANSWERS = ['mar preto'];           // senha aceita

// ============================================
// TEXTO ESCONDIDO DE FUNDO
// ============================================
const HIDDEN_TEXT = "Uma imensidão enegrecida, mas não algo lindo como o espaço, pois lá não há estrelas... A água cheira a enxofre ao mesmo tempo que cheira a diversas comidas estragadas, sendo algo único de se sentir, algo nunca antes sentido, uma mistura esquisita que cada vez mais parece não possuir uma definição ou representação, são os cheiros das águas pretas e das criaturas que lá habitam. O lugar sempre parece algo vivo, mesmo não sendo, quando machucada reage com ódio, quando explorada se fecha, quando se chega perto de seu final ela se embaralha e se violenta...";

// Preenche o fundo repetindo o texto até cobrir a tela
function fillBackgroundText() {
  const bgEl = document.getElementById('bgText');
  if (!bgEl) return;

  // Repete o texto várias vezes até preencher visualmente
  const repetitions = 12;
  let content = '';
  for (let i = 0; i < repetitions; i++) {
    content += HIDDEN_TEXT + ' ';
  }
  bgEl.textContent = content;
}

fillBackgroundText();

// ============================================
// NORMALIZAÇÃO E VERIFICAÇÃO
// ============================================
function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')   // remove acentos
    .replace(/\s+/g, ' ')              // colapsa espaços múltiplos
    .trim();
}

function tryAccess() {
  const value = normalize(input.value);

  if (VALID_ANSWERS.includes(value)) {
    // Sucesso — intensifica a música dramaticamente
    const music = document.getElementById('bgMusic');
    if (music && soundEnabled) {
      music.volume = Math.min(1.0, music.volume + 0.4);
    }

    granted.classList.add('active');

    setTimeout(() => {
      window.location.href = REDIRECT_URL;
    }, 2500);

  } else {
    input.classList.add('error');
    message.classList.add('show');

    setTimeout(() => {
      input.classList.remove('error');
      message.classList.remove('show');
    }, 1800);
  }
}

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    tryAccess();
  }
});
