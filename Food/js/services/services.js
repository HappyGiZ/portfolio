// функция настраивает запрос и трансформирует в JSON
const postData = async (url, data) => {
  // создается запрос
  const res = await fetch(url, {
    method: 'POST',
    body: data,
    headers: { 'Content-type': 'application/json' }
  });

  return await res.json();
};

// GET запрос для создания карточек
const getResource = async (url) => {
  const res = await fetch(url);

  // проброс ошибки
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
};

export { postData };
export { getResource };