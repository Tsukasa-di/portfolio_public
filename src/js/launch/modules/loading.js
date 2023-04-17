import { DOM } from "../../global/dom";

export class Loading {
  constructor(launch, finish) {
    this.launch = launch;
    this.finish = finish;
    this.active = {
      master: true,
      boost: false
    };
    this.vals = {
      max: 0,
      current: 0,
      target: 0,
      length: 0,
      currentProgress: 0
    };
    this.animateType = 'low';
  }

  init() {
    Object.keys(this.launch.status).forEach( key => {
      this.vals.length++;
    });
    this._load();
  }

  _load() {
    this.vals.max = window.innerWidth;
    this.animateType = 'low'
    this._go();
  }

  _go() {
    function master() {
      this.vals.max = window.innerWidth;
      this.vals.target = this.vals.max;
      this._upper();

      if (this.vals.currentProgress != this.launch.progress) {
        this.active.boost = true;
        this.vals.target = (
          (this.vals.max / (this.vals.length+1)) * (this.launch.progress+1)
        );
        this.animateType = 'high';
        this._boost();
      } else if (this.launch.progress == this.vals.length) this.animateType = 'high';
      if (this.active.master == true) requestAnimationFrame(master.bind(this));

      if (this.vals.current >= this.vals.max - 1) {
        this.active.master = false;
        this.finish();
      }

      setTimeout(() => {
        this.animateType = 'high';
      }, 5000);

      setTimeout(() => {
        this.active.master = false;
        this.finish(); 
      }, 7500);
    }
    master.bind(this)();
  }

  _boost() {
    this.active.boost = this._upper();
    if (this.active.boost == true) {
      this.active.master = false;
      requestAnimationFrame(this._boost.bind(this));
    } else {
      this.vals.currentProgress = this.launch.progress;
      this.active.master = true;
      this.animateType = 'low';
      this._go();
    }
  }

  _upper() {
    this.vals.current += (this.vals.target - this.vals.current) * (this.animateType == 'low' ? 0.0015 : 0.08);
    DOM.LOADING.bar.style.width = this.vals.current + 'px';
    return (this.vals.current >= this.vals.target - 1) ? false : true;
  }
}
