let chemical = "./chemicalData.js";
const tableBody = document.getElementById("table-body");
const chemicatableBody = document.getElementById("chemical-table");
const selectAllCheckbox = document.getElementById("select-all");
const saveButton = document.getElementById("save-data");
const addRowButton = document.getElementById("add-row");
const deleteButton = document.getElementById("delete-row");
const moveUpButton = document.getElementById("move-row-up");
const moveDownButton = document.getElementById("move-row-down");
const dataArray = [];

function createTableRows() {
  chemicalData.forEach((chemical) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${chemical.id}</td>
            <td><input type="text" value="${chemical.name}" disabled></td>
            <td><input type="text" value="${chemical.vendor}" disabled></td>
            <td><input type="text" value="${chemical.density}" disabled></td>
            <td><input type="text" value="${chemical.viscosity}" disabled></td>
            <td><input type="text" value="${chemical.packaging}" disabled></td>
            <td><input type="text" value="${chemical.packSize}" disabled></td>
            <td><input type="text" value="${chemical.unit}" disabled></td>
            <td><input type="text" value="${chemical.quantity}" disabled></td>
      `;
    tableBody.appendChild(row);
    // Add event listener to the checkbox
    row
      .querySelector("input[type='checkbox']")
      .addEventListener("change", (checkbox) => {
        // console.log(checkbox.target.checked)
        toggleEditable(row, checkbox.target.checked);
      });
  });
}

createTableRows();

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
    const cellA = a.cells[colIndex].childNodes[0].value??a.cells[colIndex].textContent.trim();
    const cellB = b.cells[colIndex].childNodes[0].value??b.cells[colIndex].textContent.trim();

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
  headerCell.innerHTML += sortDirection === "asc" ? " &#8593;" : " &#8595;";
}

// Add event listener to select all checkbox
selectAllCheckbox.addEventListener("change", () => {
  const rows = chemicatableBody.querySelectorAll("tbody tr");
  rows.forEach((row) => {
    row.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
      checkbox.checked = selectAllCheckbox.checked;
      toggleEditable(row, checkbox.checked);
    });
  });
});
// Function to toggle editable state of a row
function toggleEditable(row, editable) {
  row.querySelectorAll("td:not(:first-child) input").forEach((input) => {
    input.disabled = !editable;
  });
}

// Save data function
saveButton.addEventListener("click", () => {
  const rows = chemicatableBody.querySelectorAll("tbody tr");
  rows.forEach((row) => {
    row.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
      if (checkbox.checked) {
        const cells = row.querySelectorAll("td");
        const editableCells = Array.from(cells).slice(1);
        id = editableCells[0].textContent;
        _chemical_data_by_index = chemicalData.find(chemicalData=> chemicalData['id']==1)
        _chemical_data_by_index.name = editableCells[1].childNodes[0].value
        _chemical_data_by_index.vendor = editableCells[2].childNodes[0].value
        _chemical_data_by_index.density = editableCells[3].childNodes[0].value
        _chemical_data_by_index.viscosity = editableCells[4].childNodes[0].value
        _chemical_data_by_index.packaging = editableCells[5].childNodes[0].value
        _chemical_data_by_index.packSize = editableCells[6].childNodes[0].value
        _chemical_data_by_index.unit = editableCells[7].childNodes[0].value
        _chemical_data_by_index.quantity = editableCells[8].childNodes[0].value
        chemicalData.push(_chemical_data_by_index);
        dataArray.push(_chemical_data_by_index);
        checkbox.checked = false;
        toggleEditable(row, checkbox.checked)
      }
    });
  });
  console.log(dataArray);
});


moveUpButton.addEventListener("click", () => {
  const rows = chemicatableBody.querySelectorAll("tbody tr");
  const checkedRows = Array.from(rows).filter(row => {
      return row.querySelector("input[type='checkbox']").checked;
  });

  checkedRows.forEach(row => {
      const previousRow = row.previousElementSibling;
      if (previousRow) {
          row.parentNode.insertBefore(row, previousRow);
      }
  });
});

moveDownButton.addEventListener("click", () => {
  const rows = chemicatableBody.querySelectorAll("tbody tr");
  const checkedRows = Array.from(rows).filter(row => {
      return row.querySelector("input[type='checkbox']").checked;
  });

  checkedRows.forEach(row => {
      const nextRow = row.nextElementSibling;
      if (nextRow) {
          row.parentNode.insertBefore(nextRow, row);
      }
  });
});

deleteButton.addEventListener("click", () => {
  const rows = chemicatableBody.querySelectorAll("tbody tr");
  const checkedRows = Array.from(rows).filter((row) => {
    return row.querySelector("input[type='checkbox']").checked;
  });

  checkedRows.forEach((row) => {
    row.parentNode.removeChild(row);
    // Remove corresponding data from dataArray
    const rowIndex = dataArray.findIndex(
      (item) => item.id === row.querySelector("td:nth-child(2)").textContent
    );
    if (rowIndex !== -1) {
      dataArray.splice(rowIndex, 1);
    }
  });
});

addRowButton.addEventListener("click", () => {
    const tableBody = document.getElementById("table-body");
    const newRow = document.createElement("tr");

    // Create cells for each column
    for (let i = 0; i < chemicatableBody.children[0].children[0].children.length; i++) {
        const cell = document.createElement("td");
        const columnName = chemicatableBody.children[0].children[0].children[i].textContent.slice(0, -1).trim();

        // Add input fields based on column names
        if (columnName === ""){
          cell.innerHTML = `<td><input type="checkbox" checked></td>`
        }
        else if (columnName === "ID") {
            cell.innerHTML = `<td>${chemicalData.length+1}</td>`;
        } else if (columnName === "Chemical Name") {
            cell.innerHTML = `<td><input type="text"></td>`;
        } else if (columnName === "Vendor") {
            cell.innerHTML = `<td><input type="text"></td>`;
        } else if (columnName === "Density") {
            cell.innerHTML = `<td><input type="text"></td>`;
        } else if (columnName === "Viscosity") {
            cell.innerHTML = `<td><input type="text"></td>`;
        } else if (columnName === "Packaging") {
            cell.innerHTML = `<td><input type="text"></td>`;
        } else if (columnName === "Pack Size") {
            cell.innerHTML = `<td><input type="text"></td>`;
        } else if (columnName === "Unit") {
            cell.innerHTML = `<td><input type="text"></td>`;
        } else if (columnName === "Quantity") {
            cell.innerHTML = `<td><input type="text"></td>`;
        }
        newRow.appendChild(cell);
    }

    // Insert the new row at the beginning of the table body
    tableBody.insertBefore(newRow, tableBody.firstChild);
});

function refresh() {
  window.onload()
}

window.onload = function () {
  sortTable(9); // Sort by the Quantatiy column initially
  sortTable(8); // Sort by the Unit column initially
  sortTable(7); // Sort by the Pack Size column initially
  sortTable(6); // Sort by the Packaging column initially
  sortTable(5); // Sort by the Viscosity column initially
  sortTable(4); // Sort by the Density column initially
  sortTable(3); // Sort by the vendor initially
  sortTable(2); // Sort by the Chemical Name initially
  sortTable(1); // Sort by the ID column initially
};
