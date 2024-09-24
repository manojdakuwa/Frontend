let chemical = './chemicalData.js'
const tableBody = document.getElementById("table-body");

function createTableRows() {
  chemicalData.forEach((chemical) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td><span class="math-inline">${chemical.id}</td\>
  <td\></span>${chemical.name}</td>
        <td><span class="math-inline">${chemical.vendor}</td\>
  <td\></span>${chemical.density}</td>
        <td><span class="math-inline">${chemical.viscosity}</td\>
  <td\></span>${chemical.packaging}</td>
        <td><span class="math-inline">${chemical.packSize}</td\>
  <td\></span>${chemical.unit}</td>
        <td>${chemical.quantity}</td>
      `;
    tableBody.appendChild(row);
  });
}

createTableRows();

//   function sortTable(colIndex) {
//     const table = document.getElementById("chemical-table");
//     const tbody = table.querySelector("tbody");
//     const rows = Array.from(tbody.children);

//     // Get the sort direction (ascending or descending)
//     const sortDirection = table.querySelector("th:nth-child(" + (colIndex + 1) + ")").dataset.sortDirection || "asc";

//     const headerCell = table.querySelector("th:nth-child(" + (colIndex + 1) + ")");
//     headerCell.innerHTML = headerCell.textContent;

//     // Sort the rows based on the column index and sort direction
//     rows.sort((a, b) => {
//       const cellA = a.cells[colIndex].textContent.trim();
//       const cellB = b.cells[colIndex].textContent.trim();

//       // Handle numerical values
//       const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);
//       if (isNumeric(cellA) && isNumeric(cellB)) {
//         return (parseFloat(cellA) - parseFloat(cellB)) * (sortDirection === "asc" ? 1 : -1);
//       }

//       // Handle string values
//       return cellA.localeCompare(cellB) * (sortDirection === "asc" ? 1 : -1);
//     });

//     // Update the table with the sorted rows
//     rows.forEach((row) => tbody.appendChild(row));

//     // Toggle the sort direction for the clicked column
//     headerCell.dataset.sortDirection = sortDirection === "asc" ? "desc" : "asc";
//     headerCell.innerHTML = headerCell.textContent + (sortDirection === "asc" ? " &#8593;" : " &#8595;");
//   }

function sortTable(colIndex) {
  const table = document.getElementById("chemical-table");
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.children);

  // Get the sort direction (ascending or descending)
  const headerCell = table.querySelector(
    "th:nth-child(" + (colIndex + 1) + ")"
  );
  const sortDirection = headerCell.dataset.sortDirection || "asc";
  headerCell.innerHTML = headerCell.textContent.slice(0, -1);

  // Sort the rows based on the column index and sort direction
  rows.sort((a, b) => {
    const cellA = a.cells[colIndex].textContent.trim();
    const cellB = b.cells[colIndex].textContent.trim();

    // Handle numerical values
    const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);
    if (isNumeric(cellA) && isNumeric(cellB)) {
      return (
        (parseFloat(cellA) - parseFloat(cellB)) *
        (sortDirection === "asc" ? 1 : -1)
      );
    }

    // Handle string values
    return cellA.localeCompare(cellB) * (sortDirection === "asc" ? 1 : -1);
  });

  // Update the table with the sorted rows
  rows.forEach((row) => tbody.appendChild(row));

  // Toggle the sort direction and update the arrow indicator
  headerCell.dataset.sortDirection = sortDirection === "asc" ? "desc" : "asc";
  headerCell.innerHTML +=
    (sortDirection === "asc" ? " &#8593;" : " &#8595;");
}

// Initial sort on page load
window.onload = function () {
  sortTable(0); // Sort by the first column initially
};
