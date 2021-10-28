import { AUDIOS, SCREEN } from "../../global/variables";

export function prompt(resolve) {
  const promptEl = document.querySelector('.CONTENTS .prompt');
  const span = promptEl.querySelector('span');
  const duration = 3000;
  span.style.transition = duration / 1000 + 's ease-in-out';
  span.classList.add('active');

  setTimeout(() => {
    if (!SCREEN.TABLET()) AUDIOS.ui.prompt.play();
    const addSpan = document.createElement('span');
    addSpan.style.transition = duration / 1000 + 's ease-in-out';
    promptEl.appendChild(addSpan);
    setTimeout(() => { addSpan.classList.add('active'); }, 300);
  }, duration/3);
  setTimeout(() => {
    resolve();
  }, duration);
}
