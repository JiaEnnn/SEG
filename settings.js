document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("dark-mode");
    const notificationsToggle = document.getElementById("notifications");
    const fontSizeSelect = document.getElementById("font-size");
    const languageSelect = document.getElementById("language");

    // Load settings from localStorage
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        darkModeToggle.checked = true;
    }

    if (localStorage.getItem("notifications") === "enabled") {
        notificationsToggle.checked = true;
    }

    if (localStorage.getItem("fontSize")) {
        fontSizeSelect.value = localStorage.getItem("fontSize");
        document.body.style.fontSize = localStorage.getItem("fontSize");
    }

    if (localStorage.getItem("language")) {
        languageSelect.value = localStorage.getItem("language");
        loadLanguage(localStorage.getItem("language"));
    } else {
        loadLanguage("en"); // Default language
    }

    // Save settings when changed
    darkModeToggle.addEventListener("change", function () {
        if (this.checked) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("darkMode", "enabled");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "disabled");
        }
    });

    notificationsToggle.addEventListener("change", function () {
        localStorage.setItem("notifications", this.checked ? "enabled" : "disabled");
    });

    fontSizeSelect.addEventListener("change", function () {
        document.body.style.fontSize = this.value;
        localStorage.setItem("fontSize", this.value);
    });

    languageSelect.addEventListener("change", function () {
        localStorage.setItem("language", this.value);
        loadLanguage(this.value);
    });

    function loadLanguage(lang) {
        fetch(`./locales/${lang}.json`)
            .then(response => response.json())
            .then(translations => {
                document.querySelector("h1").textContent = translations.title;
                document.querySelector("label[for='dark-mode']").textContent = translations.darkMode;
                document.querySelector("label[for='notifications']").textContent = translations.notifications;
                document.querySelector("label[for='font-size']").textContent = translations.fontSize;
                document.querySelector("label[for='language']").textContent = translations.language;
                document.querySelector("button").textContent = translations.save;
            })
            .catch(error => console.error("Error loading language file:", error));
    }
});
