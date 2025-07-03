// alert('hello');
function includeHTML() {
  const elements = document.querySelectorAll('[data-include]');
  
  elements.forEach(async (el) => {
    const file = el.getAttribute('data-include');

    try {
      const res = await fetch(file);
      
      if (!res.ok) {
        el.innerHTML = `Ошибка загрузки файла: ${file}`;
        return;
      }

      const html = await res.text();
      el.innerHTML = html;
    } catch (error) {
      el.innerHTML = `Ошибка подключения: ${file}<br>${error.message}`;
    }
  });
}
document.addEventListener("DOMContentLoaded", includeHTML);