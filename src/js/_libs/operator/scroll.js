export class ScrollTop {
  constructor(target) {
    this.vals = {
      target: 0,
      current: 0
    },
    this.target = target
  }

  scroll() {
    this.vals.target = 0;
    this.vals.current = this.target.scrollTop;
  
    function animate() {
      this.vals.current += (this.vals.target - this.vals.current) * 0.18;
      this.target.scroll(0, this.vals.current);
      if (this.vals.current >= this.vals.target + 1) requestAnimationFrame(animate.bind(this));
    }
    animate.bind(this)();
  }
}
