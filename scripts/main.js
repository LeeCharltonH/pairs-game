"use strict";

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

function welcomePopUp(){
    document.getElementById("welcome").style.display="none";
    document.getElementById("gameWrapper").style.display="block";

    let user = document.getElementById("userName").value;
    let helloMessage = document.getElementById("nameInput");
    helloMessage.innerHTML = user;
}











