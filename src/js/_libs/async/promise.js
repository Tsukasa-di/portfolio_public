export function promise(cb) {
  return new Promise(resolve => {
    cb(resolve);
  });
}
