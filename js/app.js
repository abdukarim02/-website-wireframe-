// Функция для подключения внешних HTML-файлов (header.html, footer.html и т.п.)
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


// ======= Анимация движения заднего фона =======

// Находим элемент заднего фона по классу
const bg = document.querySelector('.main__content-bg');

// Переменные для анимации: направление и текущая позиция
let direction = 1;
let pos = 0;

// Функция для анимации фона
function animateBg() {
  // Увеличиваем или уменьшаем позицию в зависимости от направления
  pos += 0.3 * direction;

  // Меняем направление, если достигнут предел движения
  if (pos > 20 || pos < 0) direction *= -1;

  // Применяем CSS-трансформацию к фону (движение по Y)
  bg.style.transform = `translateY(${pos}px)`;

  // Повторяем анимацию на каждом кадре
  requestAnimationFrame(animateBg);
}

// Запускаем анимацию при загрузке
animateBg();

// Инициализация Swiper-слайдера
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 35,           // Расстояние между слайдами
  slidesPerView: "auto",      // Показывать столько слайдов, сколько помещается
  loop: true,                 // Зацикливание: после последнего слайда переходит к первому
  speed: 3000,                // Время одного полного перехода между слайдами (мс)
  
  autoplay: {
    delay: 1,                 // Минимальная задержка — почти мгновенно начинает следующий слайд
    disableOnInteraction: false, // Не отключать autoplay при взаимодействии
  },

  allowTouchMove: false       // Запрет ручной прокрутки (чтобы анимация не прерывалась)
});