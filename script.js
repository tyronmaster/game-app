const startButton = document.querySelectorAll(".start__game");
const scoreButton = document.querySelector(".show__score");
const gamePlace = document.querySelector(".main");
const body = document.querySelector("body");

scoreButton.addEventListener("click", function(){
    body.classList.add("active");
})

startButton.forEach( item => item.addEventListener("click", function() {
    body.classList.remove("active");
    gamePlace.classList.add("active");
}));