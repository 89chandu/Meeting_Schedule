// Dummy meeting data for testing
const availableSlots = [
    { id: 1, date: '2023-09-25', time: '09:00:00', booked: 0 },
    { id: 2, date: '2023-09-25', time: '10:00:00', booked: 1 },
    { id: 3, date: '2023-09-26', time: '09:00:00', booked: 0 },
    // Add more dummy data as needed
];

// Function to fetch and display meeting data
function fetchMeetingData() {
    const tableBody = document.querySelector('#meeting-table tbody');

    // Clear existing rows in the table
    tableBody.innerHTML = '';

    // Populate the table with dummy meeting data
    availableSlots.forEach((meeting) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${meeting.date}</td>
            <td>${meeting.time}</td>
            <td>${meeting.booked ? 'Booked' : 'Available'}</td>
            <td>
                ${
                    meeting.booked
                        ? `<button class="cancel-button" data-id="${meeting.id}">Cancel</button>`
                        : `<button class="book-button" data-id="${meeting.id}">Book Now</button>`
                }
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Event listener for the "Book Now" button click
document.getElementById('meeting-table').addEventListener('click', async (event) => {
    if (event.target.classList.contains('book-button')) {
        // When the "Book Now" button is clicked for an available slot
        const slotId = event.target.getAttribute('data-id');
        const name = prompt('Enter your name:');
        const email = prompt('Enter your email:');

        if (name && email) {
            // Simulate a successful booking
            alert('Booking successful');
            // Update the dummy data to mark the slot as booked (for testing purposes)
            const bookedSlot = availableSlots.find((slot) => slot.id === Number(slotId));
            if (bookedSlot) {
                bookedSlot.booked = 1;
                fetchMeetingData(); // Refresh the table with updated data
            }
        } else {
            alert('Name and email are required to book a meeting slot.');
        }
    }
});

// Call the fetchMeetingData function when the page loads
fetchMeetingData();
