const patterns = {
  // Glider pattern
  glider: {
    pattern: [
      [0, 1, 0],
      [0, 0, 1],
      [1, 1, 1],
    ],
    startPos: { x: 1, y: 1 },
    factor: 1,
  },

  // Block pattern (2x2 block)
  block: {
    pattern: [
      [1, 1],
      [1, 1],
    ],
    startPos: { x: 19, y: 4 },
    factor: 1,
  },

  // Blinker pattern (vertical line of 3)
  blinker: {
    pattern: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ],
    startPos: { x: 19, y: 4 },
    factor: 1,
  },

  // Toad pattern (2x4 block with 2 rows)
  toad: {
    pattern: [
      [0, 1, 1, 1],
      [1, 1, 1, 0],
    ],
    startPos: { x: 19, y: 4 },
    factor: 1,
  },

  // Lightweight spaceship (small spaceship)
  lightweightSpaceship: {
    pattern: [
      [0, 1, 0, 1],
      [1, 0, 1, 0],
      [0, 1, 0, 0],
    ],
    startPos: { x: 10, y: 10 },
    factor: 5,
  },

  // Medium spaceship
  mediumSpaceship: {
    pattern: [
      [0, 1, 1, 0, 1],
      [1, 0, 0, 1, 0],
      [0, 1, 1, 1, 1],
      [1, 0, 1, 0, 0],
    ],
    startPos: { x: 15, y: 15 },
    factor: 1,
  },

  // Puffer Train (a larger pattern with periodic movement)
  pufferTrain: {
    pattern: [
      [0, 1, 1, 1, 0],
      [1, 1, 0, 1, 1],
      [0, 1, 1, 1, 0],
      [1, 1, 0, 1, 1],
    ],
    startPos: { x: 10, y: 10 },
    factor: 10,
  },

  // Gosper Glider Gun (produces gliders)
  gosperGliderGun: {
    pattern: [
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1],
      [0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0],
      [0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0],
      [0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0],
      [1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1],
    ],
    startPos: { x: 10, y: 10 },
    factor: 1,
  },

  // Pulsar (large pattern that oscillates)
  pulsar: {
    pattern: [
      [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
    ],
    startPos: { x: 5, y: 5 },
    factor: 5,
  },

  // R-pentomino (starts as a small but evolves)
  rPentomino: {
    pattern: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 1, 0],
    ],
    startPos: { x: 25, y: 25 },
    factor: 1,
  },

  // Diehard (a small pattern with complex evolution)
  diehard: {
    pattern: [
      [0, 1, 0, 1],
      [1, 0, 0, 0],
      [0, 0, 0, 1],
    ],
    startPos: { x: 15, y: 15 },
    factor: 1,
  },

  // Acorn (complex evolving pattern)
  acorn: {
    pattern: [
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ],
    startPos: { x: 10, y: 10 },
    factor: 1,
  },
};

export default patterns;
