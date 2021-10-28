export const globalLight = {
  color: new THREE.Color(0xCF70CB),
  intensity: 3.5,
  decay: 8.2,
  distance: 256,
  angle: 1.76,
  penumbra: 0.74,
  position: {
    x: 4.346,
    y: 18.002,
    z: -13.164
  },
  target: {
    position: {
      x: 5.693,
      y: 0.01,
      z: 15.121
    }
  }
}

export const spotLight = {
  color: new THREE.Color(0xFFFFFF),
  intensity: 2.51,
  decay: 2.3,
  distance: 113,
  angle: 0.51,
  penumbra: 0.46,
  position: {
    x: 0.3,
    y: 10.41,
    z: -14.01
  },
  target: {
    position: {
      x: -10.47,
      y: -3.736,
      z: 0.305
    }
  }
}
