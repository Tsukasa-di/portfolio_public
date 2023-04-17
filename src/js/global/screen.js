import { OP } from "../_libs/operator/node";

export const SCREEN = {
  WIDTH: function () {
    const width = OP.node.qs('html').clientWidth;
    return width <= 1920 ? width : 1920;
  },
  HEIGHT: function () {
    const height = OP.node.qs('html').clientHeight;
    if (height > 1080) OP.node.qs('html').style.marginTop = ( (height - 1080) / 2 ) + 'px';
    return height <= 1080 ? height : 1080;
  },
  TABLET: function () {
    if (this.WIDTH() <= 1024) return true;
    else false;
  },
  MINI: function () {
    if (this.WIDTH() <= 600) return true;
    else false;
  }
}
