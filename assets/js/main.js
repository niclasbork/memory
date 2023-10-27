import '../css/main.scss';
import './helper';
import { gsap } from "gsap";
import data from '../data/memory.json';

console.log(data);

for(let i = 0; i < data.length; i++) {
    console.log(data[i]);
    let card = document.createElement("div");
    card.innerText = data[i].name
    card.style.backgroundColor = data[i].color;
    card.className = "card" + " " + data[i].class;
    document.querySelector(".memory-wrapper").append(card);
}

var tl = gsap.timeline();

tl.fromTo("#app", { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 1 });
