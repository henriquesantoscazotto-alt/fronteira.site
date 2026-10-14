// ============================================
// ÁUDIO DE FUNDO — Sua música em loop
// ============================================

let soundEnabled = true;

const bgMusic = document.getElementById('bgMusic');
const soundToggle = document.getElementById('soundToggle');

// Volume inicial (ajuste como preferir — 0.0 a 1.0)
const BASE_VOLUME = 0.35;
bgMusic.volume = BASE_VOLUME;

// Inicia a música na primeira interação
// (navegadores exigem interação do usuário para autoplay)
function startAudioOnFirstInteraction() {
  bgMusic.play().catch((err) => {
    console.warn('Não foi possível tocar o áudio:', err);
  });

  document.removeEventListener('click', startAudioOnFirstInteraction);
  document.removeEventListener('keydown', startAudioOnFirstInteraction);
}

document.addEventListener('click', startAudioOnFirstInteraction);
document.addEventListener('keydown', startAudioOnFirstInteraction);

// Botão de som (mutar / ativar)
soundToggle.addEventListener('click', (e) => {
  e.stopPropagation();

  soundEnabled = !soundEnabled;

  if (soundEnabled) {
    bgMusic.play().catch(() => {});
    soundToggle.textContent = '♪';
    soundToggle.style.color = '#555';
  } else {
    bgMusic.pause();
    soundToggle.textContent = '✕';
    soundToggle.style.color = '#2a2a2a';
  }
});tabas/audio.js
