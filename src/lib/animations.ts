import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
};

export const triggerPartyMode = () => {
  document.body.classList.add('party-mode');
  setTimeout(() => {
    document.body.classList.remove('party-mode');
  }, 5000);
};

export const triggerMatrix = () => {
  document.body.classList.add('matrix-effect');
  setTimeout(() => {
    document.body.classList.remove('matrix-effect');
  }, 5000);
};

export const triggerShake = () => {
  document.body.classList.add('shake-effect');
  setTimeout(() => {
    document.body.classList.remove('shake-effect');
  }, 1000);
};

export const triggerSpinning = () => {
  document.body.classList.add('spin-effect');
  setTimeout(() => {
    document.body.classList.remove('spin-effect');
  }, 2000);
};

export const triggerGravity = () => {
  document.body.classList.add('gravity-effect');
  setTimeout(() => {
    document.body.classList.remove('gravity-effect');
  }, 3000);
};