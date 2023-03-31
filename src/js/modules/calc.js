function calc() {
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
}

module.exports = calc;