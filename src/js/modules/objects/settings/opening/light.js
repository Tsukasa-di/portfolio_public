export const globalLight = {
  color: new THREE.Color(0xFFFFFF),
  intensity: 1.01,
  decay: 3.61,
  distance: 216,
  angle: 0.74,
  penumbra: 0,
  position: {
    x: 0.01,
    y: 26.6,
    z: 0.01
  },
  target: {
    position: {
      x: 0.01,
      y: 0.01,
      z: 0.01
    }
  }
}

export const spotLight = {
  color: new THREE.Color(0xCF70CB),
  intensity: 5.01,
  decay: 1.01,
  distance: 33,
  angle: 0.62,
  penumbra: 0.90121,
  position: {
    x: 7.701,
    y: 0.5,
    z: -6.41
  },
  target: {
    position: {
      x: 1.01,
      y: 2.311,
      z: 0.01
    }
  }
}
