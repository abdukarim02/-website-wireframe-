function includeHTML() {
    return new Promise((resolve) => {
        const elements = document.querySelectorAll('[data-include]');
        let loadedCount = 0;

        elements.forEach(async (el) => {
            const file = el.getAttribute('data-include');
            try {
                const res = await fetch(file);
                if (!res.ok) {
                    el.innerHTML = `Ошибка загрузки файла: ${file}`;
                } else {
                    el.innerHTML = await res.text();
                }
            } catch (error) {
                el.innerHTML = `Ошибка подключения: ${file}<br>${error.message}`;
            }
            loadedCount++;
            if (loadedCount === elements.length) resolve();
        });

        if (elements.length === 0) resolve();
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await includeHTML(); // ждём загрузки header и других файлов

    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.header__content-menu');

    if (burger && menu) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            menu.classList.toggle('active');
        });
    }
});
