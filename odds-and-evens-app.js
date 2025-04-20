// TO-DO : display who wins 
// check if user made a bet 
// update design ... and so on 
// he doesnt check if he IS already binar/decimal --> number bigger or NaN error 


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

handleSwitchBaseEvent = (e) => {
    if (e.target.id == 'switch-to-binary') {
        /**check if the number is currently decimal, then change it to binary */
        if (!binaryBase) {
            binaryBase = true; 
            // convert all the values if present 
            console.log(resultDisplay.innerText); 
            
            // see if the value of result needs to be displayed binary: 
            if (!isNaN(parseInt(resultDisplay.innerText))) resultDisplay.innerHTML = parseInt(resultDisplay.innerText).toString(2);
            // see if the value of the computer's choice needs to be displayed binary: 
            if (!isNaN(parseInt(computerChoiceDisplay.innerText))) computerChoiceDisplay.innerHTML = parseInt(computerChoiceDisplay.innerText).toString(2);
           
            // convert the second users choice button too (in any case)
            pickOddEven[1].innerHTML = oddEven[1].toString(2); 
        }
       
    } 
    else {
        /**check if the number is currently binary, then change it to decimal */
        if (binaryBase) {
            binaryBase = false; 
            // see if the value of result needs to be displayed decimal:
            // if the value is a Number, adapt it 
            if (!isNaN(parseInt(resultDisplay.innerText))) resultDisplay.innerHTML = parseInt(resultDisplay.innerText, 2).toString(10);
            // see if the value of the computer's choice needs to be displayed binary: 
            if (!isNaN(parseInt(computerChoiceDisplay.innerText))) computerChoiceDisplay.innerHTML = parseInt(computerChoiceDisplay.innerText, 2).toString(10);
            // convert the second user choice button to decimal too 
            pickOddEven[1].innerHTML = oddEven[1];
        }
        
    }
    console.log( `binaryBase is set to ${binaryBase}`); 
}

for (i = 0; i < switchBase.length; i++) {
    switchBase[i].addEventListener('click', handleSwitchBaseEvent); 
}

/* what's the user's bet? */
handleBetEvent = (e) => {
    userBet = e.target.id; 
    console.log( `You've bet on ${userBet}`); 
}
/* the "Bet-Buttons" both need EventListeners: */
for (let i = 0; i < betOddEven.length; i++) {
    betOddEven[i].addEventListener('click', handleBetEvent); 
}

/* what's the user's pick? */
handlePickEvent = (e) => {
    let userPickString = e.target.id; 
    if (userPickString == 'player-picks-odd') userPick = 1; 
    else userPick = 2;   
    console.log(`You picked ${userPick}`); 
    /* Every good thing is worth waiting for.
       First version with 2 call backs: 
       1st call back */ 
    setTimeout(generateComputerPick, 2000); 
}
/* the "Pick-Buttons" both need EventListeners too: */
for (let i = 0; i < pickOddEven.length; i++) {
    pickOddEven[i].addEventListener('click', handlePickEvent); 
}

const generateResult = () => {
    // do something 
    let result = userPick + computerPick; 
    /* show the result as binary or decimal base num */
    if (binaryBase) resultDisplay.innerHTML = result.toString(2);
    else resultDisplay.innerHTML = result;
    console.log(`Resulting value= ${result} and the result is ${oddEvenText[result%oddEvenText.length]}`); 
    // still missing: display who wins 
    // ... 
}

const generateComputerPick = () => {
    computerPick = oddEven[Math.floor(Math.random()*oddEven.length)];
    console.log(`Computer picked ${computerPick}`); 
    // show in computer-choice 
    /* show pick as binary or decimal base num */
    if (binaryBase) computerChoiceDisplay.innerHTML = computerPick.toString(2); 
    else computerChoiceDisplay.innerHTML = computerPick;
    /* 2nd call back */
    setTimeout(generateResult, 1000); 
}

