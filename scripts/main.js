"use strict";

//This section runs a counter in the games progress bar
let sec = 0;
let min = 0;
let intervalId = setInterval(function(){
   if(sec === 61){
      sec = 0;
      min++
   }
   timer.innerHTML = min + ":" + sec;
   sec++;
   
}, 1000);

//Takes the name input and adds it to the welcome message of the game page
function welcomePopUp(){
    document.getElementById("welcome").style.display="none";
    document.getElementById("gameWrapper").style.display="block";

    let user = document.getElementById("userName").value;
    let helloMessage = document.getElementById("nameInput");
    helloMessage.innerHTML = user;
}


//Added click event to reveal card and timeout after 2 seconds
let cardContainer = document.getElementsByClassName("card-container");

for(let i = 0; i < cardContainer.length; i++){
    cardContainer[i].addEventListener("click", function(){
        cardContainer[i].classList.add("revealed");

        let revealedCards = document.getElementsByClassName("revealed");
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
        }, 2000);
    });
}




















