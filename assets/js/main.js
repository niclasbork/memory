import '../css/main.scss';
import './helper';
// import { gsap } from "gsap";
import data from '../data/memory.json';

console.log(data);

const memoryWrapper = document.querySelector(".memory-wrapper");
const startGame = document.querySelector(".start-game");
const newGame = document.querySelector(".new-game");
let memoryCard;

const init = function() {
    for(let i = 0; i < data.length; i++) {
        // console.log(data[i]);
        let cardWrapper = document.createElement("div");
        let card = data[i];
        card = document.createElement("img");
        card.src = data[i].back.src;
        card.className = data[i].back.class + " " + data[i].class;
        cardWrapper.className = "memory-card"
        cardWrapper.setAttribute("data-name", data[i].name);
        cardWrapper.append(card);
        let cardWrapperClone = cardWrapper.cloneNode(true);
        memoryWrapper.append(cardWrapper, cardWrapperClone);
    }

    shuffleCards();
    flipCard();
};

const shuffleCards = function() {
    for (let i = memoryWrapper.children.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        memoryWrapper.appendChild(memoryWrapper.children[j]);
    }
};

// function flipCard();
const flipCard = function() {
    memoryCard = document.querySelectorAll(".memory-card");
    for(let j = 0; j < memoryCard.length; j++) {
        memoryCard[j].addEventListener("click", function() {
            memoryCard[j].classList.add("flip");
            checkMatch(memoryCard[j]);
        });
    }
};

// function checkMatch();
const checkMatch = function(element) {
    console.log(element);
    console.log("data-name", element.dataset.name);
    console.log("has class", element.classList.contains("flip"));
    if(element.dataset.name.length && element.classList.contains("flip").length) {
        console.log("It's a match!");
    } else {
        console.log("Oh no!");
    }
};

// function unflipCards();



startGame.addEventListener("click", function() {
    init();
    startGame.style.display = "none";
    newGame.style.display = "block";
});

newGame.addEventListener("click", function() {
    shuffleCards();
});
