const btnStart = document.querySelector("button[data-start]");
const btnStop = document.querySelector("button[data-stop]");
const bodyColor = document.querySelector("body")

let intervalTimeRandom;

console.log(btnStart, btnStop);

btnStart.addEventListener("click", startRandomColor);

function startRandomColor() {

    btnStart.disabled = true;
    btnStart.style.opacity = 0.7;
    btnStart.textContent = 'Process is running...';

    intervalTimeRandom = setInterval(() => {

        function getRandomHexColor() {
            return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        }
        
        bodyColor.style.backgroundColor = `${getRandomHexColor()}`;
        
    }, 1000)}

btnStop.addEventListener(`click`, stopRandomColor)

function stopRandomColor() {
    btnStart.textContent = "Start";
    btnStart.style.opacity = 1;
    btnStart.disabled = false;
    clearInterval(intervalTimeRandom);
};