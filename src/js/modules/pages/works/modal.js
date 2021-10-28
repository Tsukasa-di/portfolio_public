import { Modal } from "../../../_libs/modal/_app";

export function modal() {
  new Modal(
    {duration: 1000}
  );
  document.querySelectorAll('.firstview').forEach( el => {
    el.style.height = ( (innerHeight/100) * 90 ) + 'px';
  });
}
