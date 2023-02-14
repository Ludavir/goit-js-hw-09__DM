import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputText = document.querySelector(`input[type=text]`);
const btnStart = document.querySelector("button[data-start]");

const daysPrint = document.querySelector("span[data-days]");
const hoursPrint = document.querySelector("span[data-hours]");
const minutesPrint  = document.querySelector("span[data-minutes]");
const secondsPrint  = document.querySelector("span[data-seconds]");

btnStart.disabled = true;
btnStart.style.opacity = 0.7;

console.log(inputText);

const dateDefaultNew = new Date();
const NumDateDefault = dateDefaultNew.getTime();

flatpickr("input[type=text]", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const numDateNow = selectedDates[0].getTime();
        // console.log(selectedDates[0]);

        if (numDateNow > NumDateDefault) {
            btnStart.style.opacity = 1;
            btnStart.disabled = false;
            console.log("Fecha valida");
            const timeDiference = numDateNow - NumDateDefault;
            console.log(timeDiference);
            const convertTime = convertMs(timeDiference);

            daysPrint.innerHTML = convertTime.days;
            hoursPrint.innerHTML = convertTime.hours;
            minutesPrint.innerHTML = convertTime.minutes;
            secondsPrint.innerHTML = convertTime.seconds;

            btnStart.addEventListener("click", setInterval)
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
