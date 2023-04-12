/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
  const result = document.querySelector('.calculating__result span'); // ваша суточная норма калорий:

  let sex;
  let height;
  let weight;
  let age;
  let ratio;

  initLocalSettings('#gender div', 'calculating__choose-item_active'); // устанавливает значения и классы активности в соответствии с localStorage
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active'); // устанавливает значения и классы активности в соответствии с localStorage
  calcTotal(); // вычисляет калории и показывает результат, первый вызов, чтобы сразу скрыть блок с результатом
  getStaticInformation('#gender div', 'calculating__choose-item_active'); // получает значения пол
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active'); // получает значения физическая активность
  getDynamicInformation('#height'); // получает значения ваша конституция
  getDynamicInformation('#weight'); // получает значения ваша конституция
  getDynamicInformation('#age'); // получает значения ваша конституция

  function initLocalSettings(selector, activeClass) { // устанавливает значения и классы активности в соответствии с localStorage
    const elements = document.querySelectorAll(selector);

    if (localStorage.getItem('sex')) { // если в localStorage есть значение, устанавливает его
      sex = localStorage.getItem('sex');
    } else {
      sex = 'female';
      localStorage.setItem('sex', sex); // если в localStorage нет значения, то устанавливает по умолчанию
    }

    if (localStorage.getItem('ratio')) { // если в localStorage есть значение, устанавливает его
      ratio = localStorage.getItem('ratio');
    } else {
      ratio = 1.375;
      localStorage.setItem('ratio', ratio); // если в localStorage нет значения, то устанавливает по умолчанию
    }

    document.querySelectorAll('.calculating__choose-item').forEach((item) => { // очищает все поля ввода
      item.value = '';
    });

    elements.forEach((elem) => {
      elem.classList.remove(activeClass); // убирает класс активности у всех блоков
      if (elem.getAttribute('id') === localStorage.getItem('sex')) { // устанавливает классы активности на блоки со значениями как в localStorage
        elem.classList.add(activeClass);
      }
      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) { // устанавливает классы активности на блоки со значениями как в localStorage
        elem.classList.add(activeClass);
      }
    });
  }

  function calcTotal() { // вычисляет калории и показывает результат
    if (!sex || !height || !weight || !age || !ratio) {
      result.parentElement.style.visibility = 'hidden'; // если не все поля заполнены, скрывает блок c результатом
      return; // прерывает выполнение функции
    }

    result.parentElement.style.visibility = 'visible'; // показывает блок c результатом

    if (sex === 'female') { // https://fitseven.ru/zdorovie/metabolism/sutochnaya-norma-kaloriy
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  }

  function getStaticInformation(selector, activeClass) { // получает значения пол и физическая активность
    const elements = document.querySelectorAll(selector); // получает все блоки внутри parentSelector

    elements.forEach((item) => {
      item.addEventListener('click', (event) => {
        if (event.target.getAttribute('data-ratio')) { // если у объекта события есть аттрибут data-ratio="..."
          ratio = +event.target.getAttribute('data-ratio'); // берет его значение
          localStorage.setItem('ratio', ratio);
        } else { // если нет аттрибута
          sex = event.target.getAttribute('id'); // берет значение из id
          localStorage.setItem('sex', sex);
        }

        elements.forEach((elem) => { // убирает класс активности у всех блоков
          elem.classList.remove(activeClass);
        });

        event.target.classList.add(activeClass); // добавляет класс активности выбранному блоку

        calcTotal();
      });
    });
  }

  function getDynamicInformation(selector) { // получает значения ваша конституция
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {

      if (input.value.match(/\D/)) { // если введенное значение не число
        input.style.border = '1px solid red'; // добавляет рамку
      } else {
        input.style.border = 'none';
      }

      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");


function cards() {

  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
    .then((data) => createCard(data));

  function createCard(data) {
    data.forEach(({img, altimg, title, descr, price}) => { // Для каждого объекта из массива menu разбивает его на значения и они присваиваются переменным с таким же именем
      const element = document.createElement('div');
      element.classList.add('menu__item');
      element.innerHTML = `
        <img src=${img} alt=${altimg}>
        <h3 class="menu__item-subtitle">${title}</h3>
        <div class="menu__item-descr">${descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${price}</span> руб/день</div>
        `; // Можно не ставить кавычки для src и alt, html сам их подставит, но не должно быть пробелов

      document.querySelector('.menu .container').append(element);
    });
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");



function forms() {
  const formTags = document.querySelectorAll('form');
  const modalBlock = document.querySelector('.modal'); // изначально в html стоит класс .hide

  formTags.forEach((item) => { // На каждую форму вешает обработчик формы
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener('submit', (event) => { // Событие отправка формы кликом на кнопку или enter
      event.preventDefault();

      const spinner = document.createElement('img'); // К форме добавляется спиннер загрузки
      spinner.setAttribute('src', 'img/form/spinner.svg');
      spinner.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement('afterend', spinner); // При загрузке показывает спиннер после формы

      const formData = new FormData(form); // Данные из формы, во всех input обязательно должны быть аттрибуты name=""

      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      // Данные из формы превращает в массив массивов, его в обычный объект, а его в JSON

      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json) // Настраивает и посылает запрос на сервер
        .then((data) => { // Обработка успешного promise
          console.log(data); // Ответ от сервера
          showThanksModal('Спасибо! Скоро мы с вами свяжемся');
          spinner.remove(); // Удаляет спиннер загрузки
        })
        .catch(() => { // Обработка reject (ошибки)
          showThanksModal('Что-то пошло не так...');
        })
        .finally(() => { // Выполнится в любом случае
          form.reset(); // Очистка формы
        });
    });
  }

  function showThanksModal(text) { // Меняет модальное окно на сообщение об отправке
    const formModalDialog = document.querySelector('.modal__dialog');

    formModalDialog.classList.add('hide'); // Скрывает внутреннюю часть старого окна
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalShow)('.modal'); // Показывает модальное окно с пустой внутренней частью

    const thanksModalDialog = document.createElement('div'); // Создает внутреннюю часть с текстом text
    thanksModalDialog.classList.add('modal__dialog');
    thanksModalDialog.innerHTML = `
    <div class="modal__content">
      <div data-close class="modal__close">&times;</div>
      <div class="modal__title">${text}</div>
    </div>
    `;
    modalBlock.append(thanksModalDialog); // Вставляет новую внутреннюю часть в модальное окно
    setTimeout(() => { // Через 4с скрывает окно и возвращает внутреннюю часть с формой
      thanksModalDialog.remove();
      formModalDialog.classList.remove('hide');
      formModalDialog.classList.add('show');
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalHide)('.modal');
    }, 4000);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "modalHide": () => (/* binding */ modalHide),
/* harmony export */   "modalShow": () => (/* binding */ modalShow)
/* harmony export */ });
function modalShow(modalBlockSelector, modalTimerId) {
  const modalBlock = document.querySelector(modalBlockSelector); // Изначально в html стоит класс hide
  modalBlock.classList.add('show'); // display: block;
  modalBlock.classList.remove('hide'); // display: none;
  document.body.style.overflow = 'hidden'; // Предотвращает прокрутку страницы, когда открыто модальное окно

  if (modalTimerId) { // Если задан таймер на автоматическое открытие окна
    clearInterval(modalTimerId); // Удаляет таймер автоматического открытия окна, если оно уже открывалось
  }
}

function modalHide(modalBlockSelector) {
  const modalBlock = document.querySelector(modalBlockSelector); // Изначально в html стоит класс hide
  modalBlock.classList.add('hide');
  modalBlock.classList.remove('show');
  document.body.style.overflow = ''; // Возвращает прокрутку страницы, когда закрыто модальное окно
}

function modal(modalBlockSelector, modalTriggerSelector, modalTimerId) {
  const modalBlock = document.querySelector(modalBlockSelector); // Изначально в html стоит класс hide
  const modalTrigger = document.querySelectorAll(modalTriggerSelector); // Кнопка для вызова модального окна

  modalTrigger.forEach((item) => { // Показавает окно при клике на кнопки 'Связаться с нами'
    item.addEventListener('click', () => modalShow(modalBlockSelector, modalTimerId));
  });

  // window.addEventListener('scroll', showModalByScroll); // Показывает окно при прокрутке страницы до самого конца

  modalBlock.addEventListener('click', (event) => { // Закрывает окно при клике на область вокруг .modal__dialog или на крестик
    if (event.target === modalBlock || event.target.matches('[data-close]')) {
      modalHide(modalBlockSelector);
    }
  });

  document.addEventListener('keydown', (event) => { // Закрывает окно при нажатии Esc
    if (event.code === 'Escape' && modalBlock.classList.contains('show')) {
      modalHide(modalBlockSelector);
    }
  });

  function showModalByScroll() {
    if (document.documentElement.scrollTop + 1 + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      // Сколько прокручено до видимого экрана + Высота видимого экрана = Высота всего элемента без прокрутки. document.documentElement это <html></html>
      modalShow(modalBlockSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({
  sliderBlockSelector,
  currentSelector,
  totalSelector,
  innerSelector,
  wrapperSelector,
  slideSelector,
  navigationSelector,
  dotSelector,
  nextArrowSelector,
  prevArrowSelector,
}) {
  const sliderBlock = document.querySelector(sliderBlockSelector); // '.offer__slider'
  const current = document.querySelector(currentSelector); // '#current'
  const total = document.querySelector(totalSelector); // '#total'
  const inner = document.querySelector(innerSelector); // '.offer__slider-inner'
  const wrapper = document.querySelector(wrapperSelector); // '.offer__slider-wrapper'
  const slides = document.querySelectorAll(slideSelector); // клоны сюда не попадут, это статический nodelist // '.offer__slide'
  const nav = document.querySelector(navigationSelector); // блок с точками // '.offer__slider-navigation'

  const transition = 0.75; // время плавного перехода между слайдами в секундах
  const wrapperWidth = parseInt(window.getComputedStyle(wrapper).width, 10); // parseInt отбрасывает 'px'
  const threshold = wrapperWidth * 0.33; // порог, после которого переключается слайд = треть от ширины одного слайда
  let mouseStart = 0; // начальное положение мыши
  let mouseMove = 0; // смещение мыши
  let initialPos; // позиция слайдера перед началом перетаскивания
  let dots; // точки
  let slideIndex = 1; // начальные значения
  let canSlide = true; // начальные значения

  sliderInitialization(); // создание элементов слайдера и задание начального положения
  sliderBtnsClicks(); // клик на кнопки и точки
  sliderDragActions(); // перетаскивание для слайдера

  function getZero(num) { // Если число из одной цифры, добавляет перед ним 0
    if (num >= 0 && num < 10) {
      return `0${num}`;
    }
    return num;
  }

  function sliderInitialization() { // создание элементов слайдера и задание начального положения
    const firstSlideClone = document.createElement('div'); // создает клон первого слайда и помещает его в конец
    firstSlideClone.classList.add(`${slideSelector.slice(1)}`); // slice убирает точку в начале
    firstSlideClone.innerHTML = slides[0].innerHTML;
    inner.append(firstSlideClone);

    const lastSlideClone = document.createElement('div'); // создает клон последнего слайда и помещает его в начало
    lastSlideClone.classList.add(`${slideSelector.slice(1)}`); // slice убирает точку в начале
    lastSlideClone.innerHTML = slides[slides.length - 1].innerHTML;
    inner.prepend(lastSlideClone);

    for (let i = 0; i < slides.length; i += 1) { // создает точки по количеству слайдов
      const dot = document.createElement('div');
      dot.classList.add(`${dotSelector.slice(1)}`); // slice убирает точку в начале
      nav.append(dot);
      dots = document.querySelectorAll(dotSelector); // '.offer__slider-dot'
    }

    inner.style.width = `${wrapperWidth * (slides.length + 2)}px`; // устанавливает ширину ленты со слайдами, +2 это два клона, которых нет в slides
    total.textContent = getZero(slides.length); // показывает общее число слайдов (клоны слайдов не считаются)
    currentAndDots(); // показывает номер слайда и делает активной точку
    showSlide(); // показывает слайд по индексу
  }

  function clickDelay() { // следующий клик можно сделать только через указанное время
    canSlide = false;
    setTimeout(() => {
      canSlide = true;
    }, transition * 1000); // сек переводятся в мс
  }

  function currentAndDots() { // показывает номер слайда и делает активной точку
    current.textContent = getZero(slideIndex); // getZero добавляет ноль, если число из 1 цифры
    dots.forEach((dot) => dot.classList.remove(`${dotSelector.slice(1)}_active`)); // удаляет класс активности со всех точек
    dots[slideIndex - 1].classList.add(`${dotSelector.slice(1)}_active`); // показывает точку по индексу
  }

  function showSlide() { // показывает слайд по индексу
    inner.style.transform = `translateX(${-wrapperWidth * slideIndex}px)`; // показывает слайд
  }

  function addAnimation() {
    inner.style.transition = `all ${transition}s`; // добавляет анимацию плавного перелистывания
  }

  function removeAnimation() {
    inner.addEventListener('transitionend', () => inner.style.transition = 'none'); // ждет окончания анимации и убирает анимацию;
  }

  function nextSlide() {
    addAnimation(); // добавляет анимацию плавного перелистывания
    slideIndex += 1;
    if (slideIndex > slides.length) { // долистал до последнего слайда
      slideIndex = 1; // счетчик на первый слайд
      inner.style.transform = `translateX(${-wrapperWidth * (slides.length + 1)}px)`; // показывает клон 1го
      inner.addEventListener('transitionend', () => { // ждет окончания анимации
        inner.style.transition = 'none'; // убирает анимацию, чтобы незаметно перейти на первый слайд
        inner.style.transform = `translateX(${-wrapperWidth * slideIndex}px)`; // переходит на первый слайд
      });
    } else {
      showSlide(); // показывает слайд по индексу
      removeAnimation(); // ждет окончания анимации и убирает анимацию;
    }
    currentAndDots(); // показывает номер слайда и делает активной точку
    clickDelay(); // добавляет задержку 1с
  }

  function prevSlide() {
    addAnimation(); // добавляет анимацию плавного перелистывания
    slideIndex -= 1;
    if (slideIndex < 1) { // долистал до 1 слайда
      slideIndex = slides.length; // счетчик на последний слайд
      inner.style.transform = `translateX(${0}px)`; // показывает клон последнего слайда
      inner.addEventListener('transitionend', () => { // ждет окончания анимации
        inner.style.transition = 'none'; // убирает анимацию, чтобы незаметно перейти на последний слайд
        inner.style.transform = `translateX(${-wrapperWidth * slideIndex}px)`; // переходит на последний слайд
      });
    } else {
      showSlide(); // показывает слайд по индексу
      removeAnimation(); // ждет окончания анимации и убирает анимацию;
    }
    currentAndDots(); // показывает номер слайда и делает активной точку
    clickDelay(); // добавляет задержку 1с
  }

  function sliderBtnsClicks() { // клик на кнопки и точки
    sliderBlock.addEventListener('click', (event) => {
      event.preventDefault();
      if (canSlide === true) { // не запускает обработчик, пока не прошла задержка
        if (event.target && event.target.closest(nextArrowSelector) && sliderBlock.contains(event.target.closest(nextArrowSelector))) {
          // closest возвращает ближайший родительский элемент (или сам элемент), который соответствует. contains проверяет, что соотв. элемент находится внутри слайдера
          nextSlide();
        } else if (event.target && event.target.closest(prevArrowSelector) && sliderBlock.contains(event.target.closest(prevArrowSelector))) {
          prevSlide();
        } else if (event.target && event.target.closest(dotSelector) && sliderBlock.contains(event.target.closest(dotSelector))) { // клик на точки
          addAnimation(); // добавляет анимацию плавного перелистывания
          dots.forEach((item, i) => {
            if (item === event.target) { // находит точку, на которую нажали
              slideIndex = i + 1;
              currentAndDots(); // показывает номер слайда и делает активной точку
              showSlide(); // показывает слайд по индексу
              removeAnimation(); // ждет окончания анимации и убирает анимацию;
            }
          });
        }
      }
    });
  }

  function sliderDragActions() { // перетаскивание для слайдера
    inner.addEventListener('mousedown', (event) => { // нажатие мыши
      // проверить, что у элемента нет css свойства transition, c ним всё глючит. в моем слайдере оно добавляется когда надо и сразу удаляется
      event.preventDefault(); // удаляет встроенное в браузер перетаскивание картинки
      if (canSlide === true) { // не запускает обработчик, пока не прошла задержка
        mouseStart = event.clientX; // положение мыши при нажатии
        initialPos = +inner.style.transform.match(/[-0-9.]+/)[0]; // translateX перед началом перетаскивания

        inner.addEventListener('mousemove', dragAction); // движение мыши
        inner.addEventListener('mouseup', dragEnd); // отпускание мыши
        inner.addEventListener('mouseout', dragEnd); // отменяет перетаскивание, если курсор вышел за пределы слайда
      }
    });
  }

  function dragAction(event) {
    mouseMove = mouseStart - event.clientX; // после события onmousemove смещение курсора от начального положения на 1px влево или вправо
    mouseStart = event.clientX; // сразу возвращает начальное положение к месту, где находится мышь

    const currentTransform = +inner.style.transform.match(/[-0-9.]+/)[0];
    // текущее значение translateX, рег.выражение отбрасывает текст "translateX:" и оставляет только минус, цифры и точки,
    // + значит каждый символ из скобок может повторяться 1 или более раз. остается массив с числом, берем 0й элемент

    inner.style.transform = `translateX(${currentTransform - mouseMove}px)`;
  }

  function dragEnd() {
    const finalPos = +inner.style.transform.match(/[-0-9.]+/)[0]; // translateX в конце перетаскивания

    if (-finalPos - -initialPos === 0) { // если не сдвигали слайдер, просто кликнули
      inner.style.transition = 'none';
    } else if (-finalPos - -initialPos > threshold) { // если смещение больше порога и положительное, переключает на следующий слайд
      nextSlide();
    } else if (-finalPos - -initialPos < -threshold) { // если смещение больше порога и отрицательное, переключает на предыдущий слайд
      prevSlide();
    } else { // если смещение меньше порога, возвращает к тому положению, где была зажата ЛКМ
      inner.style.transition = `all ${transition}s`; // добавляет анимацию плавного перелистывания
      inner.style.transform = `translateX(${initialPos}px)`;
      inner.addEventListener('transitionend', () => inner.style.transition = 'none'); // ждет окончания анимации и убирает анимацию;
      clickDelay(); // добавляет задержку
    }

    inner.removeEventListener('mousemove', dragAction); // удаляет все обработчики событий
    inner.removeEventListener('mouseup', dragEnd);
    inner.removeEventListener('mouseout', dragEnd);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);



/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabContentBlockSelector, tabHeaderContainerSelector, tabHeaderItemSelector) {
  const tabContentBlocks = document.querySelectorAll(tabContentBlockSelector); // Все вкладки
  const tabHeaderContainer = document.querySelector(tabHeaderContainerSelector); // Контейнер с заголовками вкладок
  const tabHeaderItems = document.querySelectorAll(tabHeaderItemSelector); // Все заголовки вкладок

  hideTabContent(); // Скрывает все вкладки
  showTabContent(); // Показывает первую вкладку по умолчанию (i = 0 в функции showTabContent)

  tabHeaderContainer.addEventListener('click', (event) => { // Обрабатывает клик на контейнер с вкладками
    if (event.target && event.target.matches(tabHeaderItemSelector)) { // Проверяет клик на заголовок вкладки
      tabHeaderItems.forEach((item, i) => { // Определяет номер
        if (item === event.target) {
          hideTabContent();
          showTabContent(i); // Показывает вкладку с выбранным номером
        }
      });
    }
  });

  function hideTabContent() { // Скрывает все вкладки
    tabContentBlocks.forEach((item) => {
      item.classList.add('hide'); // display: none;
      item.classList.remove('show', 'fade');
    });
    tabHeaderItems.forEach((item) => {
      item.classList.remove(`${tabHeaderItemSelector.slice(1)}_active`);
      // Убирает класс активности у всех заголовков. slice убирает точку в начале имени класса
    });
  }

  function showTabContent(i = 0) { // Показывает выбранную вкладку
    tabContentBlocks[i].classList.add('show', 'fade'); // display: block;
    tabContentBlocks[i].classList.remove('hide');
    tabHeaderItems[i].classList.add(`${tabHeaderItemSelector.slice(1)}_active`);
    // Добавляет класс активности к выбранному заголовку. slice убирает точку в начале имени класса
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
  let deadline; // дата окончания акции

  promotionTime(); // устанавливает время окончания акции
  setClock('.timer', deadline); // устанавливает таймер

  function promotionTime() { // устанавливает время окончания акции
    if (localStorage.getItem('deadline') && Date.parse(localStorage.getItem('deadline')) > Date.parse(new Date())) {
      // если в локальном хранилище есть дата окончания акции, и она позже сегодняшней
      deadline = localStorage.getItem('deadline'); // использует эту дату
    } else { // если в локальном хранилище нет даты окончания акции или она просрочена
      const deadlineCalc = new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)); // текущая дата в текущем часовом поясе + 1д
      deadline = new Date(deadlineCalc.getFullYear(), deadlineCalc.getMonth(), deadlineCalc.getDate(), 0, 0, 0); // обнуляет часы минуты и сек в deadlineCalc
      localStorage.setItem('deadline', deadline); // записывает получившуюся дату в локальное хранилище
    }

    const promotionEndText = new Date(deadline).toLocaleString('ru', {
      day: '2-digit',
      month: 'long',
    }); // выводит дату в виде 2 цифр и месяц в виде слова, склоняя на русском языке

    document.querySelector('#promotion-end').textContent = `Акция закончится ${promotionEndText} в 00:00`; // добавляет текст на страницу
  }

  function getTimeRemaining(endtime) { // Вычисляет оставшееся время от текущей даты до endtime
    const t = Date.parse(endtime) - Date.parse(new Date()); // Вычитает текущую дату из конечной в мс
    const days = Math.floor(t / (1000 * 60 * 60 * 24)); // мс в дни
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24); // мс в часы как остаток от деления на 24
    const minutes = Math.floor((t / (1000 * 60)) % 60); // мс в минуты как остаток от деления на 60
    const seconds = Math.floor((t / 1000) % 60); // мс в секунды как остаток от деления на 60

    return { // Возвращает оставшееся время как объект
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) { // Если число из одной цифры, добавляет перед ним 0
    if (num >= 0 && num < 10) {
      return `0${num}`;
    }
    return num;
  }

  function setClock(timerBlock, endtime) { // устанавливает таймер
    const timer = document.querySelector(timerBlock); // Контейнер с блоками таймера
    const days = timer.querySelector('#days'); // Блок с днями
    const hours = timer.querySelector('#hours'); // Блок с часами
    const minutes = timer.querySelector('#minutes'); // Блок с минутами
    const seconds = timer.querySelector('#seconds'); // Блок с секундами

    const timeInterval = setInterval(updateClock, 1000); // Обновление таймера будет запускаться каждую секунду

    updateClock(); // Запускает функцию сразу, чтобы не ждать 1с до первого обновления

    function updateClock() { // Обновление таймера
      const t = getTimeRemaining(endtime); // Создает объект с оставшимся временем

      days.textContent = getZero(t.days);
      hours.textContent = getZero(t.hours);
      minutes.textContent = getZero(t.minutes);
      seconds.textContent = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval); // Останавливает обновление таймера, когда там будет 0
      }
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async(url, data) => { // Настраивает и посылает запрос на сервер
  const result = await fetch(url, { // await дождется результата функции fetch
    method: 'POST', // POST это отправка, GET получение
    headers: {'Content-type': 'application/json'}, // Заголовки нужны для JSON, если на сервер отправлять formData, то не нужны
    body: data, // Тело запроса, если запрос GET, то не нужно
  });

  return await result.json(); // Ответ от сервера в виде PROMISE в формате JSON
};

const getResource = async(url) => { // Настраивает и посылает запрос на сервер
  const result = await fetch(url); // Fetch возвращает promise

  if (!result.ok) { // Если не удалось выполнить запрос
    throw new Error(`Could not fetch ${url}, status: ${result.status}`); // Создает объект ошибки и выбрасывает его как исключение
  }

  return await result.json(); // Возвращает promise в формате JSON
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
 // Вкладки
 // Таймер
 // Модальное окно
 // Создание карточек меню
 // Формы
 // Самодельный слайдер
 // Калькулятор

 // Открывает модальное окно

window.addEventListener('DOMContentLoaded', () => {
  // const modalTimerId = setTimeout(() => modalShow('.modal', modalTimerId), 300000);
  // Автоматически открывает модальное окно по таймеру через 5 минут, передать его аргументом в modal()

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabcontent', '.tabheader__items', '.tabheader__item');
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])('.modal', '[data-modal]'); // сюда третьим аргументом передать modalTimerId, чтобы таймер удалялся при открытии модального окна
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
    sliderBlockSelector: '.offer__slider',
    currentSelector: '#current',
    totalSelector: '#total',
    innerSelector: '.offer__slider-inner',
    wrapperSelector: '.offer__slider-wrapper',
    slideSelector: '.offer__slide',
    navigationSelector: '.offer__slider-navigation',
    dotSelector: '.offer__slider-dot',
    nextArrowSelector: '.offer__slider-next',
    prevArrowSelector: '.offer__slider-prev',
  });
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map