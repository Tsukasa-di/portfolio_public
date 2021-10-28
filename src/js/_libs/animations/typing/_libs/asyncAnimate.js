import { processing } from "./processing";

export async function asyncAnimate(Typing, typeSum, roop) {
  function pm(count) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (Typing._try === true) processing('async', Typing, count, roop, resolve);
      }, 10);
    });
  }
  for (let i = 0; i < typeSum; i++) {
    await pm(i);
  }
}
