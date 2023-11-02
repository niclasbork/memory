import '../css/main.scss';
// import './helper';
// import { gsap } from "gsap";
import data from '../data/memory.json';

// console.log(data);

const memoryGame = document.querySelector(".memory-game");
const startGame = document.querySelector(".start-game");
const newGame = document.querySelector(".new-game");
const form = document.querySelector("form");
const input = document.querySelector("input");
let memoryCard;

const init = function() {
    for(let i = 0; i < data.length; i++) {
        // console.log(data[i]);
        let memoryCard = document.createElement("div");
        let cardBack = document.createElement("img");
        let cardFront = document.createElement("img");
        cardBack.src = data[i].back.src;
        cardFront.src = data[i].front.src;
        cardBack.className = data[i].back.class + " " + data[i].class;
        cardFront.className = data[i].front.class + " " + data[i].class;
        memoryCard.className = "memory-card"
        memoryCard.setAttribute("data-name", data[i].name);
        memoryCard.append(cardFront, cardBack);
        let memoryCardClone = memoryCard.cloneNode(true);
        memoryGame.append(memoryCard, memoryCardClone);
    }

    shuffleCards();
    flipCard();
};

const checkName = function() {
    startGame.disabled = true;

    input.addEventListener("change", function() {
        let nameValue = input.value.trim();
        startGame.disabled = false;
        
        startGame.addEventListener("click", function() {
            let Name = document.createElement("h1");
            Name.innerHTML = "<b>Name:</b> " + nameValue;

            let app = document.querySelector("#app");
            app.insertBefore(Name, startGame);

            localStorage.setItem("Name", nameValue);
            console.log("Name:", localStorage.getItem("Name"));
        });
    });
};

checkName();

const shuffleCards = function() {
    console.log("Shuffle!");
    for (let i = memoryGame.children.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        memoryGame.appendChild(memoryGame.children[j]);
    }
};

const openCards = [];

const flipCard = function() {
    memoryCard = document.querySelectorAll(".memory-card");
    let isFlipping = false;

    for (let j = 0; j < memoryCard.length; j++) {
        memoryCard[j].addEventListener("click", function() {
            if (!this.classList.contains("is-open") && !isFlipping) {
                this.classList.add("is-open");
                openCards.push(this);
                if (openCards.length === 2) {
                    isFlipping = true;
                    checkForPairsIfTwoCardsAreOpen(() => {
                        isFlipping = false; // Re-enable card interactions after the flip animation
                    });
                }
            }
        });
    }
};

const checkForPairsIfTwoCardsAreOpen = function(callback) {
    if (openCards.length === 2) {
        let [firstCard, secondCard] = openCards;
        if (firstCard.getAttribute("data-name") === secondCard.getAttribute("data-name")) {
            console.log("It's a match!");
            openCards.length = 0; // Reset the open cards
        } else {
            setTimeout(function() {
                firstCard.classList.remove("is-open");
                secondCard.classList.remove("is-open");
                openCards.length = 0; // Reset the open cards
                console.log("No match!");
            }, 1000);
        }
        setTimeout(callback, 1000); // Call the callback to re-enable card interactions after 1 second
    }
};

const checkForWin = function() {
    
};

const resetCards = function(element) {
    for(let i = 0; i < element.length; i++) {
        console.log("Reset!");
        setTimeout(function() {
            element[i].classList.remove("is-open");
        }, 500);
        setTimeout(shuffleCards, 700);
    }
};

startGame.addEventListener("click", function() {
    console.log("Start!");
    init();
    startGame.style.display = "none";
    newGame.style.display = "block";
    form.style.display = "none";
});

newGame.addEventListener("click", function() {
    resetCards(memoryCard);
});
