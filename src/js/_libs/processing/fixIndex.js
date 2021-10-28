export function fixIndex(input) {
  if (input === '/') return 'index.html';
  const splits = input.split('/');
  if (splits[0] === '') {
    splits.shift();
    input = splits.join('/');
  }
  if (input.includes('index.html')) return input;
  else {
    if (input.includes('/')) {
      if (splits[splits.length - 1] === '') input += 'index.html';
      else input += '/index.html';
      if (!input.includes('/')) input += '/index.html';
      return input;
    } else return input += '/index.html';
  }
}
