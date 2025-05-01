document.addEventListener('DOMContentLoaded', function() {
    
    function checkTimeForDarkMode() {
        const now = new Date();
        const hours = now.getHours();
        
        return hours >= 19 || hours < 6;
    }

    function showAutoDarkModeNotification() {
        const notification = document.createElement('div');
        notification.className = 'theme-notification';
        notification.textContent = 'Automatically set to dark mode. Change here if needed.';
        document.body.appendChild(notification);

        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    }

    function applyAutoDarkMode() {
        const shouldBeDark = checkTimeForDarkMode();
        const root = document.documentElement;
        const currentTheme = localStorage.getItem('theme');

        
        if (!currentTheme) {
            if (shouldBeDark) {
                root.setAttribute('data-theme', 'dark');
                body.classList.add('dark-theme');
                updateIconVisibility('dark');
                showAutoDarkModeNotification();
            } else {
                root.removeAttribute('data-theme');
                body.classList.remove('dark-theme');
                updateIconVisibility('light');
            }
        }
    }
   
    const toggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const body = document.body;


    let currentTheme = localStorage.getItem('theme');
    if (!currentTheme) {
        currentTheme = checkTimeForDarkMode() ? 'dark' :
                            (prefersDarkScheme.matches ? 'dark' : 'light');
    }

    
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        body.classList.add('dark-theme');
    }

    
    const lightIcon = document.querySelector('.light-icon');
    const darkIcon = document.querySelector('.dark-icon');

    function updateIconVisibility(theme) {
        if (theme === 'dark') {
            if (lightIcon) lightIcon.style.display = 'none';
            if (darkIcon) darkIcon.style.display = 'block';
        } else {
            if (lightIcon) lightIcon.style.display = 'block';
            if (darkIcon) darkIcon.style.display = 'none';
        }
    }

   
    updateIconVisibility(currentTheme);

    toggle.addEventListener('click', () => {
        const root = document.documentElement;
        let theme;

        if (root.getAttribute('data-theme') === 'dark') {
            root.removeAttribute('data-theme');
            body.classList.remove('dark-theme');
            theme = 'light';
        } else {
            root.setAttribute('data-theme', 'dark');
            body.classList.add('dark-theme');
            theme = 'dark';
        }

        
        localStorage.setItem('theme', theme);
        updateIconVisibility(theme);
    });

    
    applyAutoDarkMode();
    setInterval(applyAutoDarkMode, 60000); 

    
    const themeToggle = document.getElementById('theme-toggle');

    function setTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
        }
        localStorage.setItem('theme', theme);
    }

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDark) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
            localStorage.setItem('theme', currentTheme);
        });
    }
});