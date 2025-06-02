// Stores the currently loaded translations
let currentTranslations = {};
// Default language
const defaultLang = 'en';

// Function to fetch translation file
async function fetchTranslations(lang) {
    try {
        const response = await fetch(`locales/${lang}.json`);
        if (!response.ok) {
            console.error(`Could not load ${lang}.json: ${response.statusText}`);
            // Fallback to default language if the selected one fails
            if (lang !== defaultLang) {
                return fetchTranslations(defaultLang);
            }
            return {}; // Return empty if default also fails
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${lang}.json:`, error);
        if (lang !== defaultLang) {
            return fetchTranslations(defaultLang);
        }
        return {};
    }
}

// Function to apply translations to the page
function applyTranslations(translations) {
    currentTranslations = translations; // Store for potential later use

    // Update document title
    if (currentTranslations.metaTitle) {
        document.title = currentTranslations.metaTitle;
    }

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (currentTranslations[key]) {
            element.textContent = currentTranslations[key];
        }
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(element => {
        const key = element.getAttribute('data-i18n-alt');
        if (currentTranslations[key]) {
            element.alt = currentTranslations[key];
        }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        if (currentTranslations[key]) {
            element.title = currentTranslations[key];
        }
    });
    
    document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
        const key = element.getAttribute('data-i18n-aria-label');
        if (currentTranslations[key]) {
            element.setAttribute('aria-label', currentTranslations[key]);
        }
    });

    document.querySelectorAll('[data-i18n-content]').forEach(element => {
        const key = element.getAttribute('data-i18n-content');
        if (currentTranslations[key]) {
            element.content = currentTranslations[key];
        }
    });
}

// Function to set language and update page
async function setLanguage(lang) {
    const translations = await fetchTranslations(lang);
    applyTranslations(translations);

    // Handle text direction
    if (lang === 'ar') {
        document.documentElement.dir = 'rtl';
    } else {
        document.documentElement.dir = 'ltr';
    }

    // Store selected language in localStorage
    localStorage.setItem('selectedLanguage', lang);
}

// Function to initialize i18n on page load
function initI18n() {
    // Get stored language or default to English
    // For simplicity, navigator.language detection is omitted here but can be added
    const savedLang = localStorage.getItem('selectedLanguage') || defaultLang;
    setLanguage(savedLang);
}

// Expose setLanguage to be called by the language switcher
window.setAppLanguage = setLanguage;

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initI18n);
