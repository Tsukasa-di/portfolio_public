export function swiper(screen, target, status, resolve) {
  if (status.swiper && screen.TABLET()) {
    const over = 50;
    target.style.opacity = 1;
    target.style.transition = '.7s';
    target.style.height = target.clientHeight + 'px';
    target.querySelector('p').style.marginBottom = over*2 + 'px';
    window.scrollTo(0, 0);

    window.addEventListener('touchmove', () => {
      if (window.scrollY >= 18) {
        target.style.opacity = 0;
        setTimeout(() => {
          target.style.pointerEvents = 'none';
        }, 700);
        resolve();
      }
    });
  } else target.style.display = 'none';
}
