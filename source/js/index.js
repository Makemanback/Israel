const desktop = 1024;
const slider = document.querySelector('.swiper-container');
let swiper;

if (window.innerWidth < desktop) {
  swiper = new Swiper('.swiper-container', {
    pagination: {
      el: '.swiper-pagination',
    }
  });
}


const destroySlider = () => {
  if (window.innerWidth >= desktop && swiper !== undefined) {
    const {destroyed} = swiper;
    console.log(`destroy`)
    return swiper.destroy();
    // if (destroyed !== undefined && destroyed !== true) {
    //   console.log(`destroyed`)
    //   return swiper.destroy();
    // }

  } else if (window.innerWidth < desktop) {
     return (
       swiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination'
        }
      })
     );
  } else {
    return;
  }
}

window.addEventListener('resize', destroySlider)
