//setting game name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML=gameName;
// document.querySelector("footer").innerHTML =`${gameName} Game created By Osaid`;
//setting game options
let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;

//manage words
let wordToGuess = "";
const words = ["Apple","Chair","Flame","Dance","Bread"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector(".message");

//manage hint
document.querySelector(".hint span").innerHTML = numberOfHints;
let getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click",getHint);

function generateInput(){
const inputsContainer =document.querySelector(".inputs");
//create main div
for (let i = 1; i <+ numberOfTries; i++) {
const tryDiv =document.createElement("div");
tryDiv.classList.add(`try-${i}`);
tryDiv.innerHTML =`<span>Try ${i}</span>`;

if (i !== 1)tryDiv.classList.add("disabled");
//create inputs
for (let j = 1; j < numberOfLetters; j++) {
let input = document.createElement("input");
input.type = "text";
input.id = `guess-${i}-letter-${j}`;
input.setAttribute("maxLength","1");
tryDiv.appendChild(input);
}

inputsContainer.appendChild(tryDiv);
}
inputsContainer.children[0].children[1].focus();

//disable All inputs except first one
const inputsInDisabledDiv = document.querySelectorAll(".disabled input");
inputsInDisabledDiv.forEach((input) => (input.disabled = true));


//convert input value to upper case 
const inputs = document.querySelectorAll("input");
inputs.forEach((input,index) =>{
input.addEventListener("input", function()  {
this.value = this.value.toUpperCase();

const nextInput = inputs[index + 1];
if(nextInput) nextInput.focus();
});

input.addEventListener("keydown",function () {
const currentIndex = Array.from(inputs).indexOf(this);    
if (this.key === "ArrowRight") {
const nextInput = currentIndex + 1;
if(nextInput < inputs.length) inputs[nextInput].focus();
}

if (this.key === "ArrowLeft") {
const previousInput = currentIndex + 1;
if(previousInput >= 0) inputs[previousInput].focus();
}

});

});
}
console.log(wordToGuess)
const guessButton = document.querySelector(".check");
guessButton.addEventListener("click",handleGuesses);

function handleGuesses(){
let sucessGuess = true;
for (let i = 1; i < numberOfLetters; i++) {
const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
const letter = inputField.value.toLowerCase();
const actualLetter = wordToGuess[i - 1];
//game logic 
if (letter === actualLetter) {
inputField.classList.add("in-place");
}else if(wordToGuess.includes(letter) && letter !== ""){
inputField.classList.add("not-in-place");
sucessGuess = false;
}else{
inputField.classList.add("no");
sucessGuess = false;
}

}
if (sucessGuess) {
messageArea.innerHTML = `you win the word is <span>${wordToGuess}</span>`;
//add disabled class on all try divs
let allTries = document.querySelectorAll(".inputs > div");
allTries.forEach((tryDiv) => tryDiv.classList.add("disaled"));
//disabled guess button
guessButton.classList.add("disabled");


}else{
document.querySelector(`.try-${currentTry}`).classList.add("disabled");
const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
currentTryInputs.forEach((input) => input.disabled = true);

currentTry++;
const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
nextTryInputs.forEach((input) => input.disabled = false);

let el = document.querySelector(`.try-${currentTry}`);
if (el) {
document.querySelector(`.try-${currentTry}`).classList.remove("disabled");
el.children[1].focus();
}else{
guessButton.classList.add("disabled");
messageArea.innerHTML = `you lose the word is <span>${wordToGuess}</span>`;
}


}

};

function getHint(){
if (numberOfHints > 0) {
numberOfHints--;
document.querySelector(".hint span").innerHTML = numberOfHints;
}
if (numberOfHints === 0) {
getHintButton.classList.add("disabled");
}

const enabledInputs = document.querySelectorAll("input:not([disabled])");
const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "");

if (emptyEnabledInputs.length > 0) {
const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
const randomInput = emptyEnabledInputs[randomIndex];
const indexToFill = Array.from(enabledInputs).indexOf(randomInput);

if (indexToFill !== -1) {
randomInput.value = wordToGuess[indexToFill].toUpperCase();
}

}

};


//handle backspace
function handleBackSpace(event){
if (event.key === "Backspace") {
const inputs = document.querySelectorAll("input:not([disabled])");
const currentIndex = Array.from(inputs).indexOf(document.activeElement);

if (currentIndex > 0) {
const currentInput = inputs[currentIndex];
const prevInput = inputs[currentIndex - 1];
currentInput.value = "";
prevInput.value = "";
prevInput.focus();
}

}


};

window.onload = function(){
generateInput();
};