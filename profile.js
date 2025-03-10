document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }

    const profileImg = document.getElementById("profile-img");
    const profileUpload = document.getElementById("profile-upload");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const bio = document.getElementById("bio");

    if (localStorage.getItem("profileImg")) {
        profileImg.src = localStorage.getItem("profileImg");
    }
    username.value = localStorage.getItem("username") || "";
    email.value = localStorage.getItem("email") || "";
    bio.value = localStorage.getItem("bio") || "";

    profileUpload.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImg.src = e.target.result;
                localStorage.setItem("profileImg", e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    window.saveProfile = function () {
        if (document.getElementById("password").value !== document.getElementById("confirm-password").value) {
            alert("Passwords do not match!");
            return;
        }

        localStorage.setItem("username", username.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("bio", bio.value);

        alert("Profile saved successfully!");
    };
});
