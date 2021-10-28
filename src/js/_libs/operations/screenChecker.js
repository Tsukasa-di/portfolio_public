export function screenChecker(target, status) {
  if (innerWidth > innerHeight) {
    target.style.opacity = 0;
    document.querySelector('html').style.overflow = 'visible';
    status.screenCheck = true;
  } else {
    target.style.opacity = 1;
    document.querySelector('html').style.overflow = 'hidden';
    status.screenCheck = false;
  }
  return status.screenCheck;
}
