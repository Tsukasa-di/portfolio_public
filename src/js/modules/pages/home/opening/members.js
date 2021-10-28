const typing = {
  i: null,
  permition: false,
  speed: 0,
  resolve: null,
  animate() {
    typing.i.animate('inRAF', typing.speed, typing.resolve);
    if (typing.permition) requestAnimationFrame(typing.animate);
  }
};

const DOM = {
  canvas: null,
  canvasMask: null,
  opening: null,
  openingP: null,
  launched: null
};

export { typing, DOM };
