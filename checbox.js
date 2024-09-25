const table = document.getElementById("chemical-table");
const selectAllCheckbox = document.getElementById("select-all");
const rows = table.querySelectorAll("tbody tr");
const dataArray = [];

// Add event listener to select all checkbox
selectAllCheckbox.addEventListener("change", () => {
    rows.forEach(row => {
        row.querySelector("input[type='checkbox']").checked = selectAllCheckbox.checked;
    });
});

// Add event listeners to individual checkboxes and rows
rows.forEach(row => {
    const checkbox = row.querySelector("input[type='checkbox']");
    const data = {
        id: row.querySelector("td:nth-child(2)").textContent,
        // ... other data fields
    };
    dataArray.push(data);

    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            // Handle row selection and data changes here
        } else {
            // Handle row deselection and remove data from array
            dataArray.splice(dataArray.indexOf(data), 1);
        }
    });
});

// Implement sorting functionality (same as before)

// Save data function
saveButton.addEventListener("click", () => {
    // Process the dataArray and save it as needed
    console.log(dataArray);
});