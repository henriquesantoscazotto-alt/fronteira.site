// ============================================
// ÁUDIO DE FUNDO — versão robusta com fallback
// ============================================

let soundEnabled = true;
let audioReady = false;

const bgMusic = document.getElementById('bgMusic');
const soundToggle = document.getElementById('soundToggle');

const BASE_VOLUME = 0.35;

// --------------------------------------------
// Diagnóstico: verifica se o arquivo carregou
// --------------------------------------------
bgMusic.addEventListener('loadeddata', () => {
  audioReady = true;
  bgMusic.volume = BASE_VOLUME;
  console.log('✅ Áudio carregado com sucesso.');
});

bgMusic.addEventListener('error', (e) => {
  console.error('❌ Erro ao carregar o áudio. Verifique:');
  console.error('   1. O arquivo "musica.mp3" está na MESMA pasta do index.html?');
  console.error('   2. O nome está EXATAMENTE igual (maiúsc./minúsc.)?');
  console.error('   3. É um MP3/OGG válido?');
});

// --------------------------------------------
// Inicia na primeira interação do usuário
// --------------------------------------------
function tryPlayMusic() {
  if (!audioReady && bgMusic.readyState === 0) {
    console.warn('⚠️ Áudio ainda não carregou, tentando mesmo assim...');
  }

  const playPromise = bgMusic.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log('▶️ Música tocando.');
      })
      .catch((err) => {
        console.warn('⚠️ Não foi possível tocar automaticamente:', err);
      });
  }
}

function startAudioOnFirstInteraction() {
  tryPlayMusic();
  document.removeEventListener('click', startAudioOnFirstInteraction);
  document.removeEventListener('keydown', startAudioOnFirstInteraction);
}

document.addEventListener('click', startAudioOnFirstInteraction);
document.addEventListener('keydown', startAudioOnFirstInteraction);

// --------------------------------------------
// Botão de som
// --------------------------------------------
soundToggle.addEventListener('click', (e) => {
  e.stopPropagation();

  soundEnabled = !soundEnabled;

  if (soundEnabled) {
    tryPlayMusic();
    soundToggle.textContent = '♪';
    soundToggle.style.color = '#555';
  } else {
    bgMusic.pause();
    soundToggle.textContent = '✕';
    soundToggle.style.color = '#2a2a2a';
  }
});
