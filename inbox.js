document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }

    const messages = [

        {
            sender: "System Notification",
            time: "1 hour ago",
            content: "Dear user, your booking for room 2R019 has been approved!"
        },
        {
            sender: "System Notification",
            time: "2 hours ago",
            content: "Dear user, please rate from 1-10 regarding to your previous booking: room 3R026"
        },
        {
            sender: "Support Team",
            time: "1 day ago",
            content: "Dear user, your issue has been resolved. Let us know if you need anything else."
        },
        {
            sender: "Event Notification",
            time: "3 days ago",
            content: "Dear students and staffs, there will be a performance from music club on 11/3/2025 12pm at the foyer, do feel free to come and enjoy the performance!"
        },
        {
            sender: "System Notification",
            time: "1 week ago",
            content: "Dear user, thank you for providing feedback regarding to the system. We will take note of it as soon as possible."
        }
    ];

    const inboxItems = document.querySelectorAll(".inbox-item");
    const messageBox = document.querySelector(".message-content");
    
    inboxItems.forEach((item, index) => {
        item.addEventListener("click", function () {
            messageBox.innerHTML = `<strong>${messages[index].sender}</strong> - ${messages[index].time}<br><br>${messages[index].content}`;
        });
    });

});
