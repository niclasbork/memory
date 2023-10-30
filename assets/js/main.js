import '../css/main.scss';
import './helper';
// import { gsap } from "gsap";
import data from '../data/memory.json';

// console.log(data);

const memoryWrapper = document.querySelector(".memory-game");
const startGame = document.querySelector(".start-game");
const newGame = document.querySelector(".new-game");
let memoryCard;

const init = function() {
    for(let i = 0; i < data.length; i++) {
        // console.log(data[i]);
        let cardWrapper = document.createElement("div");
        let cardBack = document.createElement("img");
        let cardFront = document.createElement("img");
        cardBack.src = data[i].back.src;
        cardFront.src = data[i].front.src;
        cardBack.className = data[i].back.class + " " + data[i].class;
        cardFront.className = data[i].front.class + " " + data[i].class;
        cardWrapper.className = "memory-card"
        cardWrapper.setAttribute("data-name", data[i].name);
        cardWrapper.append(cardFront, cardBack);
        let cardWrapperClone = cardWrapper.cloneNode(true);
        memoryWrapper.append(cardWrapper, cardWrapperClone);
    }

    shuffleCards();
    flipCard();
};

const shuffleCards = function() {
    console.log("Shuffle!");
    for (let i = memoryWrapper.children.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        memoryWrapper.appendChild(memoryWrapper.children[j]);
    }
};

const openCards = [];

const flipCard = function() {
    memoryCard = document.querySelectorAll(".memory-card");
    for (let j = 0; j < memoryCard.length; j++) {
        memoryCard[j].addEventListener("click", function() {
            if (!this.classList.contains("is-open")) {
                this.classList.add("is-open");
                openCards.push(this);
                if (openCards.length === 2) {
                    checkForPairsIfTwoCardsAreOpen();
                }
            }
        });
    }
};

const checkForPairsIfTwoCardsAreOpen = function() {
    if (openCards.length === 2) {
        let [firstCard, secondCard] = openCards;
        if (firstCard.getAttribute("data-name") === secondCard.getAttribute("data-name")) {
            console.log("It's a match!");
            openCards.length = 0; // Reset the open cards
        } else {
            setTimeout(() => {
                firstCard.classList.remove("is-open");
                secondCard.classList.remove("is-open");
                openCards.length = 0; // Reset the open cards
                console.log("No match!");
            }, 750); // Delay before flipping unmatched cards back
        }
    }
};

const resetCards = function() {
    let memoryCard = document.querySelectorAll(".memory-card");
    for(let i = 0; i < memoryCard.length; i++) {
        console.log("Reset!");
        memoryCard[i].classList.remove("is-open");
    }
};

startGame.addEventListener("click", function() {
    console.log("Start!");
    init();
    startGame.style.display = "none";
    newGame.style.display = "block";
});

newGame.addEventListener("click", function() {
    shuffleCards();
    resetCards();
});
