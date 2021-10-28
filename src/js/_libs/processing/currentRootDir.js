import { PATHS } from "../../modules/global/variables";

export function currentRootDir() {
  let fixing = location.href.split(PATHS.root)[1];

  if (!fixing) {
    fixing = 'home';
  } else if (fixing === 'index.html') {
    fixing = 'home';
  } else if (fixing.includes('index.html')) {
    fixing = fixing.replace('/index.html', '');
  }

  if (fixing.includes('/')) {
    return fixing.replace('/', '');
  } else {
    return fixing;
  }
}
