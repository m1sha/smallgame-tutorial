const Array2D = {
  toIndex: (i: number, j: number, width: number) => i * width + j,
  fromIndex: (index: number, width: number) => [0 | (index / width), index % width]
}

export { Array2D }