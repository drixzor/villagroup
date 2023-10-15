
// Function to extract the ID from the URL
function getIDFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

// Get the property ID from the URL
const propertyID = getIDFromURL();

// Check if the property ID is available
if (propertyID) {
  // URL of the API with the dynamic property ID
  const apiUrl = `https://spapi.weboscy.com/property?id=${propertyID}`;

  // Get a reference to the table container div
  const tableContainer = document.getElementById('table-container');

  // Fetch data from the API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Check if the API response contains the 'variables' field
      if (data.variables) {
        // Create a temporary div element to parse the 'variables' field
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = data.variables;

        // Find and append the table from the 'variables' field to the table container
        const table = tempDiv.querySelector('.variable_table');
        if (table) {
          tableContainer.appendChild(table);
        } else {
          tableContainer.textContent = 'Table data not found.';
        }

        // Clean up the temporary div
        tempDiv.remove();
      } else {
        tableContainer.textContent = 'No variable data in the API response.';
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      tableContainer.textContent = 'Failed to fetch data from the API.';
    });
} else {
  // Handle the case when the property ID is not available
  document.getElementById('table-container').textContent = 'Property ID not found in the URL.';
}

