
//RANDOM MESSAGES
const defaultMessages = ['Hi!','Hello!','hi','hello',"who's playing?","oh wow",'yo',"Who is winning?","LETS GOOOO","Why am i even watching this", "what is life", "Well placed", 'They actually did it!', "c'mon one more",
                         'can i even stop this now', 'wait a second, that ain\'t online','u guys still there?','why would someone play this','oh wow, someone has put some pointless effort into this', 'guys do you think there\'s life outside of that chat?',
                         'can we get a pog in the chat?','you guys are getting paid for that?','how in the bloody oblivion did we even get here','brb gotta pee', 'brb breakfast', 'brb food', 'am back, ate some leftovers','What did i miss?', 'nothing much','quite a lot is happening',
                         'YOOOOO','howdy partner','hiii','LET\'S GOOOOO','LOOK AT THE MOVES','I CANT SEE ANYTHING','SO FAST','Interesting move', 'Indeed, an interesting move', 'I would never do that','You\'re a winner kiddo, don\'t ever forget that','ITS GONNA BE A DRAAAAAW','any mods on?','AAAAAAAAAAAAAAA','Oh wow',
                         'wtf rly','wtf','how does that work','does it even work?','why are we still here','is anyone feeling like they re controlled by something?','u guys think there is life outside of that chat?','naaah','I like trains','aight imma head out','aight sleep time','that\'s a pro gamer move right there',
                         'remind me, what is the winner getting?', 'i dunno','nvm lol','my F key fell off', 'Faker with the moves!', 'what was that?', 'quite entertaining','I would do that better','how can one achieve such power','oh wow, they are good','today is a good day, i get to witness this','right in time for this',
                         'oh yeah, i forgot to let my dogs out','i let my dogs out','who let the dogs out?','u guys play Dota?','Tic Tac Toe from 99 was better','only og\'s remember first tic tac toe','can we get a different map?','can i see the other mode?','why are they playing with themselves','oh great, it\'s started',
                         'going pro i see','you might get to the tic tac toe 2020 championship with that move','yo that guy knows what he\'s talking about', 'i\'d argue','good move!','bleh, what a bad move','oh wow i wouldn\'t guess that','holy heck incredible','impressive move','that was unnecessary'
                       ],

// var testMessages = [`I feel like ${gameObject.player2Name} is going to win`,`I feel like ${gameObject.player1Name} will win`];

//RANDOM NAMES
      names = ['adam','ben','camille','david','edward','frank','george','henry','isabelle','james','kevin','louise','mike','norman','obi','peter','richard','chris','santa','nicky','ivonne','igor','greta','bunny','greato','aNickName','tyler','trevor','troy'],
      specialNames1 = ['God','Devil'], // It's just for fun
      specialNames2 = ['Stuff','Celebrity','Star','SomeoneIGuess','Joe','Red','Yellow','Mike','HOWDIDIGETHERE','GoD','Scooby'],
      specialNames3 = ['CAPSLOCK','CPLUSPLUS','JAVA','Python','SQL','SmoothCriminal'],
      specialNames4 = ['James Bond','Ninja','Train','AnythingReally','hk','oblivion','skyrim','whereAreWeGoing','aGooDnickname'],
      numbers = [0,1,2,3,4,5,6,7,8,9],
      letters = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p","a", "s", "d",
                "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"],
      hexValue = ['1','2','3','4','5','6','7','8','9','0','A','B','C','D','E','F'],
      bigMix = [...names,...specialNames4,...specialNames3,...specialNames2,...specialNames1];

//random number generator
function randomNumber(y) {
  if (Array.isArray(y)) {
    return y[Math.floor(Math.random() * y.length)];
  } else if (Number.isInteger(y)) {
    return Math.floor(Math.random() * y);
  } else {
    return numbers[Math.floor(Math.random() * numbers.length)];
  }
}

//random name
function randomName(x) {
  let namae = [],i;
  for (i=0;i < x; i++) {
    namae.push(letters[randomNumber(letters.length)]);
  }
  return namae.join("");

}


// CHANCE TO CUSTOMIZE THE NICKNAME
function chanceChecker() {
  let chance = (Math.random() * 100);
  if (chance <= 0.001) {
    return nicknameGenerator()._eliteNickname();
  } else if (chance <= 0.1) {
    return nicknameGenerator()._nicknames1();
  } else if (chance <= 1) {
    return nicknameGenerator()._nicknames2();
  } else if (chance <= 3) {
    return nicknameGenerator()._nicknames3();
  } else if (chance <= 8) {
    return nicknameGenerator()._nicknames4();
  } else if (chance <= 20) {
    return nicknameGenerator()._nicknames5();
  } else if (chance <= 50) {
    return nicknameGenerator()._nicknames6();
  } else if (chance <= 80) {
    return nicknameGenerator()._nicknames7();
  } else if (chance <= 90) {
    return nicknameGenerator()._nicknames8();
  } else {
    return nicknameGenerator()._ultimaterandom();
    // return randomNumber(100).toString() + nicknameGenerator()._nicknames5() + randomNumber(100).toString();
  }
  return chance;
}

//CREATING A RANDOM NICKNAME HERE
const nicknameGenerator = () => {
  const _eliteNickname = () => { return 'ThisNicknameAppears when u roll >0.001' };
  const _nicknames1 = () => { return specialNames1[randomNumber(specialNames1.length)]};
  const _nicknames2 = () => { return specialNames2[randomNumber(specialNames2.length)]};
  const _nicknames3 = () => { return specialNames3[randomNumber(specialNames3.length)]};
  const _nicknames4 = () => { return specialNames4[randomNumber(specialNames4.length)]};
  const _nicknames5 = () => { return names[randomNumber(names.length)]};
  const _nicknames6 = () => { return names[randomNumber(names.length)] + randomNumber(10000).toString()};
  const _nicknames7 = () => { return specialNames4[randomNumber(specialNames4.length)] + randomNumber(1000).toString()};
  const _nicknames8 = () => { return randomNumber(10000).toString() + specialNames4[randomNumber(specialNames4.length)] + randomNumber(10000).toString()};
  const _ultimaterandom = () => { return randomName(randomNumber(10)) + randomNumber(10000).toString() }
  return {_eliteNickname,_nicknames1,_nicknames2,_nicknames3,_nicknames4,_nicknames5,_nicknames6,_nicknames7,_nicknames8,_ultimaterandom};
  }

  //RANDOM MESSAGE
  function randomMessage() {
    return randomNumber(defaultMessages);
  }

  //RANDOM COLOR GENERATOR

  function colorGenerator() {
    let color = "#",i;
    for (i = 0; i < 6; i++) {
      color += randomNumber(hexValue);
    }
    return color;
  }

  const chat = document.querySelector('.chat-main-div');

  function assembleMessage() {
    let message = "<p class='chat-message'>",
        color = colorGenerator(),
        messageAuthor = `<span class='message-author' style='color:${color}'>` + chanceChecker() + `</span>`,
        messageText = `<span class='message-text'>: ` + randomMessage() + `</span>`;
        message += messageAuthor += messageText += `</p>`;
        sendMessage(message);
  }

  function playerSendMessage(x) {
let message = "<p class='chat-message'>",
    color = colorGenerator(),
    messageAuthor = `<span class='message-author' style='color:${color}'>Me</span>`,
    messageText = `<span class='message-text'>: ` + x + `</span>`;
    message += messageAuthor += messageText += '</p>';
    return message;
  }

  function sendMessage(x) {
    chat.innerHTML += x;
    if (chat.childElementCount == 60) {
      chat.children[0].remove();
    }
  }

  // RANDOM MESSAGES EVENT
  // var interval = setInterval(assembleMessage,1000);

  // ======================================================
  // ADD MESSAGE TO THE CHAT ==============================
  // ======================================================
  const right_chat = document.getElementById('chat-input'),
        right_add_message = document.getElementById('chat-add-message');
  let right_chat_value;

//change input value while typing
right_chat.addEventListener('keyup', function() {
  right_chat_value = right_chat.value;
})
//click the button to send
right_add_message.addEventListener('click', function() {
  if (right_chat_value) {
    sendMessage(playerSendMessage(right_chat_value));
    right_chat.value = "";
  }
});

// function prevCheck() {
//   event.preventDefault();
//   console.log('ding');
// }

// =================================================================
//  PLAYER VS PLAYER CHAT ==========================================
// =================================================================

const left_chat = document.getElementById('chat-player-input'),
      left_add_message = document.getElementById('chat-player-add-message'),
      left_main_chat = document.querySelector('.ingame-chat-main');
let left_chat_value;


// ADD MESSAGE TO THE LEFT CHAT
function addMessageToMainChat(x) {
  left_main_chat.innerHTML += x;
  left_chat.value = "";
}

//CLICK EVENT
left_chat.addEventListener('keyup', function() {
  left_chat_value = left_chat.value;
})

left_add_message.addEventListener('click', function() {
  if (left_chat_value) {
    addMessageToMainChat(playerSendMessage(left_chat_value));
    aiAnswerFind(left_chat_value);
  }
})

//press enter to send the message
window.addEventListener('keyup',function() {
    if (right_chat_value && event.key == 'Enter') {
      sendMessage(playerSendMessage(right_chat_value));
      right_chat.value = "";
    }
    if (left_chat_value && event.key == 'Enter') {
      addMessageToMainChat(playerSendMessage(left_chat_value));
      // if (gameObject.ai == 'player_vs_ai') {
        aiAnswerFind(left_chat_value);
      // }

    }
})

//SEARCH FOR AN ANSWER FOR AI
// FAST REGEXP
const greeting = /\b(hello+|hi+|he+y+)!*\b/i;
const digitsOnly = /\b\d+\b/;

//Function that evaluates answers
function aiAnswerFind(x) {

var color = colorGenerator(),
    y = "";
 if (greeting.test(x)) {
   y = randomNumber(['Hi','Hello','Howdy','Hello there','Hey']);
 } else if (digitsOnly.test(x)) {
   y = '01100101 01101110 01100100 00100000 01101101 01111001 00100000 01101101 01101001 01110011 01100101 01110010 01111001';
 } else {
   console.log('ding');
   y = 'Let\'s play!';
 }


 let message = "<p class='chat-message'>" + `<span class='message-author' style='color:${color}'>AI</span>` +
 `<span class='message-text'>: ` + y + `</span></p>`;
 return setTimeout(aiAnswers.bind({},message),1000);

}

//AI PUTS ANSWER TO CHAT
function aiAnswers(x) {
  left_main_chat.innerHTML += x;
}





  //===========================================================================================
  //===================== VIEWERS =============================================================
  //===========================================================================================

  const viewerControl = (function() {
    const viewerSpan = document.getElementById('viewer-span');
    let viewerCount = 0;

    //choose a random number, and add it to the span
    function changeViewers() {
      viewerSpan.innerHTML = (Number(viewerSpan.innerHTML) + randomNumber([-200,-100,-50,-25,-10,10,25,50,100,200]));
    }

    // variable for the interval
    let viewerChange;

    //starts the change
    function startChanging () {
       stopChanging();
       viewerChange = setInterval(changeViewers,500);
    }
    function stopChanging() {
      clearInterval(viewerChange);
    }
    return {startChanging,stopChanging}

  })();
