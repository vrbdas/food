function cards() {
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
}

module.exports = cards;