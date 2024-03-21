import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
let timeDifference;
const inputDateTime = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button');
const timer = document.querySelectorAll('.value');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    timeDifference = userSelectedDate - options.defaultDate;

    if (timeDifference < 1) {
      iziToast.error({
        color: 'red',
        position: 'topRight',
        message: `Please choose a date in the future`,
      });
      startButton.disabled = true;
      inputDateTime.disabled = false;
    } else {
      startButton.disabled = false;
      inputDateTime.disabled = false;
    }
  },
};

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
}

const calendar = flatpickr('#datetime-picker', options);

startButton.addEventListener('click', event => {
  const countdown = setInterval(() => {
    timeDifference = userSelectedDate - new Date();
    event.preventDefault();
    inputDateTime.disabled = true;
    startButton.disabled = true;

    if (timeDifference < 1) {
      startButton.disabled = true;
      inputDateTime.disabled = false;
      clearInterval(countdown);
      return;
    }

    const time = convertMs(timeDifference);

    timer[0].innerText = time.days.toString().padStart(2, '0');
    timer[1].innerText = time.hours.toString().padStart(2, '0');
    timer[2].innerText = time.minutes.toString().padStart(2, '0');
    timer[3].innerText = time.seconds.toString().padStart(2, '0');
  }, 1000);
});
