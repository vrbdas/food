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

export default tabs;