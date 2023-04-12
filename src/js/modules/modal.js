function modalShow(modalBlockSelector, modalTimerId) {
  const modalBlock = document.querySelector(modalBlockSelector); // Изначально в html стоит класс hide
  modalBlock.classList.add('show'); // display: block;
  modalBlock.classList.remove('hide'); // display: none;
  document.body.style.overflow = 'hidden'; // Предотвращает прокрутку страницы, когда открыто модальное окно

  if (modalTimerId) { // Если задан таймер на автоматическое открытие окна
    clearInterval(modalTimerId); // Удаляет таймер автоматического открытия окна, если оно уже открывалось
  }
}

function modalHide(modalBlockSelector) {
  const modalBlock = document.querySelector(modalBlockSelector); // Изначально в html стоит класс hide
  modalBlock.classList.add('hide');
  modalBlock.classList.remove('show');
  document.body.style.overflow = ''; // Возвращает прокрутку страницы, когда закрыто модальное окно
}

function modal(modalBlockSelector, modalTriggerSelector, modalTimerId) {
  const modalBlock = document.querySelector(modalBlockSelector); // Изначально в html стоит класс hide
  const modalTrigger = document.querySelectorAll(modalTriggerSelector); // Кнопка для вызова модального окна

  modalTrigger.forEach((item) => { // Показавает окно при клике на кнопки 'Связаться с нами'
    item.addEventListener('click', () => modalShow(modalBlockSelector, modalTimerId));
  });

  // window.addEventListener('scroll', showModalByScroll); // Показывает окно при прокрутке страницы до самого конца

  modalBlock.addEventListener('click', (event) => { // Закрывает окно при клике на область вокруг .modal__dialog или на крестик
    if (event.target === modalBlock || event.target.matches('[data-close]')) {
      modalHide(modalBlockSelector);
    }
  });

  document.addEventListener('keydown', (event) => { // Закрывает окно при нажатии Esc
    if (event.code === 'Escape' && modalBlock.classList.contains('show')) {
      modalHide(modalBlockSelector);
    }
  });

  function showModalByScroll() {
    if (document.documentElement.scrollTop + 1 + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      // Сколько прокручено до видимого экрана + Высота видимого экрана = Высота всего элемента без прокрутки. document.documentElement это <html></html>
      modalShow(modalBlockSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
}

export default modal;
export {modalShow, modalHide};