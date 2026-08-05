// Theme Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    // Load saved theme or check system preference
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
        if (themeIcon) themeIcon.textContent = 'light_mode';
    } else {
        htmlElement.classList.remove('dark');
        if (themeIcon) themeIcon.textContent = 'dark_mode';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (htmlElement.classList.contains('dark')) {
                htmlElement.classList.remove('dark');
                if (themeIcon) themeIcon.textContent = 'dark_mode';
                localStorage.setItem('theme', 'light');
            } else {
                htmlElement.classList.add('dark');
                if (themeIcon) themeIcon.textContent = 'light_mode';
                localStorage.setItem('theme', 'dark');
            }
        });
    }
});
