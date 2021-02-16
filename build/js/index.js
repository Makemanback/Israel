"use strict";

var desktop = 1024;
var slider = document.querySelector('.swiper-container');
var swiper;

if (window.innerWidth < desktop) {
  swiper = new Swiper('.swiper-container', {
    pagination: {
      el: '.swiper-pagination'
    }
  });
}

var destroySlider = function destroySlider() {
  if (window.innerWidth >= desktop && swiper !== undefined) {
    var _swiper = swiper,
        destroyed = _swiper.destroyed;
    console.log("destroy");
    return swiper.destroy(); // if (destroyed !== undefined && destroyed !== true) {
    //   console.log(`destroyed`)
    //   return swiper.destroy();
    // }
  } else if (window.innerWidth < desktop) {
    return swiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination'
      }
    });
  } else {
    return;
  }
};

window.addEventListener('resize', destroySlider);