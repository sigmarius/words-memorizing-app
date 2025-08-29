import { API_ENDPOINT, LOCAL_STORAGE_WORDS_KEY, MAX_WORDS_COUNT } from "@/constants";

// Функция для получения и кэширования данных
async function fetchAndCacheData() {
  // Проверяем, есть ли данные в localStorage
  const cached = localStorage.getItem(LOCAL_STORAGE_WORDS_KEY);

  // Если данные есть в кэше, возвращаем их
  if (cached) {
    return JSON.parse(cached);
  } else {
    // Получаем данные из data.json
    const response = await fetch(API_ENDPOINT);
    if (!response.ok) throw new Error('Ошибка загрузки данных');

    const data = await response.json();

    // Кэшируем
    localStorage.setItem(LOCAL_STORAGE_WORDS_KEY, JSON.stringify(data));

    return data;
  }
}

// Функция для выбора случайных 12 записей
function getRandomItems(arr, count = MAX_WORDS_COUNT) {
  const items = [...arr];

  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items.slice(0, count);
}

// Пример использования
export async function useRandomWords() {
  const data = await fetchAndCacheData();

  // data.data - массив слов
  const wordsArray = Array.isArray(data.data) 
    ? data.data 
    : [];

  return getRandomItems(wordsArray);
}