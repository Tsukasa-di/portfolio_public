import { storage } from "./storage";

export function _loadChecker() {
  if (storage.checker()) {
    if (storage.getFlag('flag')) return false;
    else {
      storage.set({flag: true});
      return true;
    }
  } else return false;
}
