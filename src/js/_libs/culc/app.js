export const CULC = {
  getRGBColor(type, max, min) {
    const val = Math.floor( (Math.random() * max) + min );
    switch (type) {
      case 'red':
        return 'rgba(' + val + ', ' + 13 + ', ' + 13 + ')';
      case 'green':
        return 'rgba(' + 20 + ', ' + val + ', ' + 20 + ')';
      case 'yellow':
        return 'rgba(' + val + ', ' + val + ', ' + 0 + ')';
      default:
        return 'rgba(' + val + ', ' + val + ', ' + val + ')';
    }
  }
}
