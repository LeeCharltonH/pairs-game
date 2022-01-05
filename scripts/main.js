"use strict";

//This section runs a counter in the games progress bar
let sec = 1;
let min = 0;

var intervalId

function progressTimer(){
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

//Takes the name input and adds it to the welcome message of the game page
function welcomePopUp(){
    assignCards()

    document.getElementById("welcome").style.display="none";
    document.getElementById("gameWrapper").style.display="flex";

    let user = document.getElementById("userName").value;
    let helloMessage = document.getElementById("nameInput");
    helloMessage.innerHTML = user;
}


//Reveals cards and checks for a match
let cardContainer = document.getElementsByClassName("card-container");
let moves = 0;
let movesInput = document.getElementById("movesCounter");
let isRevealing = false;
let roundsPlayed = 0;
let roundsInput = document.getElementById("roundsCounter");


for(let i = 0; i < cardContainer.length; i++){
    
    cardContainer[i].addEventListener("click", function revealCard(){
        if(!isRevealing){
            
        cardContainer[i].classList.add("revealed");
        let revealedCards = document.getElementsByClassName("revealed");
        
        if(revealedCards.length > 1){
            isRevealing = true;
            movesInput.innerHTML = moves += 1; 
        }
        
        setTimeout(function(){
            if(revealedCards.length > 1 && revealedCards[0].childNodes[1].getAttribute("src") === revealedCards[1].childNodes[1].getAttribute("src")){
                for(let i = 0; i < revealedCards.length; i++){
                    revealedCards[i].classList.add("matchedCards");
                    revealedCards[i+1].classList.add("matchedCards");
                    revealedCards[i+1].classList.remove("revealed");
                    revealedCards[i].classList.remove("revealed");
                    }
            } else if(revealedCards.length > 1){
                    for(let i = 0; i < cardContainer.length; i++){
                    cardContainer[i].classList.remove("revealed");
                }
            }
            isRevealing = false;
            congrats();
         }, 2000);
        }
    });
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
]

function shuffleArray(array) {//source:https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

shuffleArray(cardImages);

//Assigns cards randomly

function assignCards(){
        for(let i=0; i<cardContainer.length; i++){
        cardContainer[i].childNodes[1].setAttribute("src", cardImages[i]);
    };
};

//Shows congratulations page once complete

function congrats() {
    let matchedCards = document.getElementsByClassName("matchedCards");
     if(matchedCards.length == 12){
        document.getElementById("gameWrapper").style.display="none";
        document.getElementById("congratulations").style.display="flex";
        pullStats();
     };
};

function pullStats(){
    let timeToComplete = document.getElementById("timer").innerHTML;
    let movesToComplete = document.getElementById("movesCounter").innerHTML;
    let congratsPageTime = document.getElementById("totalTime");
    let congratsPageMoves = document.getElementById("totalMoves");

    congratsPageTime.innerHTML = timeToComplete;
    congratsPageMoves.innerHTML = movesToComplete;

}

function playAgain(){
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

function restart(){
    shuffleArray(cardImages);
    assignCards();

    movesInput.innerHTML = 0;

    sec = 1;
    min = 0;

    moves = 0;

    for(let i = 0; i < cardContainer.length; i++){
        cardContainer[i].classList.remove("matchedCards");
    };

    modalWindow.classList.remove("active");
    modalOverlay.classList.remove("active");  
};

function pause(){
    clearInterval(intervalId);

    document.getElementById("pauseButton").style.display="none";
    document.getElementById("playButton").style.display="inline";
};

function play(){
    progressTimer();

    document.getElementById("pauseButton").style.display="inline";
    document.getElementById("playButton").style.display="none";
};

let modalWindow = document.getElementById("modal");
let modalOverlay = document.getElementById("overlay");

function restartModal() {
    clearInterval(intervalId);

    modalWindow.classList.add("active");
    modalOverlay.classList.add("active");      
};

function continueGame() {
    progressTimer();

    modalWindow.classList.remove("active");
    modalOverlay.classList.remove("active");
};




















