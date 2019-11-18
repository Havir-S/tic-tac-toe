

let gameObject;

const settingsSetup = function () {

// DEFINING VARIABLES
const option_wrappers = document.getElementsByClassName('option-wrapper'),
      next_buttons = document.getElementsByClassName('setup-button-next'),
      prev_buttons = document.getElementsByClassName('setup-button-prev'),
      start_button = document.getElementById('setup-button-start'),
      error_section = document.querySelector('.error-section');
      sec = error_section;


//VALUE FOR THE SETTING CONTAINERS
let settingsCurrentShow = 0;

//HANDY FUNCTIONS
function _displayChange(x,display) {
  return x.style.display = display;
}

//SMALL ERROR HANDLER
const exitError = document.querySelector('.error-exit');

exitError.addEventListener('click', _foundError.bind(this,false));

//IF INVOCATED WITH ONLY 2 ARGUMENTS, IT HIDES THE ERROR HANDLER
function _foundError(bool,el, message) {
  if (arguments.length == 2) {
    if (bool == false) {
      _displayChange(error_section,'none');
    }
    //IF INVOCATED WITH ONLY 3 ARGUMENTS, AND ONE IS TRUE, IT SHOWS THE ERROR HANDLER WITH THE MESSAGE
  } else {
    _displayChange(error_section,'block');
    document.querySelector('.error-msg').innerHTML = message;
    document.querySelector('.error-el').innerHTML = el;
  }
}


//SETUP MAGIC ===========================================================================

//SETUP BUTTON EVENTS
Array.from(next_buttons).forEach(button => {
  button.addEventListener('click',changeOptionsSet.bind(this,1),false);
})

Array.from(prev_buttons).forEach(button => {
  button.addEventListener('click',changeOptionsSet.bind(this,-1),false);
})


// BROWSING OPTION SETS
function changeOptionsSet (x) {

  //One out
  _displayChange(option_wrappers[settingsCurrentShow],'none');

  settingsCurrentShow += x;
  //One in
  _displayChange(option_wrappers[settingsCurrentShow],'block');
}



//Check for RADIO BUTTONS
function setupCheck() {
  const mapNameCheck = document.querySelector('input[name="map-name"]:checked'),
        mapSizeCheck = document.querySelector('input[name="map-size"]:checked'),
        playerCheck = document.querySelector('input[name="player-setting"]:checked');

        if (mapNameCheck && mapSizeCheck && playerCheck) {
          return {
            mapName: mapNameCheck.value,
            mapSize: mapSizeCheck.value,
            enemy: playerCheck.value
          };
        } else {
          return false
        }
}

function optionsHide() {
  _displayChange(option_wrappers[settingsCurrentShow],'none');
  _displayChange(document.querySelector('.setup-container'),'none');
  settingsCurrentShow = 0;
}


//Submit options event

start_button.addEventListener('click', submitOptions);

function submitOptions() {
  if (setupCheck()) {
    optionsHide();
    gameStart(setupCheck());
  } else {
    console.log('something went wrong');
  }
}

//=====================================================
// MAIN EVENT STARTING UP THE GAME ========================================================================================
//=====================================================
const gameMap = document.getElementById('game-map'),
      rgx = new RegExp(/\bmap_\w+\b/);

//GAME OBJECT
  gameObject = {
  player1score: 0,
  player2score: 0,
  player1Name: 'PLAYER 1',
  player2Name: 'PLAYER 2',
  turn: 'player1',
  ai: 'player_vs_ai',
  mapSize: '3x3',
  mapName: 'map_dark',
  setupDone: false,
}

//FIRST INITIAL START
function gameStart (setup) {
  gameObject.mapName = setup.mapName;
  gameObject.mapSize = setup.mapSize;
  gameObject.ai = setup.enemy;
  gameObject.setupDone = true;
  console.log(gameObject);
  gameChange(gameObject);
}

//CHANGE SCORE



// // MAP CHANGE ==============================================================
// function mapNameChange(map) {
//
//   //MAKE SURE TO DELETE THE LAST MAP/MAPS
//   while (rgx.test(gameMap.className)) {
//     var classToBeRemoved = rgx.exec(gameMap.className)[0];
//     gameMap.classList.remove(classToBeRemoved);
//   }
//
//   // CHANGE CURRENT MAP
//   gameMap.classList.add(map);
//   gameObject.mapName = map;
// }
//
// // SIZE CHANGE ============================================================
// function mapSizeChange(size) {
//   gameObject.mapSize = size;
//
// }
//
// // PVP VS PVE CHANGE ================================================================
//
// function enemySetting(playMode) {
//   gameObject.ai = playMode;
// }
return gameObject;
}

settingsSetup();


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
  let gridObjects = document.getElementsByClassName('game-gridObject');
  if (gridObjects.length) {
    clearField();
  }

  //prepare grid based on the settings
  let i = 0,
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
    if (gameObject.ai == "player_vs_player") {
      gridObject.addEventListener('click',makeAMove, options);
    } else if (gameObject.ai = "player_vs_ai") {
      gridObject.addEventListener('click',againstAi, options);
    }

  }
}

//PLAYER VS AI
var choosen;
function againstAi(x) {
  console.log(this);


   if (gameObject.turn == "player1" && gameObject.ai == 'player_vs_ai') {
     //PLAYER MAKES A MOVE

     this.setAttribute('data-used','true');
     this.setAttribute('data-box', 'player1');
    checkForWin('player1',this);
    console.log('player made his move');
    console.log('now ai makes its move');

var validPositions = document.querySelectorAll('.game-gridObject[data-box="none"]'),
    choosenPosition = validPositions[randomNumber(validPositions.length)];
    gameObject.turn = 'player2';
    console.log(choosenPosition);
    choosenPosition.setAttribute('data-used','true');
    choosenPosition.setAttribute('data-box', 'player2');
    choosenPosition.removeEventListener('click',againstAi, options);
    checkForWin('player2',this);
    gameObject.turn = 'player1';


    console.log('Ai made a move');
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

  }
}

createField(5,5);

// ==========================================================================
// THIS IS WHERE THE FUN BEGINS =============================================
// ==========================================================================

function checkForWin(x,y) {
  var currentCol = Number(y.getAttribute('data-column')),
      currentRow =  Number(y.getAttribute('data-row'));



  //0 check
  if (
    (up1 = document.querySelector(`.game-gridObject[data-column="${currentCol}"][data-row="${currentRow - 1}"][data-box="${x}"]`)) &&
    (up2 = document.querySelector(`.game-gridObject[data-column="${currentCol}"][data-row="${currentRow - 2}"][data-box="${x}"]`))
  ) {
    console.log(`${x} wins! by 3 to up`);
    changeScore(x);
  } else

  //45 check

  if (
    (upRight1 = document.querySelector(`.game-gridObject[data-column="${currentCol + 1}"][data-row="${currentRow - 1}"][data-box="${x}"]`)) &&
    (upRight2 = document.querySelector(`.game-gridObject[data-column="${currentCol + 2}"][data-row="${currentRow - 2}"][data-box="${x}"]`))
  ) {
    console.log(`${x} wins! by 3 45deg`);
    changeScore(x);
  } else

  //90 check
  if (
    (right1 = document.querySelector(`.game-gridObject[data-column="${currentCol + 1}"][data-row="${currentRow}"][data-box="${x}"]`)) &&
    (right2 = document.querySelector(`.game-gridObject[data-column="${currentCol + 2}"][data-row="${currentRow}"][data-box="${x}"]`))
  ) {
    console.log(`${x} wins! by 3 to right`);
    changeScore(x);
  } else

  //135 check
  if (
    (upLeft1 = document.querySelector(`.game-gridObject[data-column="${currentCol + 1}"][data-row="${currentRow + 1}"][data-box="${x}"]`)) &&
    (upLeft2 = document.querySelector(`.game-gridObject[data-column="${currentCol + 2}"][data-row="${currentRow + 2}"][data-box="${x}"]`))
  ) {
    console.log(`${x} wins! by 3 135deg`);
    changeScore(x);
  } else

  //180 check
  if (
    (down1 = document.querySelector(`.game-gridObject[data-column="${currentCol}"][data-row="${currentRow + 1}"][data-box="${x}"]`)) &&
    (down2 = document.querySelector(`.game-gridObject[data-column="${currentCol}"][data-row="${currentRow + 2}"][data-box="${x}"]`))
  ) {
    console.log(`${x} wins! by 3 to down`);
    changeScore(x);
  } else
  //225 check
  if (
    (downLeft1 = document.querySelector(`.game-gridObject[data-column="${currentCol - 1}"][data-row="${currentRow + 1}"][data-box="${x}"]`)) &&
    (downLeft2 = document.querySelector(`.game-gridObject[data-column="${currentCol - 2}"][data-row="${currentRow + 2}"][data-box="${x}"]`))
  ) {
    console.log(`${x} wins! by 3 225deg`);
    changeScore(x);
  } else

  //270 check
  if (
    (left1 = document.querySelector(`.game-gridObject[data-column="${currentCol - 1}"][data-row="${currentRow}"][data-box="${x}"]`)) &&
    (left2 = document.querySelector(`.game-gridObject[data-column="${currentCol - 2}"][data-row="${currentRow}"][data-box="${x}"]`))
  ) {
    console.log(`${x} wins! by 3 to left`);
    changeScore(x);
  } else
  //315 check
  if (
    (downLeft1 = document.querySelector(`.game-gridObject[data-column="${currentCol - 1}"][data-row="${currentRow - 1}"][data-box="${x}"]`)) &&
    (downLeft2 = document.querySelector(`.game-gridObject[data-column="${currentCol - 2}"][data-row="${currentRow - 2}"][data-box="${x}"]`))
  ) {
    console.log(`${x} wins! by 3 315deg`);
    changeScore(x);
  }

  //CHECK IF THE CURRENT ONE IS IN MIDDLE IS IN MIDDLE
  //0 check middle
  if (
    (up1 = document.querySelector(`.game-gridObject[data-column="${currentCol}"][data-row="${currentRow - 1}"][data-box="${x}"]`)) &&
    (down1 = document.querySelector(`.game-gridObject[data-column="${currentCol}"][data-row="${currentRow + 1}"][data-box="${x}"]`))
  ) {
    console.log(`${x} wins! by middle 0deg`);
    changeScore(x);
  } else
  //45 check middle
  if (
    (upRight1 = document.querySelector(`.game-gridObject[data-column="${currentCol + 1}"][data-row="${currentRow - 1}"][data-box="${x}"]`)) &&
    (downLeft1 = document.querySelector(`.game-gridObject[data-column="${currentCol - 1}"][data-row="${currentRow + 1}"][data-box="${x}"]`))
  ) {
    console.log(`${x} wins! by diagnal 45deg`);
    changeScore(x);
  } else
  //90 check middle
  if (
    (right1 = document.querySelector(`.game-gridObject[data-column="${currentCol + 1}"][data-row="${currentRow}"][data-box="${x}"]`)) &&
    (left1 = document.querySelector(`.game-gridObject[data-column="${currentCol - 1}"][data-row="${currentRow}"][data-box="${x}"]`))
  ) {
    console.log(`${x} wins! by middle 90deg`);
    changeScore(x);
  } else

  //135 check middle
  if (
    (upRight1 = document.querySelector(`.game-gridObject[data-column="${currentCol + 1}"][data-row="${currentRow + 1}"][data-box="${x}"]`)) &&
    (downLeft1 = document.querySelector(`.game-gridObject[data-column="${currentCol - 1}"][data-row="${currentRow - 1}"][data-box="${x}"]`))
  ) {
    console.log(`${x} wins! by diagnal 135deg`);
    changeScore(x);
  }

}

//CHANGE SCORE
const player1ScoreSpan = document.getElementById('player1Score'),
      player1NameSpan = document.getElementById('player1Name'),
      player2ScoreSpan = document.getElementById('player2Score'),
      player2NameSpan = document.getElementById('player2Name');
function changeScore(x) {
  console.log(x);

  if (x == 'player1') {
    gameObject.player1score = gameObject.player1score + 1;
  } else if (x == 'player2') {
    gameObject.player2score = gameObject.player2score + 1;
  }

  player1ScoreSpan.innerHTML = gameObject.player1score;
  player2ScoreSpan.innerHTML = gameObject.player2score;
  player1NameSpan.innerHTML = gameObject.player1Name;
  player2NameSpan.innerHTML = gameObject.player2Name;
}

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
