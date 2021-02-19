import Swiper from './vendor.js';

const DESKTOP = 1024;
let swiper = new Swiper('.swiper-container', {
  pagination: {
    el: '.swiper-pagination',
  },
});

// if (window.innerWidth < DESKTOP) {

// }

const destroySlider = () => {
  if (window.innerWidth >= DESKTOP && swiper !== undefined) {
    return swiper.destroy();

  } else if (window.innerWidth < DESKTOP) {
    return (
      swiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
        },
      })
    );
  } else {
    return;
  }
}

window.addEventListener('resize', destroySlider)


const faqItems = document.querySelectorAll('.faq__item>p');

faqItems.forEach((item) => item.classList.add('visually-hidden'));

faqItems[2].classList.remove('visually-hidden');

const reviewSlider = new Swiper('.swiper-container-slider', {
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});


// открытие модального окна
const phone = document.querySelector('.header__order-call');

const openModal = () => {
  evt.preventDefault();
  phone.classList.remove('visually-hidden');
}

phone.addEventListener('click', openModal)
