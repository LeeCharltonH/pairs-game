"use strict";

//This section runs a counter in the games progress bar
function progressTimer(){
    let sec = 1;
    let min = 0;
    
    let intervalId = setInterval(function(){
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
    document.getElementById("welcome").style.display="none";
    document.getElementById("gameWrapper").style.display="block";

    let user = document.getElementById("userName").value;
    let helloMessage = document.getElementById("nameInput");
    helloMessage.innerHTML = user;
}


//Reveals cards and checks for a match
let cardContainer = document.getElementsByClassName("card-container");
let moves = 0;
let movesInput = document.getElementById("movesCounter");
let isRevealing = false;

for(let i = 0; i < cardContainer.length; i++){
    
    cardContainer[i].addEventListener("click", function revealCard(){
        if(!isRevealing){
            
        cardContainer[i].classList.add("revealed");
        let revealedCards = document.getElementsByClassName("revealed");
        
        if(revealedCards.length > 1){
            isRevealing = true;
            console.log("Start")
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
            console.log("Finish")
         }, 2000);
        }
    });
}


//Shuffles cards randomly
let cardImages = [
    "images/marioCards/mario_1.png",
    "images/marioCards/mario_1.png",
    "images/marioCards/mario_2.png",
    "images/marioCards/mario_2.png",
    "images/marioCards/mario_3.png",
    "images/marioCards/mario_3.png",
    "images/marioCards/mario_4.png",
    "images/marioCards/mario_4.png",
    "images/marioCards/mario_5.png",
    "images/marioCards/mario_5.png",
    "images/marioCards/mario_6.png",
    "images/marioCards/mario_6.png"
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

for(let i=0; i<cardContainer.length; i++){
    cardContainer[i].childNodes[1].setAttribute("src", cardImages[i]);
};

























