export type AsteroidSettings = {
  genTime: number
  speed: number
  angularSpeed: number
  maxCount: number
}

  const asteroidsSettings: AsteroidSettings[] = [
    {
      genTime: 2500,
      angularSpeed: 10,
      speed: 0.75,
      maxCount: 5
    },
    {
      genTime: 3000,
      angularSpeed: 8,
      speed: 0.5,
      maxCount: 5
    },
    {
      genTime: 15500,
      angularSpeed: 4,
      speed: 0.25,
      maxCount: 2
    },
    {
      genTime: 19500,
      angularSpeed: 3,
      speed: 0.125,
      maxCount: 1
    },
    {
      genTime: 7500,
      angularSpeed: 6,
      speed: 0.65,
      maxCount: 3
    },
    {
      genTime: 3500,
      angularSpeed: 12,
      speed: 0.35,
      maxCount: 4
    }
  ]

  export { asteroidsSettings }