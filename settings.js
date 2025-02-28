document.addEventListener("DOMContentLoaded", function () {
    // Get settings from localStorage
    const darkModeToggle = document.getElementById("dark-mode");
    const notificationsToggle = document.getElementById("notifications");
    const fontSizeSelect = document.getElementById("font-size");

    // Load saved settings
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        darkModeToggle.checked = true;
    }

    if (localStorage.getItem("notifications") === "enabled") {
        notificationsToggle.checked = true;
    }

    if (localStorage.getItem("fontSize")) {
        document.body.style.fontSize = localStorage.getItem("fontSize");
        fontSizeSelect.value = localStorage.getItem("fontSize");
    }

    // Save settings when button is clicked
    window.saveSettings = function () {
        if (darkModeToggle.checked) {
            localStorage.setItem("darkMode", "enabled");
            document.body.classList.add("dark-mode");
        } else {
            localStorage.setItem("darkMode", "disabled");
            document.body.classList.remove("dark-mode");
        }

        if (notificationsToggle.checked) {
            localStorage.setItem("notifications", "enabled");
        } else {
            localStorage.setItem("notifications", "disabled");
        }

        localStorage.setItem("fontSize", fontSizeSelect.value);
        document.body.style.fontSize = fontSizeSelect.value;

        alert("Settings saved!");
    };
});
