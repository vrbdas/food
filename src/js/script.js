'use strict';

window.addEventListener('DOMContentLoaded', () => {

  const tabs = require('./modules/tabs'); // Вкладки
  const timer = require('./modules/timer'); // Таймер
  const modal = require('./modules/modal'); // Модальное окно
  const cards = require('./modules/cards'); // Создание карточек меню
  const forms = require('./modules/forms'); // Формы
  const slider = require('./modules/slider'); // Самодельный слайдер
  const calc = require('./modules/calc'); // Калькулятор

  tabs();
  timer();
  modal();
  cards();
  forms();
  slider();
  calc();

});