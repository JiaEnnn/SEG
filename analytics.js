document.addEventListener("DOMContentLoaded", function () {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const bookingData = {
        "Meeting Room": [10, 12, 14, 18, 22, 26, 20, 19, 15, 10, 8, 12],
        "Conference Hall": [5, 7, 10, 14, 18, 22, 25, 23, 20, 15, 12, 10],
        "Study Room": [8, 10, 12, 14, 18, 20, 22, 25, 21, 16, 12, 8],
        "Event Hall": [2, 5, 8, 12, 15, 18, 22, 20, 18, 12, 8, 5]
    };

    const ctx = document.getElementById("bookingChart").getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: months,
            datasets: Object.keys(bookingData).map((room, index) => ({
                label: room,
                data: bookingData[room],
                backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"][index], // Different colors
            }))
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Generate Recommendations
    function generateRecommendations() {
        let maxBookings = 0;
        let recommendedRoom = "";
        let lastMonthIndex = new Date().getMonth();

        for (let room in bookingData) {
            let lastMonthBookings = bookingData[room][lastMonthIndex];
            if (lastMonthBookings > maxBookings) {
                maxBookings = lastMonthBookings;
                recommendedRoom = room;
            }
        }

        document.getElementById("recommendationText").innerText =
            `Last month, the most booked room was "${recommendedRoom}" with ${maxBookings} bookings. 
             We recommend increasing availability for "${recommendedRoom}" next month!`;
    }

    generateRecommendations();

    // Apply Dark Mode
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }
    // Dummy User Data
const dummyUser = {
    name: "John Doe",
    email: "johndoe@example.com",
    role: "Student",
    favoriteRoom: "Meeting Room",
    lastBooking: "Study Room",
    totalBookings: 15
};

// Display User Information on Analytics Page
document.addEventListener("DOMContentLoaded", function () {
    // Create a User Info Section
    const userInfoContainer = document.createElement("div");
    userInfoContainer.classList.add("user-info");

    userInfoContainer.innerHTML = `
        <h3>User Profile</h3>
        <p><strong>Name:</strong> ${dummyUser.name}</p>
        <p><strong>Email:</strong> ${dummyUser.email}</p>
        <p><strong>Role:</strong> ${dummyUser.role}</p>
        <p><strong>Favorite Room:</strong> ${dummyUser.favoriteRoom}</p>
        <p><strong>Last Booking:</strong> ${dummyUser.lastBooking}</p>
        <p><strong>Total Bookings:</strong> ${dummyUser.totalBookings}</p>
    `;

    document.querySelector(".analytics-container").prepend(userInfoContainer);
});

});