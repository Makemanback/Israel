"use strict";

var _vendor = _interopRequireDefault(require("./vendor.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DESKTOP = 1024;
var swiper = new _vendor.default('.swiper-container', {
  pagination: {
    el: '.swiper-pagination'
  }
}); // if (window.innerWidth < DESKTOP) {
// }

var destroySlider = function destroySlider() {
  if (window.innerWidth >= DESKTOP && swiper !== undefined) {
    return swiper.destroy();
  } else if (window.innerWidth < DESKTOP) {
    return swiper = new _vendor.default('.swiper-container', {
      pagination: {
        el: '.swiper-pagination'
      }
    });
  } else {
    return;
  }
};

window.addEventListener('resize', destroySlider);
var faqItems = document.querySelectorAll('.faq__item>p');
faqItems.forEach(function (item) {
  return item.classList.add('visually-hidden');
});
faqItems[2].classList.remove('visually-hidden');
var reviewSlider = new _vendor.default('.swiper-container-slider', {
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction'
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
}); // открытие модального окна

var phone = document.querySelector('.header__order-call');

var openModal = function openModal() {
  evt.preventDefault();
  phone.classList.remove('visually-hidden');
};

phone.addEventListener('click', openModal);