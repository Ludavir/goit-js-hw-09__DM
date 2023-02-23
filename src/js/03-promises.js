import Notiflix from 'notiflix';

const numDelay = document.querySelector(`input[name="delay"]`);
const numStep = document.querySelector(`input[name="step"]`);
const numAmount = document.querySelector(`input[name="amount"]`);
const btnCreate = document.querySelector("button")



function createPromise(i, delay) {

  const shouldResolve = Math.random() > 0.3;

  let myPromise = new Promise ((resolve, rejected) => {

    setTimeout(condition, delay);
    function condition() {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${i} in ${delay}ms`)
      } else {
        rejected(`❌ Rejected promise ${i} in ${delay}ms`)
      }
    }
  });
  return myPromise
};

btnCreate.addEventListener(`click`, (e) => {
  e.preventDefault();

  let delay = Number(numDelay.value);
  let step = Number(numStep.value);
  let amount = Number(numAmount.value);

  for ( i = 1; i <= amount; i += 1) {
    setTimeout(() => {
      delay += step;

      createPromise(i, delay)
      .then((value) => {
        Notiflix.Notify.success(value)
      })
      .catch((error) => {
        Notiflix.Notify.failure(error)
      })
    }, delay)
  }
});
