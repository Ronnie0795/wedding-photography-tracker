// Sample data for the guest list
let guests = [
    { names: ["Soumili Bhadra", "Rahul Mitra", "Kuntal Bhadra", "Shampa Bhadra"], category: "Friend", photoCaptured: false, partiallyCaptured: false },
    { names: ["Gargi Biswas", "Mahuya Biswas", "Pranab Biswas"], category: "Family", photoCaptured: false, partiallyCaptured: false },
    { names: ["Basobi Sarkar"], category: "Relative", photoCaptured: false, partiallyCaptured: false },
    { names: ["Debasmita De", "Avishek"], category: "Friend", photoCaptured: false, partiallyCaptured: false },
    { names: ["Sanjay Choudhury"], category: "Friend", photoCaptured: false, partiallyCaptured: false },
    { names: ["Ranita"], category: "Friend", photoCaptured: false, partiallyCaptured: false },
    { names: ["Nayona"], category: "Friend", photoCaptured: false, partiallyCaptured: false },
];

// Simplified search function that checks if any part of the guest's name includes the search query
function searchGuest() {
    const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();

    // Filter guests by checking if the search input matches any part of their name
    const filteredGuests = guests.filter(guest => {
        return guest.names.some(name => name.toLowerCase().includes(searchInput));
    });

    // If no matches found, display "No results found"
    if (filteredGuests.length === 0) {
        const guestTableBody = document.getElementById("guestTableBody");
        guestTableBody.innerHTML = "<tr><td colspan='4'>No results found</td></tr>";
    } else {
        renderTable(filteredGuests);
    }
}

// Function to render the guest table
function renderTable(guestsToRender) {
    const guestTableBody = document.getElementById("guestTableBody");
    guestTableBody.innerHTML = ""; // Clear the table before re-rendering

    guestsToRender.forEach((guest, index) => {
        const row = document.createElement("tr");

        const fullButtonColor = guest.photoCaptured ? "#800080" : "#008080"; // Purple for fully captured, Teal blue for not captured
        const fullButtonText = guest.photoCaptured ? "Photo Captured" : "Capture Photo";

        const partialMarker = guest.partiallyCaptured && !guest.photoCaptured
            ? `<span class="partial-indicator"></span>`
            : "";

        const partialButton = !guest.partiallyCaptured && !guest.photoCaptured
            ? `<button onclick="togglePartialPhotoCapture(${index})" style="background-color: yellow; font-family: 'Halimum', cursive; font-weight: bold; cursor: pointer; color: #000; border: none; border-radius: 4px; padding: 5px 10px;">Partial</button>`
            : ""; // Empty if already partially captured or fully captured

        row.innerHTML = `
            <td style="font-family: 'Halimum', cursive; font-weight: bold; color: #333;">${guest.names.join(", ")}</td>
            <td style="font-family: 'Halimum', cursive; font-weight: bold; color: #333;">${guest.category}</td>
            <td style="font-family: 'Halimum', cursive; font-weight: bold; color: #333;">
                ${guest.photoCaptured ? "Yes" : (guest.partiallyCaptured ? "Partially" : "No")}
            </td>
            <td>
                <button onclick="toggleFullPhotoCapture(${index})" style="background-color: ${fullButtonColor}; font-family: 'Halimum', cursive; font-weight: bold; cursor: pointer; color: #fff; margin-right: 10px;">
                    ${fullButtonText}
                </button>
                ${partialMarker}
                ${partialButton} 
            </td>
        `;
        guestTableBody.appendChild(row);
    });
}

// Function to toggle full photo capture status (for fully captured photos)
function toggleFullPhotoCapture(index) {
    guests[index].photoCaptured = !guests[index].photoCaptured; 
    if (guests[index].photoCaptured) {
        guests[index].partiallyCaptured = false; 
    }
    renderTable(guests); 
}

// Function to toggle partial photo capture status (for partially captured photos)
function togglePartialPhotoCapture(index) {
    guests[index].partiallyCaptured = !guests[index].partiallyCaptured; 
    if (guests[index].partiallyCaptured) {
        guests[index].photoCaptured = false; 
    }
    renderTable(guests); 
}

// Initial rendering of the table when the page loads
window.onload = function() {
    renderTable(guests);
};


