export function changer(type) {
  const changersEls = document.querySelectorAll('.changers p');
  changersEls.forEach( el => {
    el.addEventListener('click', e => {
      type.set(e.target.dataset.changer);
      changersEls.forEach( r => {
        r.classList.remove('active');
      });
      e.target.classList.add('active');
    });
  });
}
