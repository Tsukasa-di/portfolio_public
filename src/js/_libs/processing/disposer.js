export function disposer(objs) {
  objs.traverse(obj => {
    scanning(obj);
  });

  function scanning(obj) {
    if (obj.type === 'Group') {
      obj.children.forEach(child => {
        scanning(child);
      });
    } else {
      if (obj.type === 'Mesh') {
        obj.geometry.dispose();
        if (obj.material.map) obj.material.map.dispose();
        obj.material.dispose();
      }
    }
  }
}
