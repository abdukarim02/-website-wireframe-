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
 const bg = document.querySelector('.main__content-bg');
  let direction = 1;
  let pos = 0;

  function animateBg() {
    pos += 0.3 * direction;
    if (pos > 20 || pos < 0) direction *= -1;
    bg.style.transform = `translateY(${pos}px)`;
    requestAnimationFrame(animateBg);
  }

  animateBg();