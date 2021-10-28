import { storageAvailable } from "../../../_libs/storage/storageAvailable";

export const storage = {
  checker() {
    if (storageAvailable('sessionStorage')) {
      return true;
    }
    else {
      return false;
    }
  },
  set(setted) {
    Object.keys(setted).forEach( name => {
      sessionStorage.setItem(name, setted[name]);
    });
  },
  getFlag(flag) {
    return Boolean(sessionStorage.getItem(flag));
  },
  clear() {
    sessionStorage.clear();
    console.log(sessionStorage);
  }
}
