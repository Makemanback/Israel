import Swiper from './vendor/swiper-bundle.esm.browser.min.js';
import IMask from './vendor/imask.es.min.js';

const DESKTOP = 1024;
const ESC_BUTTON = 'Escape';

let swiper = new Swiper('.swiper-container', {
  pagination: {
    el: '.swiper-pagination',
  },
});

if (window.innerWidth >= DESKTOP) {
  swiper.destroy();
}

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

reviewSlider.init();

// открытие модального окна
const name = document.querySelector('[name=name]');
const nameField = document.querySelector('#modal__name');
const tel = document.querySelector('[name=tel]');
const phone = document.querySelector('.header__order-call');
const modal = document.querySelector('.modal');
const modalCheckbox = document.querySelector('[name=modal_checkbox]');
const close = document.querySelectorAll('.close');
const success = document.querySelector('.success');
const wantBtn = document.querySelector('.want__button');
const feedBtn = document.querySelector('.feedback__button');

const wantTel = document.querySelector('[name=want_tel]');
const feedbackName = document.querySelector('[name=feedback_name]');
const feedbackTel = document.querySelector('[name=feedback_tel]');

close.forEach((button) => button.style.display = 'block')
modal.style.display = 'none';

let isStorageSupport = true;
let storage = '';

try {
  storage = localStorage.getItem('name');
  storage = localStorage.getItem('tel');
  storage = localStorage.getItem('want_tel')
  // console.log(localStorage.getItem('want_tel'))
} catch (err) {
  isStorageSupport = false;
}

const closeEscModal = (evt) => {
  if (evt.key === ESC_BUTTON) {
    evt.preventDefault();
    modal.classList.add('visually-hidden');
    success.classList.add('visually-hidden');
    document.body.style.overflow = 'visible';
    modal.style.display = 'none';
  }
};

const closeModal = (evt) => {
  evt.preventDefault();
  modal.classList.add('visually-hidden');
  success.classList.add('visually-hidden');
  document.body.style.overflow = 'visible';
  modal.style.display = 'none';
  document.removeEventListener('keydown', closeEscModal)
  document.removeEventListener('click', closeByOverlay)
}

const closeByOverlay = (evt) => {
  const {target} = evt;
  if (target.dataset.listener
      !== 'listen' &&
      target !== phone &&
      target !== wantBtn &&
      target !== feedBtn) {
    evt.preventDefault();
    document.body.style.overflow = 'visible';
    modal.style.display = 'none';
    modal.classList.add('visually-hidden');
    success.classList.add('visually-hidden');
  }
}

const openModal = (evt) => {
  evt.preventDefault();
  modal.style.display = 'flex'
  modal.classList.remove('visually-hidden');
  name.focus();
  document.body.style.overflow = 'hidden';

  if (storage) {
    name.value = storage;
    tel.value = storage;
  }

  document.addEventListener('keydown', closeEscModal);
  document.addEventListener('click', closeByOverlay);
  close.forEach((btn) => {
    btn.addEventListener('click', closeModal);
  })
}

phone.addEventListener('click', openModal);

// отправка формы
const submitBtn = document.querySelector('.modal__button');

const closeSuccess = (evt) => {
  evt.preventDefault()
  document.body.style.overflow = 'visible';
  document.addEventListener('keydown', closeEscModal);
  document.addEventListener('click', closeByOverlay);
}

const nameValidation = () => {
  const validityStateObject = nameField.validity;
    if (validityStateObject.valueMissing) {
      nameField.setCustomValidity('Заполните это поле!');
    }
}

nameField.addEventListener('invalid', (evt) => {
  evt.preventDefault();
  nameValidation();
})


const sendForm = () => {
  nameValidation()
  if (name.value !== '' && tel.value.length === 16 && modalCheckbox.checked) {
    modal.classList.add('visually-hidden');
    success.classList.remove('visually-hidden');
    document.body.style.overflow = 'hidden';
    document.removeEventListener('keydown', closeEscModal);
  }
};

const submitForm = (evt) => {
  evt.preventDefault()

  sendForm();

  if (isStorageSupport) {
    localStorage.setItem('name', name.value);
    localStorage.setItem('tel', tel.value);
  }
}

submitBtn.addEventListener('click', submitForm);
success.addEventListener('click', closeSuccess);

// блок хочу поехать
const submitFormWant = (evt) => {

  if (isStorageSupport) {
    console.log(localStorage.getItem('want_tel'))
    console.log(

      localStorage.setItem('tel', wantTel.value)
    )
  }

  evt.preventDefault()
  if (wantTel.value.length === 16) {
    window.innerWidth > DESKTOP
      ? success.classList.add('success--translate-desk')
      : success.classList.add('success--translate-mob');

    success.classList.remove('visually-hidden');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeEscModal);
    document.addEventListener('click', closeByOverlay);
  }
}

wantBtn.addEventListener('click', submitFormWant);

// блок обратной связи
const submitFormFeed = (evt) => {
  evt.preventDefault()

  if (feedbackName.value !== '' && feedbackTel.value.length === 16) {
    success.classList.add('success--translate-feed');

    success.classList.remove('visually-hidden');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeEscModal);
    document.addEventListener('click', closeByOverlay);
  }
}

feedBtn.addEventListener('click', submitFormFeed);

// аккордеон в вопросах
const faqItems = document.querySelectorAll('.faq__item>p');
faqItems.forEach((item) => item.classList.add('visually-hidden'));

const questionItems = document.querySelectorAll('.faq__item');

const toggleQuestion = (number) => {
  faqItems.forEach((li) => {
    li.dataset.item === number ?
      li.classList.toggle('visually-hidden') :
      null
  });
  questionItems.forEach((li) => {
    li.dataset.item === number ?
      li.classList.toggle('faq__item--active') :
      null
  })
}

const openText = ({target}) => toggleQuestion(target.dataset.item)

questionItems.forEach((item) => {
  item.addEventListener('click', openText);
})

// переключение программ
const programsContainer = document.querySelector('.programs__list');
const programs = document.querySelectorAll('.programs__button');
const programItems = document.querySelectorAll('.programs__description>li');
const common = document.querySelector('.programs__common');
const academic = document.querySelector('.programs__academic');
const internship = document.querySelector('.programs__internship');
const volunteer = document.querySelector('.programs__volunteer');
const religion = document.querySelector('.programs__religion');

const switchProgram = (evt) => {
  evt.preventDefault();
  const {target} = evt;

  const toggleProgram = (programName, activeBtn) => {

    programItems.forEach((li) => {
      li.dataset.program === programName ?
        li.classList.remove('visually-hidden') :
        li.classList.add('visually-hidden');
    });

    programs.forEach((btn) => btn.classList.remove('programs__button--active'));
    activeBtn.classList.add('programs__button--active');
  };

  switch (target) {
    case common:
      toggleProgram('common', programs[0]);
      break;
    case academic:
      toggleProgram('academic', programs[1]);
      break;
    case internship:
      toggleProgram('internship', programs[2]);
      break;
    case volunteer:
      toggleProgram('volunteer', programs[3]);
      break;
    case religion:
      toggleProgram('religion', programs[4]);
      break;
  }
}

programsContainer.addEventListener('click', switchProgram)


// маски

const tels = document.querySelectorAll('input[type="tel"]');
/*eslint-disable*/
const maskOptions = {
  mask: '+{7}(000)000-00-00',
};

const masks = tels.forEach((tel) => IMask(tel, maskOptions));

const scroll = document.querySelector('.header__scroll-button');
const life = document.querySelector('.life');

const scrollDown = (elem) => {
    return elem.scrollIntoView({block: 'center', behavior: 'smooth'});
}

scroll.addEventListener('click', () => scrollDown(life));
