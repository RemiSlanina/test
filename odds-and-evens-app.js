// TO-DO : 
// update design ... and so on 
// finish implementing talkback 
// ... 
// implement onclick events for the result and computerchoice button 

// change the inactive and active bet and color base buttons too 
// change the code so you would be able to pick first or bet first, regardless of order

const talkBackDisplay = document.getElementById('talk-back-display');
const betOddEven = [document.getElementById('odd'), document.getElementById('even')]; 
const oddEvenText = ['even', 'odd']; 
const oddEven = [1, 2]; 
const pickOddEven = [document.getElementById('player-picks-odd'), document.getElementById('player-picks-even')]; 
let computerChoiceDisplay = document.getElementById('computer-choice'); 
let resultDisplay = document.getElementById('result'); 
/* if binaryBase is true, show binary numbers; otherwise show decimal base numbers */
let binaryBase = true; 
const switchBase = [document.getElementById('switch-to-binary'), document.getElementById('switch-to-decimal')]; 
let userBet; let userPick; let computerPick; 

talkBackDisplay.innerText = `Do you bet ${oddEvenText[1]} or ${oddEvenText[0]}?`;

/* Switch Base of Numbers from decimal to binary and back */
handleSwitchBaseEvent = (e) => {
    if (e.target.id == 'switch-to-binary') {
        /**check if the number is currently decimal, then change it to binary */
        if (!binaryBase) {
            binaryBase = true; 
            // convert all the values if present 
            console.log(resultDisplay.innerText); 
            
            // see if the value of result needs to be displayed binary: 
            if (!isNaN(parseInt(resultDisplay.innerText))) resultDisplay.innerText = parseInt(resultDisplay.innerText).toString(2);
            // see if the value of the computer's choice needs to be displayed binary: 
            if (!isNaN(parseInt(computerChoiceDisplay.innerText))) computerChoiceDisplay.innerText = parseInt(computerChoiceDisplay.innerText).toString(2);
           
            // convert the second users choice button too (in any case)
            pickOddEven[1].innerText = oddEven[1].toString(2); 
        } 
        else talkBackDisplay.innerText = `Numbers are already binary`; 
       
    } 
    else {
        /**check if the number is currently binary, then change it to decimal */
        if (binaryBase) {
            binaryBase = false; 
            // see if the value of result needs to be displayed decimal:
            // if the value is a Number, adapt it 
            if (!isNaN(parseInt(resultDisplay.innerText))) resultDisplay.innerText = parseInt(resultDisplay.innerText, 2).toString(10);
            // see if the value of the computer's choice needs to be displayed binary: 
            if (!isNaN(parseInt(computerChoiceDisplay.innerText))) computerChoiceDisplay.innerText = parseInt(computerChoiceDisplay.innerText, 2).toString(10);
            // convert the second user choice button to decimal too 
            pickOddEven[1].innerText = oddEven[1];
        }
        else talkBackDisplay.innerText = `Numbers are already decimal`; 
    }
    console.log( `binaryBase is set to ${binaryBase}`); 
}

for (i = 0; i < switchBase.length; i++) {
    switchBase[i].addEventListener('click', handleSwitchBaseEvent); 
}

/* what's the user's bet? */
handleBetEvent = (e) => {
    if (userBet) {
        talkBackDisplay.innerText = `You've already bet on ${userBet}. Pick a number.`;
    }
    else {
        userBet = e.target.id; 
        pickOddEven[0].classList.remove('inactive-button');
        pickOddEven[1].classList.remove('inactive-button');
        talkBackDisplay.innerText = `You've bet on ${userBet}. Now pick a number.`;
        console.log( `You've bet on ${userBet}`); }
}
/* the "Bet-Buttons" both need EventListeners: */
for (let i = 0; i < betOddEven.length; i++) {
    betOddEven[i].addEventListener('click', handleBetEvent); 
}

/* what's the user's pick? */
handlePickEvent = (e) => {
    if (userBet) {
        let userPickString = e.target.id; 
      if (userPickString == 'player-picks-odd') {
        userPick = 1; 
        /** make the other option 'invalid' */
        pickOddEven[1].classList.add('inactive-button');
      }
      else {
        userPick = 2;
        /** make the other option 'invalid' */
        pickOddEven[0].classList.add('inactive-button');
      }

      if (binaryBase) {
        userPickString = "" + userPick.toString(2); 
        talkBackDisplay.innerText = `You picked ${userPickString}. Computer is choosing...`;  
        console.log(`You picked ${userPickString}`); 
      } 
      else {
        talkBackDisplay.innerText = `You picked ${userPick}. Computer is choosing...`;  
        console.log(`You picked ${userPick}`); 
      }
      //talkBackDisplay.innerText = `You picked ${userPick}. Computer is choosing...`;  
      //console.log(`You picked ${userPick}`); 
      /* Every good thing is worth waiting for.
       First version with 2 call backs: 
       1st call back */ 
      setTimeout(generateComputerPick, 950); 
    }
    else talkBackDisplay.innerText= `Please make a bet first!`; 
}

/* the "Pick-Buttons" both need EventListeners too: */
for (let i = 0; i < pickOddEven.length; i++) {
    pickOddEven[i].addEventListener('click', handlePickEvent); 
}

const generateResult = () => {
    // do something 
    let result = userPick + computerPick; 
    /* show the result as binary or decimal base num */
    if (binaryBase) resultDisplay.innerText = result.toString(2);
    else resultDisplay.innerText = result;
    console.log(`Resulting value= ${result} and the result is ${oddEvenText[result%oddEvenText.length]}`); 

    switch (userBet+result%oddEvenText.length) {
      case 'odd0': 
      talkBackDisplay.innerText = "Your bet was odd. Result is even. You lost this round."
        break; 
      case 'odd1': 
      talkBackDisplay.innerText = "Your bet was odd. Result is odd. You win this round."
        break; 
      case 'even0': 
      talkBackDisplay.innerText = "Your bet was even. Result is eveb. You win this round."
        break;
      case 'even1':
      talkBackDisplay.innerText = "Your bet was even. Result is odd. You lost this round."
        break; 
    }
    // clear userBet variable: 
    userBet = undefined;
   /*  
    delete this code:  
    if (userBet) console.log(`this shan't happen. userbet : ${userBet}`);
    else console.log(`everything is fine. userbet : ${userBet}`); */
}

const generateComputerPick = () => {
    computerPick = oddEven[Math.floor(Math.random()*oddEven.length)];
    console.log(`Computer picked ${computerPick}`); 
    // show in computer-choice 
    /* show pick as binary or decimal base num */
    if (binaryBase) computerChoiceDisplay.innerText = computerPick.toString(2); 
    else computerChoiceDisplay.innerText = computerPick;
    /* 2nd call back */
    setTimeout(generateResult, 750); 
}

