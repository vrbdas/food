'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const tabContentBlocks = document.querySelectorAll('.tabcontent'); // Блоки с картинкой

  const tabHeaderContainer = document.querySelector('.tabheader__items'); // Контейнер с табами
  const tabHeaderItems = document.querySelectorAll('.tabheader__item'); // Табы

  function hideTabContent() { // Удаляет все блоки с картинкой
    tabContentBlocks.forEach((item) => {
      item.classList.add('hide'); // display: none;
      item.classList.remove('show', 'fade');
    });
    tabHeaderItems.forEach((item) => {
      item.classList.remove('tabheader__item_active'); // Делает все табы неактивными
    });
  }

  function showTabContent(i = 0) { // Показывает выбранный блок с картинкой
    tabContentBlocks[i].classList.add('show', 'fade'); // display: block;
    tabContentBlocks[i].classList.remove('hide');
    tabHeaderItems[i].classList.add('tabheader__item_active'); // Активирует выбранный таб
  }

  hideTabContent();
  showTabContent();

  tabHeaderContainer.addEventListener('click', (event) => { // Обработчик клика на контейнер с табами
    const target = event.target;

    if (target && target.matches('.tabheader__item')) { // Проверка клика на таб
      tabHeaderItems.forEach((item, i) => { // Определить номер таба
        if (item === target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  // Timer

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

    updateClock(); // Запустить функцию сразу, чтобы не ждать 1с до первого обновления

    function updateClock() { // Обновление таймера
      const t = getTimeRemaining(endtime); // Создает объект с оставшимся временем

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval); // Остановить обновление таймера, когда там будет 0
      }
    }
  }

  const deadline = new Date(Date.parse(new Date()) + 5 * 24 * 60 * 60 * 1000); // Добавляет всегда 5 дней к текущей дате
  setClock('.timer', deadline);
});
