/* LOCAL STORAGE */

var score = [];
var scoreItem = {
   "time": timeCount,
   "moves": movesCount
}
var timeCount = 0;
var movesCount = 0;

function setLocalStorage() {
   localStorage.setItem(scoreItem["time"], timeCount);
   localStorage.setItem(scoreItem["move"], movesCount);
}

window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
   
      lang = localStorage.getItem("lang");  
   
};

window.addEventListener("load", getLocalStorage);

/* local storage ends  ==========================*/


// GAME MENU SECTION ==================================================
const startButton = document.querySelectorAll(".start__game");
const scoreButton = document.querySelector(".show__score");
const gamePlace = document.querySelector(".main");
const body = document.querySelector("body");

scoreButton.addEventListener("click", function () {
   body.classList.add("active");
})

startButton.forEach(item => item.addEventListener("click", function () {
   body.classList.remove("active");
   gamePlace.classList.add("active");
   prepare();

   var sound = new Audio("./assets/sounds/d_shawn3.mp3");
   sound.play();
   sound.volume = .75;

}));

// GAME MENU SECTION ends --------------------------------------------


// HELP FUNCTION to "prepare" game ====================================
function prepare() {
   let cards = Array.from(document.querySelectorAll(".card"));
   let game = new Doom2(100, cards);

   game.gameStart();

   cards.forEach(card => {
      card.addEventListener('click', () => {
         game.flipCard(card);
      });
   });
}




/* CREATE GAME OBJECT try ====================================================*/

class Doom2 {
   constructor(time, cards) {
      this.cardsList = cards;
      this.time = time;
      this.timeRemain = time;
      this.timer = document.querySelector(".time__level");
      this.steps = document.querySelector(".moves__count");
   }

   // 
   gameStart() {
      this.totalClicks = 0;
      this.timeRemain = this.time;
      this.cardToCheck = null;
      this.matchedCards = [];
      this.used = true;
      setTimeout(() => {
         this.shuffleCards(this.cardsList);
         this.countdown = this.startCountdown();
         this.used = false;
      }, 500)
      this.hideCards();
      this.timer.innerText = this.timeRemain;
      this.steps.innerText = this.totalClicks;
   }

      gameOver() {
         // try to add totalClicks & timeRemain = "LOOSE!" to localstorage when game is over
      clearInterval(this.countdown);
      document.querySelector(".game__over").classList.add("visible");
      setTimeout(() => {

         // attension!!! shit-code to null game data!!!!!!! just reload page :) 
         // NEED TO REFACTOR!!!!!
         location.reload();

      }, 5000)
   }

   // set timer countdown 
   startCountdown() {
      return setInterval(() => {
         this.timeRemain--;
         this.timer.innerText = this.timeRemain;
         if (this.timeRemain === 0)
            this.gameOver();
      }, 1000);
   }

   victory() {

      // try to add totalClicks & timeRemain to localstorage when game is over
      //score.push({scoreItem["time"] = timeRemain, scoreItem["move"] = totalClicks});
      clearInterval(this.countdown);
      document.querySelector(".win").classList.add("visible");

      setTimeout(() => {

         // attension!!! shit-code to null game data!!!!!!! just reload page :) 
         // NEED TO REFACTOR!!!!!
         location.reload();

      }, 5000)

   }
   hideCards() {
      this.cardsList.forEach(card => {
         card.classList.remove("visible");
         card.classList.remove("matched");
      });
   }

   flipCard(card) {
      if (this.canFlip(card)) {
         this.totalClicks++;
         this.steps.innerText = this.totalClicks;
         card.classList.add("visible");

         if (this.cardToCheck) {
            this.checkMatch(card);
         } else {
            this.cardToCheck = card;
         }
      }
   }

   checkMatch(card) {
      if (this.getImage(card) === this.getImage(this.cardToCheck))
         this.cardMatch(card, this.cardToCheck);
      else
         this.cardMismatch(card, this.cardToCheck);

      this.cardToCheck = null;
   }

   cardMatch(card1, card2) {
      this.matchedCards.push(card1);
      this.matchedCards.push(card2);
      card1.classList.add("matched");
      card2.classList.add("matched");
      if (this.matchedCards.length === this.cardsList.length)
         this.victory();
   }

   cardMismatch(card1, card2) {
      this.used = true;
      setTimeout(() => {
         card1.classList.remove('visible');
         card2.classList.remove('visible');
         this.used = false;
      }, 1000);
   }

   // Fisher-Yates Shuffle Algorithm
   shuffleCards(cardsList) { 
      for (let i = cardsList.length - 1; i > 0; i--) {
         let randIndex = Math.floor(Math.random() * (i + 1));
         cardsList[randIndex].style.order = i;
         cardsList[i].style.order = randIndex;
      }
   }

   // need to get image-src of card
   getImage(card) {
      console.log(card.querySelectorAll(".card__back img"));
      return card.querySelectorAll(".card__back img")[0].src;
   }
   canFlip(card) {
      return !this.used && !this.matchedCards.includes(card) && card !== this.cardToCheck;
   }
}