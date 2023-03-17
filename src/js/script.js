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
    const target = event.target;

    if (target && target.matches('.tabheader__item')) { // Проверяет клик на вкладку
      tabHeaderItems.forEach((item, i) => { // Определяет номер вкладки
        if (item === target) {
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
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  // const deadline = new Date(Date.parse(new Date()) + 5 * 24 * 60 * 60 * 1000); // Добавляет всегда 5 дней к текущей дате
  const deadline = new Date(Date.parse(new Date()) + randomInteger((1 * 24 * 60 * 60 * 1000), (3 * 24 * 60 * 60 * 1000))); // Добавляет случайное количество дней от 1 до 3 к текущей дате

  setClock('.timer', deadline);

  // Модальное окно
  const modalTrigger = document.querySelectorAll('[data-modal]');
  const modal = document.querySelector('.modal'); // Изначально стоит класс .hide

  function modalShow() {
    modal.classList.add('show'); // display: block;
    modal.classList.remove('hide'); // display: none;
    document.body.style.overflow = 'hidden'; // Предотвращает прокрутку страницы, когда открыто модальное окно
    // clearInterval(modalTimerId); // Предотвращает открытие окна по таймеру, если уже открывали вручную
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

  // const modalTimerId = setTimeout(modalShow, 30000); // Автоматически открывает модальное окно по таймеру

  function showModalByScroll() {
    if (document.documentElement.scrollTop + 1 + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { // document.documentElement это <html></html>
      // Сколько прокручено до видимого экрана + Высота видимого экрана = Высота всего элемента без прокрутки
      modalShow();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  // window.addEventListener('scroll', showModalByScroll); // Показывает окно при прокрутке страницы до самого конца


  // Используем классы для карточек меню
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes; // Здесь массив
      this.parent = document.querySelector(parentSelector); // Находит элемент, переданный в аргементе parentSelector
      // this.transfer = 60; // Курс доллара
      // this.changeToRUB(); // Прямо здесь вызывает метод changeToRUB и переводит доллары в рубли
    }

    // changeToRUB() { // Перевод валюты из долларов в рубли
    //   this.price *= this.transfer;
    // }

    render() { // Создает элемент на странице
      const element = document.createElement('div'); // тег div

      if (this.classes.length === 0) { // Если в параметрах не переданы классы, то задает по умолчанию .menu__item
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => { // Добавляет в div классы из массива
          element.classList.add(className);
        });
      }

      this.parent.append(element); // Вставить внутри parentSelector после остальных блоков

      element.innerHTML = `
      <img src=${this.src} alt=${this.alt}>
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">${this.descr}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
      `; // Можно не ставить кавычки для src и alt, html сам их подставит, но не должно быть пробелов
    }
  }

  new MenuCard( // Создает объект из данных и сразу на него вызывает метод render
    'img/tabs/vegy.jpg',
    'vegy',
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    229,
    '.menu .container',
    'menu__item',
  ).render();

  new MenuCard(
    'img/tabs/elite.jpg',
    'elite',
    'Меню "Премиум"',
    'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    550,
    '.menu .container',
    'menu__item',
  ).render();

  new MenuCard(
    'img/tabs/post.jpg',
    'post',
    'Меню "Постное"',
    'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    430,
    '.menu .container',
    'menu__item',
  ).render();


  // Forms

  const forms = document.querySelectorAll('form');

  forms.forEach((item) => { // На каждую форму вешает обработчик формы
    postData(item);
  });

  function postData(form) {
    form.addEventListener('submit', (event) => { // Событие отправка формы кликом на кнопку или enter
      event.preventDefault();

      const statusMessage = document.createElement('img'); // К форме добавляется блок с сообщениями о статусе отправки
      statusMessage.setAttribute('src', 'img/form/spinner.svg');
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement('afterend', statusMessage); // При загрузке показывает спиннер после формы

      const request = new XMLHttpRequest(); // Создает запрос для отправки данных на сервер
      request.open('POST', 'server.php'); // Метод запроса и url сервера

      request.setRequestHeader('Content-type', 'application/json'); // Заголовок, первый аттрибут это имя, второй значение
      // ДЛЯ XMLHttpRequest + FormData ЗАГОЛОВОК СТАВИТЬ НЕ НУЖНО!

      const formData = new FormData(form); // Данные из формы, во всех input обязательно должны быть аттрибуты name=""

      const object = {};
      formData.forEach(function(value, key) { // Преобразовывает formdata в обычный объект
        object[key] = value;
      });

      const json = JSON.stringify(object); // Преобразовывает объект в JSON

      request.send(json); // Отправляет запрос, в скобках тело запроса

      request.addEventListener('load', () => { // load значит, что запрос полностью загрузился на сервер
        if (request.status === 200) { // Код ответа от сервера, HTTP 200 значит успешно
          console.log(request.response); // Ответ от сервера
          showThanksModal('Спасибо! Скоро мы с вами свяжемся');
          form.reset();
          statusMessage.remove(); // Удаляет спиннер загрузки
        } else {
          showThanksModal('Что-то пошло не так...');
        }
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
});
