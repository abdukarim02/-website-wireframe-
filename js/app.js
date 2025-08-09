//   ====Функция для подключения внешних HTML-файлов ===
//         (header.html, footer.html и т.п.)
function includeHTML() {
  // Находим все элементы с атрибутом data-include
  const elements = document.querySelectorAll('[data-include]');
  
  elements.forEach(async (el) => {
    // Получаем путь к файлу из атрибута
    const file = el.getAttribute('data-include');

    try {
      // Загружаем файл с помощью fetch
      const res = await fetch(file);
      
      // Если ответ не OK — показываем ошибку
      if (!res.ok) {
        el.innerHTML = `Ошибка загрузки файла: ${file}`;
        return;
      }

      // Вставляем содержимое файла в HTML-элемент
      const html = await res.text();
      el.innerHTML = html;

    } catch (error) {
      // Если произошла ошибка при загрузке — показываем сообщение
      el.innerHTML = `Ошибка подключения: ${file}<br>${error.message}`;
    }
  });
}

// Запускаем функцию includeHTML после полной загрузки документа
document.addEventListener("DOMContentLoaded", includeHTML);