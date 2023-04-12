function slider({
  sliderBlockSelector,
  currentSelector,
  totalSelector,
  innerSelector,
  wrapperSelector,
  slideSelector,
  navigationSelector,
  dotSelector,
  nextArrowSelector,
  prevArrowSelector,
}) {
  const sliderBlock = document.querySelector(sliderBlockSelector); // '.offer__slider'
  const current = document.querySelector(currentSelector); // '#current'
  const total = document.querySelector(totalSelector); // '#total'
  const inner = document.querySelector(innerSelector); // '.offer__slider-inner'
  const wrapper = document.querySelector(wrapperSelector); // '.offer__slider-wrapper'
  const slides = document.querySelectorAll(slideSelector); // клоны сюда не попадут, это статический nodelist // '.offer__slide'
  const nav = document.querySelector(navigationSelector); // блок с точками // '.offer__slider-navigation'

  const transition = 0.75; // время плавного перехода между слайдами в секундах
  const wrapperWidth = parseInt(window.getComputedStyle(wrapper).width, 10); // parseInt отбрасывает 'px'
  const threshold = wrapperWidth * 0.33; // порог, после которого переключается слайд = треть от ширины одного слайда
  let mouseStart = 0; // начальное положение мыши
  let mouseMove = 0; // смещение мыши
  let initialPos; // позиция слайдера перед началом перетаскивания
  let dots; // точки
  let slideIndex = 1; // начальные значения
  let canSlide = true; // начальные значения

  sliderInitialization(); // создание элементов слайдера и задание начального положения
  sliderBtnsClicks(); // клик на кнопки и точки
  sliderDragActions(); // перетаскивание для слайдера

  function getZero(num) { // Если число из одной цифры, добавляет перед ним 0
    if (num >= 0 && num < 10) {
      return `0${num}`;
    }
    return num;
  }

  function sliderInitialization() { // создание элементов слайдера и задание начального положения
    const firstSlideClone = document.createElement('div'); // создает клон первого слайда и помещает его в конец
    firstSlideClone.classList.add(`${slideSelector.slice(1)}`); // slice убирает точку в начале
    firstSlideClone.innerHTML = slides[0].innerHTML;
    inner.append(firstSlideClone);

    const lastSlideClone = document.createElement('div'); // создает клон последнего слайда и помещает его в начало
    lastSlideClone.classList.add(`${slideSelector.slice(1)}`); // slice убирает точку в начале
    lastSlideClone.innerHTML = slides[slides.length - 1].innerHTML;
    inner.prepend(lastSlideClone);

    for (let i = 0; i < slides.length; i += 1) { // создает точки по количеству слайдов
      const dot = document.createElement('div');
      dot.classList.add(`${dotSelector.slice(1)}`); // slice убирает точку в начале
      nav.append(dot);
      dots = document.querySelectorAll(dotSelector); // '.offer__slider-dot'
    }

    inner.style.width = `${wrapperWidth * (slides.length + 2)}px`; // устанавливает ширину ленты со слайдами, +2 это два клона, которых нет в slides
    total.textContent = getZero(slides.length); // показывает общее число слайдов (клоны слайдов не считаются)
    currentAndDots(); // показывает номер слайда и делает активной точку
    showSlide(); // показывает слайд по индексу
  }

  function clickDelay() { // следующий клик можно сделать только через указанное время
    canSlide = false;
    setTimeout(() => {
      canSlide = true;
    }, transition * 1000); // сек переводятся в мс
  }

  function currentAndDots() { // показывает номер слайда и делает активной точку
    current.textContent = getZero(slideIndex); // getZero добавляет ноль, если число из 1 цифры
    dots.forEach((dot) => dot.classList.remove(`${dotSelector.slice(1)}_active`)); // удаляет класс активности со всех точек
    dots[slideIndex - 1].classList.add(`${dotSelector.slice(1)}_active`); // показывает точку по индексу
  }

  function showSlide() { // показывает слайд по индексу
    inner.style.transform = `translateX(${-wrapperWidth * slideIndex}px)`; // показывает слайд
  }

  function addAnimation() {
    inner.style.transition = `all ${transition}s`; // добавляет анимацию плавного перелистывания
  }

  function removeAnimation() {
    inner.addEventListener('transitionend', () => inner.style.transition = 'none'); // ждет окончания анимации и убирает анимацию;
  }

  function nextSlide() {
    addAnimation(); // добавляет анимацию плавного перелистывания
    slideIndex += 1;
    if (slideIndex > slides.length) { // долистал до последнего слайда
      slideIndex = 1; // счетчик на первый слайд
      inner.style.transform = `translateX(${-wrapperWidth * (slides.length + 1)}px)`; // показывает клон 1го
      inner.addEventListener('transitionend', () => { // ждет окончания анимации
        inner.style.transition = 'none'; // убирает анимацию, чтобы незаметно перейти на первый слайд
        inner.style.transform = `translateX(${-wrapperWidth * slideIndex}px)`; // переходит на первый слайд
      });
    } else {
      showSlide(); // показывает слайд по индексу
      removeAnimation(); // ждет окончания анимации и убирает анимацию;
    }
    currentAndDots(); // показывает номер слайда и делает активной точку
    clickDelay(); // добавляет задержку 1с
  }

  function prevSlide() {
    addAnimation(); // добавляет анимацию плавного перелистывания
    slideIndex -= 1;
    if (slideIndex < 1) { // долистал до 1 слайда
      slideIndex = slides.length; // счетчик на последний слайд
      inner.style.transform = `translateX(${0}px)`; // показывает клон последнего слайда
      inner.addEventListener('transitionend', () => { // ждет окончания анимации
        inner.style.transition = 'none'; // убирает анимацию, чтобы незаметно перейти на последний слайд
        inner.style.transform = `translateX(${-wrapperWidth * slideIndex}px)`; // переходит на последний слайд
      });
    } else {
      showSlide(); // показывает слайд по индексу
      removeAnimation(); // ждет окончания анимации и убирает анимацию;
    }
    currentAndDots(); // показывает номер слайда и делает активной точку
    clickDelay(); // добавляет задержку 1с
  }

  function sliderBtnsClicks() { // клик на кнопки и точки
    sliderBlock.addEventListener('click', (event) => {
      event.preventDefault();
      if (canSlide === true) { // не запускает обработчик, пока не прошла задержка
        if (event.target && event.target.closest(nextArrowSelector) && sliderBlock.contains(event.target.closest(nextArrowSelector))) {
          // closest возвращает ближайший родительский элемент (или сам элемент), который соответствует. contains проверяет, что соотв. элемент находится внутри слайдера
          nextSlide();
        } else if (event.target && event.target.closest(prevArrowSelector) && sliderBlock.contains(event.target.closest(prevArrowSelector))) {
          prevSlide();
        } else if (event.target && event.target.closest(dotSelector) && sliderBlock.contains(event.target.closest(dotSelector))) { // клик на точки
          addAnimation(); // добавляет анимацию плавного перелистывания
          dots.forEach((item, i) => {
            if (item === event.target) { // находит точку, на которую нажали
              slideIndex = i + 1;
              currentAndDots(); // показывает номер слайда и делает активной точку
              showSlide(); // показывает слайд по индексу
              removeAnimation(); // ждет окончания анимации и убирает анимацию;
            }
          });
        }
      }
    });
  }

  function sliderDragActions() { // перетаскивание для слайдера
    inner.addEventListener('mousedown', (event) => { // нажатие мыши
      // проверить, что у элемента нет css свойства transition, c ним всё глючит. в моем слайдере оно добавляется когда надо и сразу удаляется
      event.preventDefault(); // удаляет встроенное в браузер перетаскивание картинки
      if (canSlide === true) { // не запускает обработчик, пока не прошла задержка
        mouseStart = event.clientX; // положение мыши при нажатии
        initialPos = +inner.style.transform.match(/[-0-9.]+/)[0]; // translateX перед началом перетаскивания

        inner.addEventListener('mousemove', dragAction); // движение мыши
        inner.addEventListener('mouseup', dragEnd); // отпускание мыши
        inner.addEventListener('mouseout', dragEnd); // отменяет перетаскивание, если курсор вышел за пределы слайда
      }
    });
  }

  function dragAction(event) {
    mouseMove = mouseStart - event.clientX; // после события onmousemove смещение курсора от начального положения на 1px влево или вправо
    mouseStart = event.clientX; // сразу возвращает начальное положение к месту, где находится мышь

    const currentTransform = +inner.style.transform.match(/[-0-9.]+/)[0];
    // текущее значение translateX, рег.выражение отбрасывает текст "translateX:" и оставляет только минус, цифры и точки,
    // + значит каждый символ из скобок может повторяться 1 или более раз. остается массив с числом, берем 0й элемент

    inner.style.transform = `translateX(${currentTransform - mouseMove}px)`;
  }

  function dragEnd() {
    const finalPos = +inner.style.transform.match(/[-0-9.]+/)[0]; // translateX в конце перетаскивания

    if (-finalPos - -initialPos === 0) { // если не сдвигали слайдер, просто кликнули
      inner.style.transition = 'none';
    } else if (-finalPos - -initialPos > threshold) { // если смещение больше порога и положительное, переключает на следующий слайд
      nextSlide();
    } else if (-finalPos - -initialPos < -threshold) { // если смещение больше порога и отрицательное, переключает на предыдущий слайд
      prevSlide();
    } else { // если смещение меньше порога, возвращает к тому положению, где была зажата ЛКМ
      inner.style.transition = `all ${transition}s`; // добавляет анимацию плавного перелистывания
      inner.style.transform = `translateX(${initialPos}px)`;
      inner.addEventListener('transitionend', () => inner.style.transition = 'none'); // ждет окончания анимации и убирает анимацию;
      clickDelay(); // добавляет задержку
    }

    inner.removeEventListener('mousemove', dragAction); // удаляет все обработчики событий
    inner.removeEventListener('mouseup', dragEnd);
    inner.removeEventListener('mouseout', dragEnd);
  }
}

export default slider;

