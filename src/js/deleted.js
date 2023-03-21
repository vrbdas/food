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
    this.transfer = 60; // Курс доллара
    this.changeToRUB(); // Прямо здесь вызывает метод changeToRUB и переводит доллары в рубли
  }

  changeToRUB() { // Перевод валюты из долларов в рубли
    this.price *= this.transfer;
  }

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

const getResource = async(url) => { // Настраивает и посылает запрос на сервер
  const result = await fetch(url);

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`); // Создает объект ошибки и выбрасывает его как исключение
  }

  return await result.json(); // Ответ от сервера в виде PROMISE в формате JSON
};

getResource('http://localhost:3000/menu')
  .then((data) => {
    data.forEach(({img, altimg, title, descr, price}) => { // Для каждого объекта из массива menu разбивает его на значения и они присваиваются переменным с таким же именем
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); // Создает объект из данных и сразу на него вызывает метод render
    });
  });
