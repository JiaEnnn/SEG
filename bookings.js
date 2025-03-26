document.addEventListener("DOMContentLoaded", () => {
    const roomsContainer = document.getElementById("rooms");
    const submitButton = document.getElementById("submit-booking");
    let selectedRoom = null;

    // Dummy room data (need to be replaced with DB)
    const roomData = [
        { id: 1, name: "Room A", available: true },
        { id: 2, name: "Room B", available: false },
        { id: 3, name: "Room C", available: true },
        { id: 4, name: "Room D", available: true }
    ];

    // Render rooms
    roomData.forEach(room => {
        const roomDiv = document.createElement("div");
        roomDiv.classList.add("room", room.available ? "available" : "unavailable");
        roomDiv.innerText = room.name;
        
        if (room.available) {
            roomDiv.addEventListener("click", () => {
                if (selectedRoom) {
                    selectedRoom.classList.remove("selected");
                }
                selectedRoom = roomDiv;
                roomDiv.classList.add("selected");
            });
        }

        roomsContainer.appendChild(roomDiv);
    });

    // Handle Booking Submission
    submitButton.addEventListener("click", () => {
        const date = document.getElementById("booking-date").value;
        const time = document.getElementById("booking-time").value;
        
        if (!date || !time || !selectedRoom) {
            alert("Please select a date, time, and room.");
            return;
        }

        const bookingDetails = {
            date,
            time,
            room: selectedRoom.innerText
        };

        console.log("Booking Submitted:", bookingDetails);
        alert(`Booking confirmed for ${bookingDetails.room} on ${bookingDetails.date} at ${bookingDetails.time}`);
    });
});
