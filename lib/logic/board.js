class Board {
  constructor() {

  }

  movePanel(panel) {
    const coords = panel.getAttribute('data-pos');
    const empty = this.emptyPanel();

    if (coords === empty) {
      return;
    } else if (this.validMove(coords, empty, 0)) {
      this.movePanels(panel, empty, 0);
    } else if (this.validMove(coords, empty, 2)) {
      this.movePanels(panel, empty, 2);
    }
  }

  validMove(panel, empty, axis) {
    return panel[axis] === empty[axis];
  }

  movePanels(panel, empty, axis) {
    panel.className = "empty";
    let value = panel.getAttribute('data-attr');
    const coords = panel.getAttribute('data-pos');
    let other = axis === 0 ? 2 : 0;

    if (coords[other] > empty[other]) {
      for (let i = parseInt(coords[other]) - 1; i >= parseInt(empty[other]); i--) {
          value = this.handleShift(coords, axis, value, i);
          panel.setAttribute('data-attr', "empty");
        }
    } else if (coords[other] < empty[other]) {
        for (let i = parseInt(coords[other]) + 1; i <= parseInt(empty[other]); i++) {
          value = this.handleShift(coords, axis, value, i);
          panel.setAttribute('data-attr', "empty");
        }
    }
  }

  handleShift(coords, axis, value, i) {
    let pos = axis === 0 ? `${coords[axis]},${i}` : `${i},${coords[axis]}`;
    let newPanel = document.querySelector(`[data-pos="${pos}"]`);
    let newValue = newPanel.getAttribute('data-attr', value);
    newPanel.className = "panel";
    newPanel.setAttribute('data-attr', value);
    return newValue;
  }

  emptyPanel() {
    const panels = document.getElementsByTagName('li');
    let empty;

    Array.from(panels).forEach((panel) => {
      if (panel.getAttribute('data-attr') === "empty") {
        empty = panel.getAttribute('data-pos');
      }
    });

    return empty;
  }
}

module.exports = Board;
