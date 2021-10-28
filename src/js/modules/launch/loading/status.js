import { members } from "./members";

const status = {};

Object.keys(members).forEach(member => {
  status[member] = {
    progress: 0,
    length: members[member].length,
    fix: false
  }
});

status.ready = false;

export { status };
