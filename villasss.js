// Function to format a date string from yyyy-MM-dd to yyyy/MM/dd
const formatDateForURL = (dateString) => {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [year, month, day] = dateString.split('-');
    return `${year}/${month}/${day}`;
  } else {
    console.error("Invalid date format:", dateString);
    return null;
  }
};

const propertiesURL = "https://spapi.weboscy.com/properties";
const villaGrid = document.querySelector(".villa-grid");
const batchSize = 200;
let currentPage = 1;

// Function to get selected feature IDs
const getSelectedFeatures = () => {
  const selectedFeatures = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
    .map(checkbox => checkbox.id);
  return selectedFeatures;
};

// Function to load more villa data
const loadMoreVillas = () => {
  // Get the country, city, and date parameters from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const selectedCountry = urlParams.get('country');
  const selectedCity = urlParams.get('city');
  const fromDate = urlParams.get('from');
  const toDate = urlParams.get('to');
  
  // Check if there are no parameters provided in the URL
  const noParameters = !(selectedCountry || selectedCity || fromDate || toDate);

  // Default dates to "2023-09-15" if they are not provided
  const formattedFromDate = fromDate || "2023-09-15";
  const formattedToDate = toDate || "2023-09-15";

  // Convert the date parameters to the desired format (yyyy/MM/dd)
  const formattedFromDateForURL = formatDateForURL(formattedFromDate);
  const formattedToDateForURL = formatDateForURL(formattedToDate);

  // Get the selected features
  const selectedFeatureIDs = getSelectedFeatures();

  // Construct the JSON search URL based on whether there are parameters or not
  let searchURL = propertiesURL;
  if (!noParameters) {
    searchURL += '?country=' + (selectedCountry || '') +
      '&city=' + (selectedCity || '') +
      '&from=' + formattedFromDateForURL +
      '&to=' + formattedToDateForURL +
      '&features=' + selectedFeatureIDs.join(',');
  }

  fetch(searchURL)
    .then(response => response.json())
    .then(propertiesData => {
      // Filter properties based on selectedCountry, excluding properties with "0" as the country and null locations
      const filteredProperties = propertiesData.filter(property => {
        // Check if selectedCountry is null or matches the property's country (excluding "0")
        const isCountryMatch = !selectedCountry || (property.country !== "0" && property.country === selectedCountry);

        // Check if selectedCity is null or matches the property's city (excluding null and "0" values)
        const isCityMatch = !selectedCity || (property.city !== null && property.city !== "0" && property.city === selectedCity);

        // Check if addressLine is not null and not "0"
        const isAddressLineValid = property.addressLine !== null && property.addressLine !== "0";

        // Return true only if both conditions are met, and the property has a valid addressLine
        return isCountryMatch && isCityMatch && isAddressLineValid;
      });

      // Clear existing villa listings if it's the first page
      if (currentPage === 1) {
        villaGrid.innerHTML = "";
      }

      // Iterate through each property and generate the HTML structure
      filteredProperties.slice(
        (currentPage - 1) * batchSize,
        currentPage * batchSize
      ).forEach(property => {
        const propertyHTML = `
                <div class="property-cell link-block" data-id="${property.propertyId}">
                  <div class="property-image-wrap">
                    <img class="property-image" src="${property.images ? property.images.split(', ')[0] : ''}" alt="${property.name}" loading="lazy">
                  </div>
                  <div class="property-info-wrap">
                    <h3 class="heading-3">Villa ${property.propertyId}</h3>
                    <!-- Property location information -->
                    <div class="property-location-wrap">
                      <img src="https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/65099f522c1d3bf11f61f1ed_location.png" loading="lazy" alt="" class="property-info-icon">
                      <div class="property-address">${property.city}</div>
                    </div>

                    <!-- Property details -->
                    <div class="villa-info-detail">
                      <div class="property-info">
                        <img src="https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/65099f7473c26c897f2bc91a_bed.png" loading="lazy" alt="" class="property-info-icon">
                        <div class="bed-number">${property.bedrooms}</div>
                        <div class="bed-text">Bed</div>
                      </div>
                      <div class="property-info">
                        <img src="https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/65099ef73e0aa6c5ece9fa14_user.png" loading="lazy" alt="" class="property-info-icon">
                        <div class="bed-text">Up to</div>
                        <div class="guest-number">${property.maximumOccupancyGuests}</div>
                        <div class="bed-text">guests</div>
                      </div>
                    </div>
                    <!-- Pricing information -->
                    <div class="villa-pricing">
                      <div class="euro-sign">€</div>
                      <div class="pricingfrom">${property.min_price}</div>
                      <div class="text-block">to</div>
                      <div class="euro-sign">€</div>
                      <div class="pricingto">${property.max_price}</div>
                      <div class="text-block"> /WEEK</div>
                    </div>
                  </div>
                </div>
              `;

        // Append the property HTML to the villa grid container
        villaGrid.insertAdjacentHTML("beforeend", propertyHTML);
      });

      // Increment the current page for the next batch
      currentPage++;
    })
    .catch(error => {
      console.error("Error fetching properties:", error);
    });
};

// Initial load
loadMoreVillas();

// Scroll event listener
window.addEventListener("scroll", () => {
  const distanceToBottom = document.documentElement.scrollHeight - (window.innerHeight + window.scrollY);

  // Load more data if the user is near the bottom
  if (distanceToBottom < 1500) { // Adjust the threshold as needed
    loadMoreVillas();
  }
});

// Add click event listener to property cells outside of loadMoreVillas
villaGrid.addEventListener('click', function(event) {
  const propertyCell = event.target.closest('.property-cell');
  if (propertyCell) {
    const propertyID = propertyCell.getAttribute('data-id');
    if (propertyID) {
      console.log("Clicked on Property ID:", propertyID);
      window.open('/villa-item?id=' + propertyID, '_blank');
    }
  }
});
