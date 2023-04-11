function timer() {
  let deadline; // дата окончания акции

  promotionTime(); // устанавливает время окончания акции
  setClock('.timer', deadline); // устанавливает таймер

  function promotionTime() { // устанавливает время окончания акции
    if (localStorage.getItem('deadline') && Date.parse(localStorage.getItem('deadline')) > Date.parse(new Date())) {
      // если в локальном хранилище есть дата окончания акции, и она позже сегодняшней
      deadline = localStorage.getItem('deadline'); // использует эту дату
    } else { // если в локальном хранилище нет даты окончания акции или она просрочена
      const deadlineCalc = new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)); // текущая дата в текущем часовом поясе + 1д
      deadline = new Date(deadlineCalc.getFullYear(), deadlineCalc.getMonth(), deadlineCalc.getDate(), 0, 0, 0); // обнуляет часы минуты и сек в deadlineCalc
      localStorage.setItem('deadline', deadline); // записывает получившуюся дату в локальное хранилище
    }

    const promotionEndText = new Date(deadline).toLocaleString('ru', {
      day: '2-digit',
      month: 'long',
    }); // выводит дату в виде 2 цифр и месяц в виде слова, склоняя на русском языке

    document.querySelector('#promotion-end').textContent = `Акция закончится ${promotionEndText} в 00:00`; // добавляет текст на страницу
  }

  function getTimeRemaining(endtime) { // Вычисляет оставшееся время от текущей даты до endtime
    const t = Date.parse(endtime) - Date.parse(new Date()); // Вычитает текущую дату из конечной в мс
    const days = Math.floor(t / (1000 * 60 * 60 * 24)); // мс в дни
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24); // мс в часы как остаток от деления на 24
    const minutes = Math.floor((t / (1000 * 60)) % 60); // мс в минуты как остаток от деления на 60
    const seconds = Math.floor((t / 1000) % 60); // мс в секунды как остаток от деления на 60

    return { // Возвращает оставшееся время как объект
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) { // Если число из одной цифры, добавляет перед ним 0
    if (num >= 0 && num < 10) {
      return `0${num}`;
    }
    return num;
  }

  function setClock(timerBlock, endtime) { // устанавливает таймер
    const timer = document.querySelector(timerBlock); // Контейнер с блоками таймера
    const days = timer.querySelector('#days'); // Блок с днями
    const hours = timer.querySelector('#hours'); // Блок с часами
    const minutes = timer.querySelector('#minutes'); // Блок с минутами
    const seconds = timer.querySelector('#seconds'); // Блок с секундами

    const timeInterval = setInterval(updateClock, 1000); // Обновление таймера будет запускаться каждую секунду

    updateClock(); // Запускает функцию сразу, чтобы не ждать 1с до первого обновления

    function updateClock() { // Обновление таймера
      const t = getTimeRemaining(endtime); // Создает объект с оставшимся временем

      days.textContent = getZero(t.days);
      hours.textContent = getZero(t.hours);
      minutes.textContent = getZero(t.minutes);
      seconds.textContent = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval); // Останавливает обновление таймера, когда там будет 0
      }
    }
  }
}

export default timer;