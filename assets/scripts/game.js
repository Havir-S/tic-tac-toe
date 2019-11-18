
import settingsSetup from './setup.js';

//Choose random number
function randomNumber(y) {
  if (Array.isArray(y)) {
    return y[Math.floor(Math.random() * y.length)];
  } else if (Number.isInteger(y)) {
    return Math.floor(Math.random() * y);
  } else {
    return numbers[Math.floor(Math.random() * numbers.length)];
  }
}

// ==========================================
//CREATE THE FIELD ==========================
// ==========================================
const fieldGrid = document.getElementById('gameGrid');
var obj;
//Changes grid settings and creates grid's elements
function clearField() {
  var gridObjects = document.getElementsByClassName('game-gridObject');
  var i = 0;
  while (gridObjects.length > 0) {
    gridObjects[0].remove();
  }
}

function createField(x,y) {
  //check for the last field, and if there is one, delete it
  var gridObjects = document.getElementsByClassName('game-gridObject');
  if (gridObjects.length) {
    clearField();
  }

  //prepare grid based on the settings
  var i = 0,
      settings = `repeat(${x}, 1fr) / repeat(${y}, 1fr)`;
      fieldGrid.style.grid = settings,
      column = 0,
      columnMax = y,
      row = 1,
      rowMax = x,
      options = {
        once: true,
      }

  //add all the needed grids
  for (i = 0; i < (x * y); i++) {
    //COLUMN AND ROWS ATTRIBUTES DESCRIPTION
    if (column < columnMax) {
      column++;
    } else if (column == columnMax) {
      column = 1;
      row++;
    }
    var gridObject = document.createElement('DIV');
    gridObject.setAttribute('class','game-gridObject');
    gridObject.setAttribute('data-column', column);
    gridObject.setAttribute('data-row', row);
    gridObject.setAttribute('data-box', 'none');
    fieldGrid.appendChild(gridObject);
    gridObject.innerHTML = `column: ${column} row: ${row}`;
    gridObject.addEventListener('click',makeAMove, options);
  }
}

//PLAYER VS PLAYER
function makeAMove(x) {
  this.setAttribute('data-used','true');
  if (gameObject.turn == 'player1' && gameObject.ai == 'player_vs_player') {
    this.setAttribute('data-box', 'player1');
    gameObject.turn = 'player2';
    this.innerHTML = 'x';
    console.log('I just placed x');
    //check if this move won the game
    checkForWin('player1',this);

  } else if (gameObject.turn == 'player2' && gameObject.ai == 'player_vs_player') {
    this.setAttribute('data-box', 'player2');
    gameObject.turn = 'player1';
    this.innerHTML = 'o';
    console.log('I just placed o');
    //Check if this move won the game
    checkForWin('player2',this);

  } else if (gameObject.turn == "player2" && gameObject.ai == 'player_vs_ai') {
    aiMakesARandomMove(this);
    gameObject.turn = 'player1';
    checkForWin('player2',this);
  } else if (gameObject.turn == 'player1' && gameObject.ai == 'player_vs_ai') {

  }
}

createField(5,5);

// ==========================================================================
// THIS IS WHERE THE FUN BEGINS =============================================
// ==========================================================================
function aiMakesARandomMove(x) {
  var validPositions = document.querySelectorAll('.game-gridObject[data-box="none"]'),
      choosenPosition = randomNumber(validPositions);

      choosenPosition.setAttribute('data-box', 'player2');
      choosenPosition
  console.log('Ai made a move');
}

function checkForWin(x,y) {
  var currentCol = Number(y.getAttribute('data-column')),
      currentRow =  Number(y.getAttribute('data-row'));
  //0 check
  if (
    (up1 = document.querySelector(`.game-gridObject[data-column="${currentCol}"][data-row="${currentRow - 1}"][data-box="${x}"]`)) &&
    (up2 = document.querySelector(`.game-gridObject[data-column="${currentCol}"][data-row="${currentRow - 2}"][data-box="${x}"]`))
  ) {
    console.log(`${x} wins! by 3 to up`);
  } else

  //45 check

  if (
    (upRight1 = document.querySelector(`.game-gridObject[data-column="${currentCol + 1}"][data-row="${currentRow - 1}"][data-box="${x}"]`)) &&
    (upRight2 = document.querySelector(`.game-gridObject[data-column="${currentCol + 2}"][data-row="${currentRow - 2}"][data-box="${x}"]`))
  ) {
    console.log(`${x} wins! by 3 45deg`);
  } else

  //90 check
  if (
    (right1 = document.querySelector(`.game-gridObject[data-column="${currentCol + 1}"][data-row="${currentRow}"][data-box="${x}"]`)) &&
    (right2 = document.querySelector(`.game-gridObject[data-column="${currentCol + 2}"][data-row="${currentRow}"][data-box="${x}"]`))
  ) {
    console.log(`${x} wins! by 3 to right`);
  } else

  //135 check
  if (
    (upLeft1 = document.querySelector(`.game-gridObject[data-column="${currentCol + 1}"][data-row="${currentRow + 1}"][data-box="${x}"]`)) &&
    (upLeft2 = document.querySelector(`.game-gridObject[data-column="${currentCol + 2}"][data-row="${currentRow + 2}"][data-box="${x}"]`))
  ) {
    console.log(`${x} wins! by 3 135deg`);
  } else

  //180 check
  if (
    (down1 = document.querySelector(`.game-gridObject[data-column="${currentCol}"][data-row="${currentRow + 1}"][data-box="${x}"]`)) &&
    (down2 = document.querySelector(`.game-gridObject[data-column="${currentCol}"][data-row="${currentRow + 2}"][data-box="${x}"]`))
  ) {
    console.log(`${x} wins! by 3 to down`);
  } else
  //225 check
  if (
    (downLeft1 = document.querySelector(`.game-gridObject[data-column="${currentCol - 1}"][data-row="${currentRow + 1}"][data-box="${x}"]`)) &&
    (downLeft2 = document.querySelector(`.game-gridObject[data-column="${currentCol - 2}"][data-row="${currentRow + 2}"][data-box="${x}"]`))
  ) {
    console.log(`${x} wins! by 3 225deg`);
  } else

  //270 check
  if (
    (left1 = document.querySelector(`.game-gridObject[data-column="${currentCol - 1}"][data-row="${currentRow}"][data-box="${x}"]`)) &&
    (left2 = document.querySelector(`.game-gridObject[data-column="${currentCol - 2}"][data-row="${currentRow}"][data-box="${x}"]`))
  ) {
    console.log(`${x} wins! by 3 to left`);
  } else
  //315 check
  if (
    (downLeft1 = document.querySelector(`.game-gridObject[data-column="${currentCol - 1}"][data-row="${currentRow - 1}"][data-box="${x}"]`)) &&
    (downLeft2 = document.querySelector(`.game-gridObject[data-column="${currentCol - 2}"][data-row="${currentRow - 2}"][data-box="${x}"]`))
  ) {
    console.log(`${x} wins! by 3 315deg`);
  }

  //CHECK IF THE CURRENT ONE IS IN MIDDLE IS IN MIDDLE
  //0 check middle
  if (
    (up1 = document.querySelector(`.game-gridObject[data-column="${currentCol}"][data-row="${currentRow - 1}"][data-box="${x}"]`)) &&
    (down1 = document.querySelector(`.game-gridObject[data-column="${currentCol}"][data-row="${currentRow + 1}"][data-box="${x}"]`))
  ) {
    console.log(`${x} wins! by middle 0deg`);
  } else
  //45 check middle
  if (
    (upRight1 = document.querySelector(`.game-gridObject[data-column="${currentCol + 1}"][data-row="${currentRow - 1}"][data-box="${x}"]`)) &&
    (downLeft1 = document.querySelector(`.game-gridObject[data-column="${currentCol - 1}"][data-row="${currentRow + 1}"][data-box="${x}"]`))
  ) {
    console.log(`${x} wins! by diagnal 45deg`);
  } else
  //90 check middle
  if (
    (right1 = document.querySelector(`.game-gridObject[data-column="${currentCol + 1}"][data-row="${currentRow}"][data-box="${x}"]`)) &&
    (left1 = document.querySelector(`.game-gridObject[data-column="${currentCol - 1}"][data-row="${currentRow}"][data-box="${x}"]`))
  ) {
    console.log(`${x} wins! by middle 90deg`);
  } else

  //135 check middle
  if (
    (upRight1 = document.querySelector(`.game-gridObject[data-column="${currentCol + 1}"][data-row="${currentRow + 1}"][data-box="${x}"]`)) &&
    (downLeft1 = document.querySelector(`.game-gridObject[data-column="${currentCol - 1}"][data-row="${currentRow - 1}"][data-box="${x}"]`))
  ) {
    console.log(`${x} wins! by diagnal 135deg`);
  }

}

//CHANGE SCORE
const player1ScoreSpan = document.getElementById('player1Score'),
      player1NameSpan = document.getElementById('player1Name'),
      player2ScoreSpan = document.getElementById('player2Score'),
      player2NameSpan = document.getElementById('player2Name');
function changeScore() {
  player1ScoreSpan.innerHTML = gameObject.player1score;
  player2ScoreSpan.innerHTML = gameObject.player2score;
  player1NameSpan.innerHTML = gameObject.player1Name;
  player2NameSpan.innerHTML = gameObject.player2Name;
}

//GET THE GAME OBJECT FROM THE SETUP


//CHANGE THE GAME ACCORDING TO THE OPTIONS
function gameChange(x) {
  var columns,rows,enemy;


  //CHANGES INVOLVING MAP SIZE
  if (x.mapSize == '3x3') {
    rows = 3;
    columns = 3;
  } else if (x.mapSize =='10x10') {
    rows = 10;
    columns = 10;
  }
  createField(rows,columns);
}

function checkAndRepair(x) {
  if (x.setupDone) {
    gameChange(x);
  }
}

createField(5,5);
// LOGIC ==========================================================================
