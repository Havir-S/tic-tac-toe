
let gameObject;

const settingsSetup = (function () {

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
})();

settingsSetup();
