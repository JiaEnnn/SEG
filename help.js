document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }

    const questions = document.querySelectorAll(".faq-question");
    questions.forEach(question => {
        question.addEventListener("click", function () {
            this.nextElementSibling.classList.toggle("active");
            this.nextElementSibling.style.display =
                this.nextElementSibling.style.display === "block" ? "none" : "block";
        });
    });

    document.getElementById("support-form").addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Your support request has been submitted.");
    });
});
