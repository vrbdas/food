'use strict';

window.addEventListener('DOMContentLoaded', () => {

  // Вкладки

  const tabContentBlocks = document.querySelectorAll('.tabcontent'); // Блоки с картинкой
  const tabHeaderContainer = document.querySelector('.tabheader__items'); // Контейнер с вкладками
  const tabHeaderItems = document.querySelectorAll('.tabheader__item'); // Вкладки

  hideTabContent(); // Скрывает все вкладки
  showTabContent(); // Показывает первую вкладку по умолчанию (i = 0 в функции showTabContent)

  tabHeaderContainer.addEventListener('click', (event) => { // Обрабатывает клик на контейнер с вкладками
    if (event.target && event.target.matches('.tabheader__item')) { // Проверяет клик на вкладку
      tabHeaderItems.forEach((item, i) => { // Определяет номер вкладки
        if (item === event.target) {
          hideTabContent();
          showTabContent(i); // Показывает нужную вкладку
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
      item.classList.remove('tabheader__item_active'); // Делает все вкладки неактивными
    });
  }

  function showTabContent(i = 0) { // Показывает выбранный блок с картинкой
    tabContentBlocks[i].classList.add('show', 'fade'); // display: block;
    tabContentBlocks[i].classList.remove('hide');
    tabHeaderItems[i].classList.add('tabheader__item_active'); // Активирует выбранную вкладку
  }

  // Таймер

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

  // Модальное окно

  const modalTrigger = document.querySelectorAll('[data-modal]');
  const modal = document.querySelector('.modal'); // Изначально стоит класс .hide

  // const modalTimerId = setTimeout(modalShow, 900000); // Автоматически открывает модальное окно по таймеру через 15 минут

  modalTrigger.forEach((item) => { // Показавает окно при клике на кнопки 'Связаться с нами'
    item.addEventListener('click', modalShow);
  });

  // window.addEventListener('scroll', showModalByScroll); // Показывает окно при прокрутке страницы до самого конца

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

  function showModalByScroll() {
    if (document.documentElement.scrollTop + 1 + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      // Сколько прокручено до видимого экрана + Высота видимого экрана = Высота всего элемента без прокрутки. document.documentElement это <html></html>
      modalShow();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

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
  const postData = async(url, data) => { // Настраивает и посылает запрос на сервер
    const result = await fetch(url, { // await дождется результата функции fetch
      method: 'POST', // POST это отправка, GET получение
      headers: {'Content-type': 'application/json'}, // Заголовки нужны для JSON, если на сервер отправлять formData, то не нужны
      body: data, // Тело запроса, если запрос GET, то не нужно
    });

    return await result.json(); // Ответ от сервера в виде PROMISE в формате JSON
  };

  forms.forEach((item) => { // На каждую форму вешает обработчик формы
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

      postData('http://localhost:3000/requests', json)
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
  const nav = document.querySelector('.offer__slider-navigation'); // блок с точками
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

  function sliderInitialization() { // создание элементов слайдера и задание начального положения
    const firstSlideClone = document.createElement('div'); // создает клон первого слайда и помещает его в конец
    firstSlideClone.classList.add('offer__slide');
    firstSlideClone.innerHTML = slides[0].innerHTML;
    inner.append(firstSlideClone);

    const lastSlideClone = document.createElement('div'); // создает клон последнего слайда и помещает его в начало
    lastSlideClone.classList.add('offer__slide');
    lastSlideClone.innerHTML = slides[slides.length - 1].innerHTML;
    inner.prepend(lastSlideClone);

    for (let i = 0; i < slides.length; i += 1) { // создает точки по количеству слайдов
      const dot = document.createElement('div');
      dot.classList.add('offer__slider-dot');
      nav.append(dot);
      dots = document.querySelectorAll('.offer__slider-dot');
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
    dots.forEach((dot) => dot.classList.remove('offer__slider-dot-active')); // удаляет класс активности со всех точек
    dots[slideIndex - 1].classList.add('offer__slider-dot-active'); // показывает точку по индексу
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
    slider.addEventListener('click', (event) => {
      if (canSlide === true) { // не запускает обработчик, пока не прошла задержка
        if (event.target && event.target.matches('[data-action="next"]')) { // data-аттрибуты добавить блоку с кнопкой и самой картинке со стрелкой
          nextSlide();
        } else if (event.target && event.target.matches('[data-action="prev"]')) {
          prevSlide();
        } else if (event.target && event.target.matches('.offer__slider-dot')) { // клик на точки
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

  // Калькулятор

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



});