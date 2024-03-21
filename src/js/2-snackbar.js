import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const generationForm = document.querySelector('.form');

generationForm.addEventListener('submit', event => {
  event.preventDefault();
  const delay = event.currentTarget.elements.delay.value;
  const radioInput = event.currentTarget.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioInput === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
  promise
    .then(value => {
      iziToast.success({
        title: '✅',
        icon: '',
        position: 'topRight',
        message: `Fulfilled promise in ${delay}ms`,
      });
      console.log(`✅ Fulfilled promise in ${delay}ms`);
      generationForm.reset();
    })
    .catch(error => {
      iziToast.error({
        title: '❌',
        icon: '',
        position: 'topRight',
        message: `Rejected promise in ${delay}ms`,
      });
      console.log(`❌ Rejected promise in ${delay}ms`);
      generationForm.reset();
    });
});
