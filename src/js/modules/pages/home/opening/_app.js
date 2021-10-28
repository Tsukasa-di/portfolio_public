import { init } from "./init";
import { performer } from "./performer";
import { skip } from "./skip";

export const opening = {
  init: init,
  _true: performer,
  _false: skip
}
