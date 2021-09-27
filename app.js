const startButton = document.querySelector("#start");
const timeList = document.querySelector("#time-list");
const screens = document.querySelectorAll(".screen");
const timeEl = document.querySelector("#time");
const board = document.querySelector(".board");
let time = 0;
let score = 0;

startButton.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        startGame(time);
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
})

function startGame() {
    screens[1].classList.add('up');
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
    if (current < 10) {
        current = `0${current}`;
    }
    setTime(current);
    } 
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}
function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Your score: <span class="primary">${score}</span>`;
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);

    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    const red = getRandomNumber(0, 255);
    const green = getRandomNumber(0, 255);
    const blue = getRandomNumber(0, 255);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${x}px`;
    circle.style.left = `${y}px`;
    circle.style.background = `rgb(${red},${green},${blue})`;

    board.append(circle);
}

function getRandomNumber(min,max) {
    return Math.round(Math.random() * (max - min) + min);
}
