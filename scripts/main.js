"use strict";

//This section runs a counter in the games progress bar
let sec = 1;
let min = 0;
let intervalId;
const audioGameComplete = new Audio("audio/game-complete.wav"); //audio source: https://themushroomkingdom.net/media/smb/wav
const audioPairFound = new Audio("audio/pair-found.wav");
const audioPause = new Audio("audio/pause.wav");


const audioSwitch = () => {
    const checkBox = document.getElementById('toggle');

    if (checkBox.checked === true){
        audioToggle = 1;
    } else {
        audioToggle = 0;
    };
};

let audioToggle = 1;

const progressTimer = () => {

    intervalId = setInterval(function(){
    if(sec < 10){
        sec = "0" + sec;
    } else if(sec === 60){
        sec = "0" + 0;
        min++
    };
    timer.innerHTML = min + ":" + sec;
    sec++;
    
    }, 1000);
};

const homepage = () => {
    clearInterval(intervalId);

    document.getElementById("welcome").style.display="flex";
    document.getElementById("gameWrapper").style.display="none";
    document.getElementById("congratulations").style.display="none";

    homepageModalWindow.classList.remove("active");
    modalOverlay.classList.remove("active");
};

const reset = () => {
    clearInterval(intervalId);
    shuffleArray(cardImages);
    assignCards();

    movesInput.innerHTML = 0;

    sec = 1;
    min = 0;

    moves = 0;
    roundsPlayed = 0;

    for(let i = 0; i < cardContainer.length; i++){
        cardContainer[i].classList.remove("matchedCards");
    };

    restartModalWindow.classList.remove("active");
    modalOverlay.classList.remove("active");  

    document.getElementById("welcome").style.display="flex";
    document.getElementById("gameWrapper").style.display="none";
    document.getElementById("congratulations").style.display="none";
};

//Takes the name input and adds it to the welcome message of the game page
const welcomePopUp = () => {
    restart();

    document.getElementById("welcome").style.display="none";
    document.getElementById("gameWrapper").style.display="flex";

    document.getElementById("pauseButton").style.display="inline";
    document.getElementById("playButton").style.display="none";

    const user = document.getElementById("userName").value;
    const helloMessage = document.getElementById("nameInput");
    helloMessage.innerHTML = user;
};


//Reveals cards and checks for a match
const cardContainer = document.getElementsByClassName("card-container");
let moves = 0;
const movesInput = document.getElementById("movesCounter");
let isRevealing = false;
let roundsPlayed = 0;
const roundsInput = document.getElementById("roundsCounter");

for(let i = 0; i < cardContainer.length; i++){
    
    const revealCard = () => {
        if(!isRevealing){
            
        cardContainer[i].classList.add("revealed");
        let revealedCards = document.getElementsByClassName("revealed");
        
        if(revealedCards.length > 1){
            isRevealing = true;
            movesInput.innerHTML = moves += 1; 
        };
        
        setTimeout(function(){
            if(revealedCards.length > 1 && revealedCards[0].childNodes[1].getAttribute("src") === revealedCards[1].childNodes[1].getAttribute("src")){
                for(let i = 0; i < revealedCards.length; i++){
                    revealedCards[i].classList.add("matchedCards");
                    revealedCards[i+1].classList.add("matchedCards");
                    revealedCards[i+1].classList.remove("revealed");
                    revealedCards[i].classList.remove("revealed");

                    if(audioToggle === 1){
                            audioPairFound.play();
                        };
                    }
            } else if(revealedCards.length > 1){
                    for(let i = 0; i < cardContainer.length; i++){
                    cardContainer[i].classList.remove("revealed");
                }
            }
            isRevealing = false;
            
            congrats();
         }, 2000);
        };
    };

    cardContainer[i].addEventListener("click", revealCard);
}


//Shuffles cards randomly
let cardImages = [
    "images/marioCards/mario_3.jpg",
    "images/marioCards/mario_1.jpg",
    "images/marioCards/mario_6.jpg",
    "images/marioCards/mario_2.jpg",
    "images/marioCards/mario_3.jpg",
    "images/marioCards/mario_4.jpg",
    "images/marioCards/mario_1.jpg",
    "images/marioCards/mario_5.jpg",
    "images/marioCards/mario_4.jpg",
    "images/marioCards/mario_5.jpg",
    "images/marioCards/mario_2.jpg",
    "images/marioCards/mario_6.jpg"
];

const shuffleArray = (array) => {//source:https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    };
};

shuffleArray(cardImages);

//Assigns cards randomly

const assignCards = () => {
        for(let i=0; i<cardContainer.length; i++){
        cardContainer[i].childNodes[1].setAttribute("src", cardImages[i]);
    };
};

//Shows congratulations page once complete

const congrats = () => {
    const matchedCards = document.getElementsByClassName("matchedCards");
     if(matchedCards.length == 12){
        document.getElementById("gameWrapper").style.display="none";
        document.getElementById("congratulations").style.display="flex";
        pullStats();
        if(audioToggle === 1){
            audioGameComplete.play();
        };
     };
};

const pullStats = () => {
    const timeToComplete = document.getElementById("timer").innerHTML;
    const movesToComplete = document.getElementById("movesCounter").innerHTML;
    const congratsPageTime = document.getElementById("totalTime");
    const congratsPageMoves = document.getElementById("totalMoves");

    congratsPageTime.innerHTML = timeToComplete;
    congratsPageMoves.innerHTML = movesToComplete;

};

const playAgain = () => {
    shuffleArray(cardImages);
    assignCards();

    document.getElementById("congratulations").style.display="none";
    document.getElementById("gameWrapper").style.display="flex";

    movesInput.innerHTML = 0;
    roundsInput.innerHTML = roundsPlayed +=1;

    sec = 1;
    min = 0;

    moves = 0;

    for(let i = 0; i < cardContainer.length; i++){
        cardContainer[i].classList.remove("matchedCards");
    };
};

const restart = () => {
    shuffleArray(cardImages);
    assignCards();

    movesInput.innerHTML = 0;

    sec = 1;
    min = 0;

    progressTimer();

    moves = 0;

    for(let i = 0; i < cardContainer.length; i++){
        cardContainer[i].classList.remove("matchedCards");
    };

    restartModalWindow.classList.remove("active");
    modalOverlay.classList.remove("active");  

    document.getElementById("pauseButton").style.display="inline";
    document.getElementById("playButton").style.display="none";

    let revealedCards = document.getElementsByClassName("revealed");
    for(let i = 0; i < revealedCards.length; i++){
        revealedCards[i].classList.remove("revealed");
    };
};

const pause = () => {
    clearInterval(intervalId);

    document.getElementById('block').style.display='block';
    if(audioToggle === 1){
        audioPause.play();
    };

    document.getElementById("pauseButton").style.display="none";
    document.getElementById("playButton").style.display="inline";
};

const play = () => {
    progressTimer();

    document.getElementById('block').style.display='none';

    document.getElementById("pauseButton").style.display="inline";
    document.getElementById("playButton").style.display="none";
};

const restartModalWindow = document.getElementById("restart-modal");
const modalOverlay = document.getElementById("overlay");

const restartModal = () => {
    clearInterval(intervalId);

    restartModalWindow.classList.add("active");
    modalOverlay.classList.add("active");      
};

const instructionModalWindow = document.getElementById("instructions-modal");

const instructionsModal = () => {
    clearInterval(intervalId);

    instructionModalWindow.classList.add("active");
    modalOverlay.classList.add("active"); 
}

const homepageModalWindow = document.getElementById("homepage-modal");

const homepageModal = () => {
    const element = document.getElementById('welcome');
    const style = window.getComputedStyle(element);
    const display = style.getPropertyValue('display');
    
    if(display !== "flex"){
    clearInterval(intervalId);

    homepageModalWindow.classList.add("active");
    modalOverlay.classList.add("active"); 
    };
};

const continueGame = () => {
    progressTimer();

    restartModalWindow.classList.remove("active");
    instructionModalWindow.classList.remove("active");
    homepageModalWindow.classList.remove("active");
    modalOverlay.classList.remove("active");
};




















