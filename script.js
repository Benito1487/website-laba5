const reactor = document.querySelector("#reactor");

const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");
const modeBtn = document.querySelector("#modeBtn");
const speedBtn = document.querySelector("#speedBtn");

const statusText = document.querySelector("#statusText");
const modeText = document.querySelector("#modeText");
const powerText = document.querySelector("#powerText");
const powerValue = document.querySelector("#powerValue");
const powerFill = document.querySelector("#powerFill");
const speedText = document.querySelector("#speedText");

const particlesContainer = document.querySelector("#particles");

let isRunning = false;
let power = 0;
let mode = "NORMAL";
let speed = 1;
let powerInterval = null;

// Створення частинок
function createParticles() {
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        particle.style.left = Math.random() * 100 + "%";
        particle.style.animationDelay = Math.random() * 5 + "s";
        particle.style.animationDuration = 3 + Math.random() * 5 + "s";
        particlesContainer.appendChild(particle);
    }
}

// Оновлення інтерфейсу
function updatePower() {
    powerText.textContent = power + "%";
    powerValue.textContent = power + "%";
    powerFill.style.width = power + "%";
}

// Запуск реактора
function startReactor() {
    if (isRunning) return;

    isRunning = true;
    reactor.classList.add("running");
    statusText.textContent = "ONLINE";

    powerInterval = setInterval(() => {
        if (power < 100) {
            power += speed;
            if (power > 100) power = 100;
            updatePower();
        }
    }, 100);
}

// Пауза
function pauseReactor() {
    isRunning = false;
    reactor.classList.remove("running");
    statusText.textContent = "PAUSED";
    clearInterval(powerInterval);
}

// Скидання
function resetReactor() {
    isRunning = false;
    clearInterval(powerInterval);
    power = 0;
    reactor.classList.remove("running");
    reactor.classList.remove("overdrive");
    statusText.textContent = "STANDBY";
    mode = "NORMAL";
    modeText.textContent = mode;
    speed = 1;
    speedText.textContent = speed + "x";
    updatePower();
}

// Перемикання режиму
function changeMode() {
    if (mode === "NORMAL") {
        mode = "OVERDRIVE";
        reactor.classList.add("overdrive");
    } else {
        mode = "NORMAL";
        reactor.classList.remove("overdrive");
    }
    modeText.textContent = mode;
}

// Зміна швидкості
function changeSpeed() {
    if (speed === 1) {
        speed = 2;
    } else if (speed === 2) {
        speed = 5;
    } else {
        speed = 1;
    }
    speedText.textContent = speed + "x";
}

// Обробники кнопок
startBtn.addEventListener("click", startReactor);
pauseBtn.addEventListener("click", pauseReactor);
resetBtn.addEventListener("click", resetReactor);
modeBtn.addEventListener("click", changeMode);
speedBtn.addEventListener("click", changeSpeed);

// Створення частинок при завантаженні
createParticles();
updatePower();
