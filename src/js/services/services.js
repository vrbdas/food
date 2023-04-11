const postData = async(url, data) => { // Настраивает и посылает запрос на сервер
  const result = await fetch(url, { // await дождется результата функции fetch
    method: 'POST', // POST это отправка, GET получение
    headers: {'Content-type': 'application/json'}, // Заголовки нужны для JSON, если на сервер отправлять formData, то не нужны
    body: data, // Тело запроса, если запрос GET, то не нужно
  });

  return await result.json(); // Ответ от сервера в виде PROMISE в формате JSON
};

const getResource = async(url) => { // Настраивает и посылает запрос на сервер
  const result = await fetch(url); // Fetch возвращает promise

  if (!result.ok) { // Если не удалось выполнить запрос
    throw new Error(`Could not fetch ${url}, status: ${result.status}`); // Создает объект ошибки и выбрасывает его как исключение
  }

  return await result.json(); // Возвращает promise в формате JSON
};

export {postData};
export {getResource};