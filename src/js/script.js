import tabs from './modules/tabs'; // Вкладки
import timer from './modules/timer'; // Таймер
import modal from './modules/modal'; // Модальное окно
import cards from './modules/cards'; // Создание карточек меню
import forms from './modules/forms'; // Формы
import slider from './modules/slider'; // Самодельный слайдер
import calc from './modules/calc'; // Калькулятор

import {modalShow} from './modules/modal'; // Открывает модальное окно

window.addEventListener('DOMContentLoaded', () => {
  // const modalTimerId = setTimeout(() => modalShow(modalTimerId), 300000);
  // Автоматически открывает модальное окно по таймеру через 5 минут, передать его аргументом в modal()

  tabs();
  timer();
  modal(); // сюда аргументом передать modalTimerId, чтобы таймер удалялся при открытии модального окна
  cards();
  forms();
  slider();
  calc();

});