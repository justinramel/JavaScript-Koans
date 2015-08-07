var SAMURAIPRINCIPLE = {
  'true': {
    '2': true,
    '3': true
  },
  'false': {
    '3': true
  }
};

SAMURAIPRINCIPLE.isCellAliveInNextGeneration = function (isCellAlive, numberOfNeighbours) {
  return SAMURAIPRINCIPLE[isCellAlive].hasOwnProperty(numberOfNeighbours);
  // return isCellAlive && numberOfNeighbours === 2 || numberOfNeighbours === 3;
};
// function getColour(colourName) {
//   var colours = {
//     red: 0xFF0000,
//     green: 0x00FF00
//   }

//   return colours[colourName];


//   // if (colourName === 'red') {
//   //   return 0xFF0000;
//   // } else if (colourName === 'green') {
//   //   retur 0x00FF00;
//   // }
// }