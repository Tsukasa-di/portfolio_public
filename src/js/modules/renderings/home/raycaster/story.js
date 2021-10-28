import { MESSAGES } from "../../../../../contents/messages/_app";
import { Typing } from "../../../../_libs/animations/typing/_app";

let typing;
let type = true;
let set = false;
let counter = 0;
const messages = MESSAGES.home.stories;

function setter() {
  typing.set(messages[counter]);

  if (counter != messages.length-1) counter++;
  else counter = 0;

  setTimeout(() => {
    typing.reseter();
    type = true;
  }, 3000);
  set = false;
}

export const story = {
  init() {
    const typeEl = document.querySelector('.story p');
    typing = new Typing(typeEl);
    typing.set(messages[0]);
    counter++;
  },
  animate() {
    if (!type && set) setter();
    if (type) {
      set = true;
      type = typing.animate('inRAF', 6);
    }
  }
}
