export const globalLight = {
  color: new THREE.Color(0xCF70CB),
  intensity: 1.9,
  decay: 5.0,
  distance: 281,
  angle: 0.53,
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
  color: new THREE.Color(0xFFFFFF),
  intensity: 1.9,
  decay: 5.01,
  distance: 212,
  angle: 2.04,
  penumbra: 0.4901,
  position: {
    x: -9.1,
    y: 17.81,
    z: 4.01
  },
  target: {
    position: {
      x: 4.31,
      y: 7.366,
      z: 3.771
    }
  }
}
