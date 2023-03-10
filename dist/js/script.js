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
});
