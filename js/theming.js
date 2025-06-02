document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeToggleIcon = document.getElementById('themeToggleIcon');
    const body = document.body;
    const lightThemeIconClass = 'bi-sun-fill';
    const darkThemeIconClass = 'bi-moon-fill';
    const preferredThemeKey = 'preferredTheme';

    function applyTheme(theme) {
        try {
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
        } catch (error) {
            console.error("Error applying theme:", error);
        }
    }

    function toggleTheme() {
        try {
            let currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
            let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            applyTheme(newTheme);
            localStorage.setItem(preferredThemeKey, newTheme);
        } catch (error) {
            console.error("Error toggling theme:", error);
        }
    }

    function initTheme() {
        try {
            let savedTheme = localStorage.getItem(preferredThemeKey);
            
            if (savedTheme) {
                applyTheme(savedTheme);
            } else {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    applyTheme('dark');
                } else {
                    applyTheme('light');
                }
            }
        } catch (error) {
            console.error("Error initializing theme:", error);
        }
    }

    if (themeToggleBtn) {
        try {
            themeToggleBtn.addEventListener('click', toggleTheme);
        } catch (error) {
            console.error("Error adding event listener to theme toggle button:", error);
        }
    } else {
        console.warn("Theme toggle button #themeToggleBtn not found.");
    }
    
    if (!themeToggleIcon) {
        console.warn("Theme toggle icon #themeToggleIcon not found.");
    }
    if (!body) {
        // This should not happen if script is loaded correctly with DOMContentLoaded
        console.error("Document body not found.");
        return; 
    }

    initTheme();
});
