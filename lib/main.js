const View = require('./view.js');
const Board = require('./logic/board.js');

document.addEventListener("DOMContentLoaded", () => {
  const puzzle = document.getElementById("puzzle");
  const board = new Board();
  new View(puzzle, board);
});
