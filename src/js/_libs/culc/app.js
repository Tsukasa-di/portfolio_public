export const CULC = {
  getRGBColor(type, max, min) {
    const val = Math.floor( (Math.random() * max) + min );
    switch (type) {
      case 'red':
        return 'rgba(' + val + ', ' + 0 + ', ' + 0 + ')';
      case 'green':
        return 'rgba(' + 0 + ', ' + val + ', ' + 0 + ')';
      case 'yellow':
        return 'rgba(' + val + ', ' + val + ', ' + 0 + ')';
      default:
        return 'rgba(' + val + ', ' + val + ', ' + val + ')';
    }
  }
}
