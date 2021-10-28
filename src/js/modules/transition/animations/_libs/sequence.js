export function sequence(callback, timeout) {
  return new Promise(resolve => {
    setTimeout(() => {
      callback();
      resolve();
    }, timeout);
  })
}
