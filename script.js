let profileDropdownList = document.querySelector(".profile-dropdown-list");
let btn = document.querySelector(".profile-dropdown-btn");

let classList = profileDropdownList.classList;

const toggle = () => classList.toggle("active");

window.addEventListener("click", function (e) {
  if (!btn.contains(e.target)) classList.remove("active");
});

document.addEventListener("DOMContentLoaded", function () {
  const userLang = localStorage.getItem("language") || "en";

  fetch(`./locales/${userLang}.json`)
      .then(response => response.json())
      .then(translations => {
          document.querySelector("a[href='settings.html']").textContent = translations.settings;
          document.querySelector("a[href='profile.html']").textContent = translations.profile;
          document.querySelector("a[href='inbox.html']").textContent = translations.inbox;
          document.querySelector("a[href='help.html']").textContent = translations.help;
          document.querySelector("a[href='#']").textContent = translations.logout;

          document.querySelectorAll(".navbar-list li a").forEach((link) => {
              if (translations[link.textContent.toLowerCase()]) {
                  link.textContent = translations[link.textContent.toLowerCase()];
              }
          });
      })
      .catch(error => console.error("Error loading language file:", error));
});

document.addEventListener("DOMContentLoaded", function () {
    fetch('http://localhost:5000/api/your-endpoint')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => console.log('Fetched data:', data))
      .catch(error => console.error('Error fetching data:', error));
  });
  
