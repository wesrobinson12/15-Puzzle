/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const View = __webpack_require__(1);
	const Board = __webpack_require__(2);
	
	document.addEventListener("DOMContentLoaded", () => {
	  const puzzle = document.getElementById("puzzle");
	  const board = new Board();
	  new View(puzzle, board);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map