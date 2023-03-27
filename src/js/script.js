'use strict';

window.addEventListener('DOMContentLoaded', () => {
  // Вкладки
  const tabContentBlocks = document.querySelectorAll('.tabcontent'); // Блоки с картинкой
  const tabHeaderContainer = document.querySelector('.tabheader__items'); // Контейнер с вкладками
  const tabHeaderItems = document.querySelectorAll('.tabheader__item'); // Вкладки

  function hideTabContent() { // Удаляет все блоки с картинкой
    tabContentBlocks.forEach((item) => {
      item.classList.add('hide'); // display: none;
      item.classList.remove('show', 'fade');
    });
    tabHeaderItems.forEach((item) => {
      item.classList.remove('tabheader__item_active'); // Делает все вкладки неактивными
    });
  }

  function showTabContent(i = 0) { // Показывает выбранный блок с картинкой
    tabContentBlocks[i].classList.add('show', 'fade'); // display: block;
    tabContentBlocks[i].classList.remove('hide');
    tabHeaderItems[i].classList.add('tabheader__item_active'); // Активирует выбранную вкладку
  }

  hideTabContent(); //
  showTabContent(); // Показывает первую вкладку по умолчанию (i = 0 в функции showTabContent)

  tabHeaderContainer.addEventListener('click', (event) => { // Обрабатывает клик на контейнер с вкладками

    if (event.target && event.target.matches('.tabheader__item')) { // Проверяет клик на вкладку
      tabHeaderItems.forEach((item, i) => { // Определяет номер вкладки
        if (item === event.target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  // Таймер
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

  function setClock(timerBlock, endtime) {
    const timer = document.querySelector(timerBlock); // Контейнер с блоками таймера
    const days = timer.querySelector('#days'); // Блок с днями
    const hours = timer.querySelector('#hours'); // Блок с часами
    const minutes = timer.querySelector('#minutes'); // Блок с минутами
    const seconds = timer.querySelector('#seconds'); // Блок с секундами
    const timeInterval = setInterval(updateClock, 1000); // Обновление таймера будет запускаться каждую секунду

    updateClock(); // Запускает функцию сразу, чтобы не ждать 1с до первого обновления

    function updateClock() { // Обновление таймера
      const t = getTimeRemaining(endtime); // Создает объект с оставшимся временем

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval); // Останавливает обновление таймера, когда там будет 0
      }
    }
  }

  function randomInteger(min, max) { // Случайное целое число от min до max
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  const deadline = new Date(Date.parse(new Date()) + randomInteger((1 * 24 * 60 * 60 * 1000), (3 * 24 * 60 * 60 * 1000))); // Добавляет случайное количество дней от 1 до 3 к текущей дате

  setClock('.timer', deadline);

  // Модальное окно
  const modalTrigger = document.querySelectorAll('[data-modal]');
  const modal = document.querySelector('.modal'); // Изначально стоит класс .hide

  function modalShow() {
    modal.classList.add('show'); // display: block;
    modal.classList.remove('hide'); // display: none;
    document.body.style.overflow = 'hidden'; // Предотвращает прокрутку страницы, когда открыто модальное окно
    clearInterval(modalTimerId); // Предотвращает открытие окна по таймеру, если уже открывали вручную
  }

  function modalHide() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Возвращает прокрутку страницы, когда закрыто модальное окно
  }

  modalTrigger.forEach((item) => { // Показавает окно при клике на кнопки 'Связаться с нами'
    item.addEventListener('click', modalShow);
  });


  modal.addEventListener('click', (event) => { // Закрывает окно при клике на область вокруг .modal__dialog или на крестик
    if (event.target === modal || event.target.matches('[data-close]')) {
      modalHide();
    }
  });

  document.addEventListener('keydown', (event) => { // Закрывает окно при нажатии Esc
    if (event.code === 'Escape' && modal.classList.contains('show')) {
      modalHide();
    }
  });

  const modalTimerId = setTimeout(modalShow, 9999999999); // Автоматически открывает модальное окно по таймеру

  function showModalByScroll() {
    if (document.documentElement.scrollTop + 1 + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { // document.documentElement это <html></html>
      // Сколько прокручено до видимого экрана + Высота видимого экрана = Высота всего элемента без прокрутки
      modalShow();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll); // Показывает окно при прокрутке страницы до самого конца

  // Создание карточек меню

  const getResource = async(url) => { // Настраивает и посылает запрос на сервер
    const result = await fetch(url); // Fetch возвращает promise

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, status: ${result.status}`); // Создает объект ошибки и выбрасывает его как исключение
    }

    return await result.json(); // Promise в формате JSON
  };

  getResource('http://localhost:3000/menu')
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

  // Формы

  const forms = document.querySelectorAll('form');

  forms.forEach((item) => { // На каждую форму вешает обработчик формы
    bindPostData(item);
  });

  const postData = async(url, data) => { // Настраивает и посылает запрос на сервер
    const result = await fetch(url, { // await дождется результата фукции fetch
      method: 'POST', // POST это отправка, GET получение
      headers: {'Content-type': 'application/json'}, // Заголовки нужны для JSON, если на сервер отправлять formData, то не нужны
      body: data, // Тело запроса, если запрос GET, то не нужно
    });

    return await result.json(); // Ответ от сервера в виде PROMISE в формате JSON
  };

  function bindPostData(form) {
    form.addEventListener('submit', (event) => { // Событие отправка формы кликом на кнопку или enter
      event.preventDefault();

      const statusMessage = document.createElement('img'); // К форме добавляется блок с сообщениями о статусе отправки
      statusMessage.setAttribute('src', 'img/form/spinner.svg');
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement('afterend', statusMessage); // При загрузке показывает спиннер после формы

      const formData = new FormData(form); // Данные из формы, во всех input обязательно должны быть аттрибуты name=""

      const json = JSON.stringify(Object.fromEntries(formData.entries())); // Данные из формы превращает в массив массивов, его в обычный объект, а его в JSON

      postData('http://localhost:3000/requests', json)
        .then((data) => { // Обработка успешного promise
          console.log(data); // Ответ от сервера
          showThanksModal('Спасибо! Скоро мы с вами свяжемся');
          statusMessage.remove(); // Удаляет спиннер загрузки
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
    modalShow();

    const thanksModalDialog = document.createElement('div');
    thanksModalDialog.classList.add('modal__dialog');
    thanksModalDialog.innerHTML = `
    <div class="modal__content">
      <div data-close class="modal__close">&times;</div>
      <div class="modal__title">${text}</div>
    </div>
    `;
    modal.append(thanksModalDialog); // Вставляет новую внутреннюю часть
    setTimeout(() => { // Через 4с скрывает окно и возвращает внутреннюю часть с формой
      thanksModalDialog.remove();
      formModalDialog.classList.remove('hide');
      formModalDialog.classList.add('show');
      modalHide();
    }, 4000);
  }

  // Самодельный слайдер

  const slider = document.querySelector('.offer__slider');
  const current = document.querySelector('#current');
  const total = document.querySelector('#total');
  const inner = document.querySelector('.offer__slider-inner');
  const wrapper = document.querySelector('.offer__slider-wrapper');
  const slides = document.querySelectorAll('.offer__slide'); // клоны сюда не попадут, это статический nodelist
  const transition = 0.75; // время плавного перехода между слайдами в секундах

  const firstSlideClone = document.createElement('div'); // создает клон первого слайда и помещает его в конец
  firstSlideClone.classList.add('offer__slide');
  firstSlideClone.innerHTML = slides[0].innerHTML;
  inner.append(firstSlideClone);

  const lastSlideClone = document.createElement('div'); // создает клон последнего слайда и помещает его в начало
  lastSlideClone.classList.add('offer__slide');
  lastSlideClone.innerHTML = slides[slides.length - 1].innerHTML;
  inner.prepend(lastSlideClone);

  const nav = document.querySelector('.offer__slider-navigation'); // блок с точками
  let dots;
  for (let i = 0; i < slides.length; i += 1) { // создает точки по количеству слайдов
    const dot = document.createElement('div');
    dot.classList.add('offer__slider-dot');
    nav.append(dot);
    dots = document.querySelectorAll('.offer__slider-dot');
  }


  const wrapperWidth = parseInt(window.getComputedStyle(wrapper).width, 10); // parseInt отбрасывает 'px'
  let slideIndex = 1;
  let canSlide = true;
  inner.style.width = `${wrapperWidth * (slides.length + 2)}px`; // ширина ленты со слайдами, +2 это два клона, которых нет в slides
  current.textContent = getZero(slideIndex); // getZero добавляет ноль, если число из 1 цифры
  total.textContent = getZero(slides.length); // клоны слайдов не считаются
  inner.style.transform = `translateX(${-wrapperWidth * (slideIndex)}px)`; // сначала показывает первый слайд
  dots[slideIndex - 1].classList.add('offer__slider-dot-active'); // сначала активна первая точка

  function clickDelay() { // Следующий клик можно сделать только через указанное время
    canSlide = false;
    setTimeout(() => {
      canSlide = true;
    }, transition * 1000); // сек переводятся в мс
  }

  function removeTransition() {
    inner.addEventListener('transitionend', () => { // ждет окончания анимации
      inner.style.transition = 'none'; // убирает эффект перехода
    });
  }

  function nextSlide() {
    inner.style.transition = `all ${transition}s`; // добавляет анимацию плавного перелистывания
    slideIndex += 1;
    if (slideIndex > slides.length) { // долистал до последнего слайда
      slideIndex = 1; // счетчик на первый слайд
      inner.style.transform = `translateX(${-wrapperWidth * (slides.length + 1)}px)`; // показывает клон 1го
      inner.addEventListener('transitionend', () => { // ждет окончания анимации
        inner.style.transition = 'none'; // // убирает эффект перехода, чтобы незаметно перейти на первый слайд
        inner.style.transform = `translateX(${-wrapperWidth * slideIndex}px)`; // переходит на первый слайд
      });
    } else {
      inner.style.transform = `translateX(${-wrapperWidth * slideIndex}px)`; // показывает следующий слайд
      removeTransition();
    }
    current.textContent = getZero(slideIndex);
    dots.forEach((item) => {
      item.classList.remove('offer__slider-dot-active');
    });
    dots[slideIndex - 1].classList.add('offer__slider-dot-active');
    clickDelay(); // добавляет задержку 1с
  }

  function prevSlide() {
    inner.style.transition = `all ${transition}s`; // добавляет анимацию плавного перелистывания
    slideIndex -= 1;
    if (slideIndex < 1) { // долистал до 1 слайда
      slideIndex = slides.length; // счетчик на последний слайд
      inner.style.transform = `translateX(${0}px)`; // показывает клон последнего слайда
      inner.addEventListener('transitionend', () => { // ждет окончания анимации
        inner.style.transition = 'none'; // убирает эффект перехода, чтобы незаметно перейти на последний слайд
        inner.style.transform = `translateX(${-wrapperWidth * slideIndex}px)`; // переходит на последний слайд
      });
    } else {
      inner.style.transform = `translateX(${-wrapperWidth * slideIndex}px)`; // показывает предыдущий слайд
      removeTransition();
    }
    current.textContent = getZero(slideIndex);
    dots.forEach((item) => {
      item.classList.remove('offer__slider-dot-active');
    });
    dots[slideIndex - 1].classList.add('offer__slider-dot-active');
    clickDelay(); // добавляет задержку 1с
  }

  slider.addEventListener('click', (event) => { // клик на кнопки
    if (canSlide === true) { // не запускает обработчик, пока не прошла задержка
      if (event.target && event.target.matches('[data-action="next"]')) { // data-аттрибуты добавить блоку с кнопкой и самой картинке со стрелкой
        nextSlide();
      } else if (event.target && event.target.matches('[data-action="prev"]')) {
        prevSlide();
      } else if (event.target && event.target.matches('.offer__slider-dot')) {
        dots.forEach((item, i) => {
          if (item === event.target) {
            dots.forEach((dot) => {
              dot.classList.remove('offer__slider-dot-active');
            });
            dots[i].classList.add('offer__slider-dot-active');
            slideIndex = i + 1;
            current.textContent = getZero(slideIndex);
            inner.style.transition = `all ${transition}s`;
            inner.style.transform = `translateX(${-wrapperWidth * (slideIndex)}px)`;
            removeTransition();
          }
        });
      }
    }
  });

  // Свайпы для слайдера

  let mouseStart = 0;
  let mouseMove = 0;
  const threshold = wrapperWidth * 0.33; // порог, после которого переключается слайд = треть от ширины одного слайда
  let initialPos;

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

  function dragAction(event) {
    mouseMove = mouseStart - event.clientX; // после события onmousemove смещение курсора от начального положения на 1px влево или вправо
    mouseStart = event.clientX; // сразу возвращает начальное положение к месту, где находится мышь

    const currentTransform = +inner.style.transform.match(/[-0-9.]+/)[0];
    // текущее значение translateX, рег.выражение отбрасывает текст "translateX:" и оставляет только минус, цифры и точки, остается массив с числом, берем 0й элемент

    inner.style.transform = `translateX(${currentTransform - mouseMove}px)`;
  }

  function dragEnd() {
    const finalPos = +inner.style.transform.match(/[-0-9.]+/)[0]; // translateX в конце перетаскивания

    if (-finalPos - -initialPos > threshold) { // если смещение больше порога, переключает слайд
      nextSlide();
    } else if (-finalPos - -initialPos < -threshold) {
      prevSlide();
    } else { // если смещение меньше порога, возвращает к тому положению, где была зажата ЛКМ
      inner.style.transition = `all ${transition}s`; // добавляет анимацию плавного перелистывания
      inner.style.transform = `translateX(${initialPos}px)`;
      removeTransition(inner);
      clickDelay(); // добавляет задержку
    }

    inner.removeEventListener('mousemove', dragAction); // удаляет все обработчики событий
    inner.removeEventListener('mouseup', dragEnd);
    inner.removeEventListener('mouseout', dragEnd);
  }




});