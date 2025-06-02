document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeToggleIcon = document.getElementById('themeToggleIcon');
    const body = document.body;
    const lightThemeIconClass = 'bi-sun-fill';
    const darkThemeIconClass = 'bi-moon-fill';
    const preferredThemeKey = 'preferredTheme';

    // Function to apply the theme and update the icon
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            if (themeToggleIcon) {
                themeToggleIcon.classList.remove(lightThemeIconClass);
                themeToggleIcon.classList.add(darkThemeIconClass);
            }
        } else {
            body.classList.remove('dark-theme');
            if (themeToggleIcon) {
                themeToggleIcon.classList.remove(darkThemeIconClass);
                themeToggleIcon.classList.add(lightThemeIconClass);
            }
        }
    }

    // Function to toggle the theme
    function toggleTheme() {
        let currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        applyTheme(newTheme);
        localStorage.setItem(preferredThemeKey, newTheme);
    }

    // Initialize theme on page load
    function initTheme() {
        let savedTheme = localStorage.getItem(preferredThemeKey);
        
        if (savedTheme) {
            applyTheme(savedTheme);
        } else {
            // Optional: Check for OS preference if no theme is saved
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                applyTheme('dark');
                // Optionally save this as the initial preference
                // localStorage.setItem(preferredThemeKey, 'dark'); 
            } else {
                applyTheme('light'); // Default to light theme
            }
        }
    }

    // Add event listener to the toggle button
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // Initialize theme
    initTheme();
});
