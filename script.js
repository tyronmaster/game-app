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


function ready() {
    let cards = Array.from(document.querySelectorAll(".card"));
    //let game = new Doom2(100, cards);

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            
            game.startGame();
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}