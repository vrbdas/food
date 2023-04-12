import {modalShow, modalHide} from './modal';
import {postData} from '../services/services';

function forms() {
  const formTags = document.querySelectorAll('form');
  const modalBlock = document.querySelector('.modal'); // изначально в html стоит класс .hide

  formTags.forEach((item) => { // На каждую форму вешает обработчик формы
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener('submit', (event) => { // Событие отправка формы кликом на кнопку или enter
      event.preventDefault();

      const spinner = document.createElement('img'); // К форме добавляется спиннер загрузки
      spinner.setAttribute('src', 'img/form/spinner.svg');
      spinner.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement('afterend', spinner); // При загрузке показывает спиннер после формы

      const formData = new FormData(form); // Данные из формы, во всех input обязательно должны быть аттрибуты name=""

      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      // Данные из формы превращает в массив массивов, его в обычный объект, а его в JSON

      postData('http://localhost:3000/requests', json) // Настраивает и посылает запрос на сервер
        .then((data) => { // Обработка успешного promise
          console.log(data); // Ответ от сервера
          showThanksModal('Спасибо! Скоро мы с вами свяжемся');
          spinner.remove(); // Удаляет спиннер загрузки
        })
        .catch(() => { // Обработка reject (ошибки)
          showThanksModal('Что-то пошло не так...');
        })
        .finally(() => { // Выполнится в любом случае
          form.reset(); // Очистка формы
        });
    });
  }

  function showThanksModal(text) { // Меняет модальное окно на сообщение об отправке
    const formModalDialog = document.querySelector('.modal__dialog');

    formModalDialog.classList.add('hide'); // Скрывает внутреннюю часть старого окна
    modalShow('.modal'); // Показывает модальное окно с пустой внутренней частью

    const thanksModalDialog = document.createElement('div'); // Создает внутреннюю часть с текстом text
    thanksModalDialog.classList.add('modal__dialog');
    thanksModalDialog.innerHTML = `
    <div class="modal__content">
      <div data-close class="modal__close">&times;</div>
      <div class="modal__title">${text}</div>
    </div>
    `;
    modalBlock.append(thanksModalDialog); // Вставляет новую внутреннюю часть в модальное окно
    setTimeout(() => { // Через 4с скрывает окно и возвращает внутреннюю часть с формой
      thanksModalDialog.remove();
      formModalDialog.classList.remove('hide');
      formModalDialog.classList.add('show');
      modalHide('.modal');
    }, 4000);
  }
}

export default forms;