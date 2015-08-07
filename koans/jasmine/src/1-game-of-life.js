function isCellAliveInNextGeneration(isCellAlive, numberOfNeighbours) {
  return isCellAlive && numberOfNeighbours === 2 || numberOfNeighbours === 3;
}
