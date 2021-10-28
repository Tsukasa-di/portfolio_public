import { currentRootDir } from "../../_libs/processing/currentRootDir";
import { RENDERER } from "./variables";

let openingFinish = false;
const iPadProWidth = 1366;

export const screen = {
  WIDTH: function () {
    const width = document.querySelector('html').clientWidth;
    return width <= 1920 ? width : 1920;
  },
  HEIGHT: function () {
    const height = document.querySelector('html').clientHeight;
    if (height > 1080) document.querySelector('html').style.marginTop = ( (height - 1080) / 2 ) + 'px';
    return height <= 1080 ? height : 1080;
  },
  TABLET: function () {
    if (this.WIDTH() <= 1024) return true;
    else false;
  },
  MINI: function () {
    if (this.WIDTH() <= 600) return true;
    else false;
  },
  adjust: function() {
    if (this.WIDTH() <= iPadProWidth && this.WIDTH() / 1.5 < document.querySelector('html').clientHeight) {
      const height = this.WIDTH() / 1.5;
      const html = document.querySelector('html');

      this.HEIGHT = () => {
        return height;
      };
      RENDERER.setSize(this.WIDTH(), this.HEIGHT());
      RENDERER.setPixelRatio(window.devicePixelRatio);

      {
        const styles = {
          display: 'flex',
          alignItems: 'center'
        }
        Object.entries(styles).forEach(entry => {
          html.style[entry[0]] = entry[1];
        });
        document.body.style.height = height + 'px';
      }

      if (currentRootDir() === 'opening' && !openingFinish) {
        document.querySelector('.screen').style.width = '29.7619%';
        document.querySelector('.screen').style.height = height * 0.339168 + 'px';
        openingFinish = true;
      }

      return true;
    };
    return false;
  }
}
