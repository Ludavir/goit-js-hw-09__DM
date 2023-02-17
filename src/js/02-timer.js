import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputText = document.querySelector(`input[type=text]`);
const btnStart = document.querySelector("button[data-start]");

const daysPrint = document.querySelector(`span[data-days]`);
const hoursPrint = document.querySelector(`span[data-hours]`);
const minutesPrint  = document.querySelector(`span[data-minutes]`);
const secondsPrint  = document.querySelector(`span[data-seconds]`);

btnStart.disabled = true;
btnStart.style.opacity = 0.7;

let dateNew;

flatpickr("input[type=text]", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        dateNew = selectedDates[0];
        const dateDefaultNew = new Date();
        if (dateNew.getTime() > dateDefaultNew.getTime()) {

            btnStart.style.opacity = 1;
            btnStart.disabled = false;
            Notiflix.Notify.success('Valid Date');

        } else {
            Notiflix.Notify.failure("Please choose a date in the future")
        }
        },
});

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
};

btnStart.addEventListener(`click`, () => {
        let timer = setInterval(() => {
        const dateDefaultNew = new Date();
        let timeDiference = dateNew.getTime() - dateDefaultNew.getTime();
        const {
            days, hours, minutes, seconds
        } = convertMs(timeDiference);

        if (days < 10) {
            daysPrint.innerText = `0${days}`;
        } else {
            daysPrint.innerText = days;
        }

        if (hours < 10) {
            hoursPrint.innerText = `0${hours}`;
        } else {
            hoursPrint.innerText = hours;
        }

        if (minutes < 10) {
            minutesPrint.innerText = `0${minutes}`;
        } else {
            minutesPrint.innerText = minutes;
        }

        if (seconds < 10) {
            secondsPrint.innerText = `0${seconds}`;
        } else {
            secondsPrint.innerText = seconds;
        }

        if (timeDiference <= 1 ) {
            clearInterval(timer);
            Notiflix.Notify.success('Procces is DONE');
        }
    }, 1000)
});

btnStart.addEventListener("click", () => {
    Notiflix.Notify.success('Procces is running');
});