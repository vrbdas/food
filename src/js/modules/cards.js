import {getResource} from '../services/services';

function cards() {

  // getResource('http://localhost:3000/menu') // данные от JSON-сервера
  //   .then((data) => createCard(data));

  const menu = [ // вставил этот масссив вместо ответа от JSON-сервера
    {
      img: 'img/tabs/vegy.jpg',
      altimg: 'vegy',
      title: 'Меню \'Фитнес\'',
      descr: 'Меню \'Фитнес\' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      price: 540,
    },
    {
      img: 'img/tabs/post.jpg',
      altimg: 'post',
      title: 'Меню \'Постное\'',
      descr: 'Меню \'Постное\' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
      price: 840,
    },
    {
      img: 'img/tabs/elite.jpg',
      altimg: 'elite',
      title: 'Меню \'Премиум\'',
      descr: 'В меню \'Премиум\' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
      price: 1260,
    },
  ];

  createCard(menu); // удалить, если используется JSON-сервер

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

export default cards;