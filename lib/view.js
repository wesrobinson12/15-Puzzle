class View {
  constructor(puzzle, board) {
    this.puzzle = puzzle;
    this.board = board;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    const view = this;
    const panels = document.getElementsByTagName('li');

    Array.from(panels).forEach((block) => {
      block.addEventListener('click', function() {
        view.moveBlock(block);
      });
    });
  }

  moveBlock(panel) {
    this.board.movePanel(panel);
  }

  shuffledValues() {
    const array = [];

    for (let i = 1; i < 16; i++) {
      array.push(i);
    }

    return this.shuffle(array);
  }

  shuffle(values) {
    let temp = null;
    let j = 0;

    for (let i = values.length - 1; i >= 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = values[i];
      values[i] = values[j];
      values[j] = temp;
    }

    return values;
  }

  setupBoard() {
    const grid = document.createElement('ul');
    const shuffled = this.shuffledValues();
    this.puzzle.appendChild(grid);

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const panel = document.createElement('li');
        panel.setAttribute('data-pos', [i,j]);

        if (i === 3 && j === 3) {
          panel.setAttribute('data-attr', "empty");
          panel.className = 'empty';
          grid.appendChild(panel);
        } else {
          panel.setAttribute('data-attr', shuffled[(i * 4) + j]);
          panel.className = 'panel';
          grid.appendChild(panel);
        }
      }
    }
  }
}

module.exports = View;
