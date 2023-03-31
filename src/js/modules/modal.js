function modal() {
  const modalTrigger = document.querySelectorAll('[data-modal]');
  const modal = document.querySelector('.modal'); // Изначально стоит класс .hide

  // const modalTimerId = setTimeout(modalShow, 900000); // Автоматически открывает модальное окно по таймеру через 15 минут

  modalTrigger.forEach((item) => { // Показавает окно при клике на кнопки 'Связаться с нами'
    item.addEventListener('click', modalShow);
  });

  // window.addEventListener('scroll', showModalByScroll); // Показывает окно при прокрутке страницы до самого конца

  modal.addEventListener('click', (event) => { // Закрывает окно при клике на область вокруг .modal__dialog или на крестик
    if (event.target === modal || event.target.matches('[data-close]')) {
      modalHide();
    }
  });

  document.addEventListener('keydown', (event) => { // Закрывает окно при нажатии Esc
    if (event.code === 'Escape' && modal.classList.contains('show')) {
      modalHide();
    }
  });

  function modalShow() {
    modal.classList.add('show'); // display: block;
    modal.classList.remove('hide'); // display: none;
    document.body.style.overflow = 'hidden'; // Предотвращает прокрутку страницы, когда открыто модальное окно
    clearInterval(modalTimerId); // Предотвращает открытие окна по таймеру, если уже открывали вручную
  }

  function modalHide() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Возвращает прокрутку страницы, когда закрыто модальное окно
  }

  function showModalByScroll() {
    if (document.documentElement.scrollTop + 1 + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      // Сколько прокручено до видимого экрана + Высота видимого экрана = Высота всего элемента без прокрутки. document.documentElement это <html></html>
      modalShow();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
}

module.exports = modal;