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

  // Function to update the URL with selected features
  const updateURLWithSelectedFeatures = () => {
    const selectedFeatures = []; // Initialize an empty array to store selected feature IDs

    // Select all checkboxes with the name "Features"
    const featureCheckboxes = document.querySelectorAll('input[name="Features"]:checked');

    // Loop through selected checkboxes and add their IDs to the selectedFeatures array
    featureCheckboxes.forEach(checkbox => {
      selectedFeatures.push(checkbox.id);
    });

    // Construct the features parameter for the URL
    const featuresParam = selectedFeatures.length > 0 ? `features=${selectedFeatures.join(',')}` : '';

    // Get the current URL without parameters
    const currentURL = window.location.href.split('?')[0];

    // Construct the new URL with the features parameter
    const newURL = currentURL + (featuresParam ? '?' + featuresParam : '');

    // Update the browser's address bar with the new URL (without reloading the page)
    window.history.pushState({ path: newURL }, '', newURL);

    // Load more villas with the updated URL
    loadMoreVillas();
  };

  const propertiesURL = "https://spapi.weboscy.com/properties";
  const villaGrid = document.querySelector(".villa-grid");
  const batchSize = 200; // Number of villas to load in each batch
  let currentPage = 1; // Current page of data

  // Function to load more villa data
  const loadMoreVillas = () => {
    // Get the country, city, and date parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCountry = urlParams.get('country');
    const selectedCity = urlParams.get('city');
    const fromDate = urlParams.get('from');
    const toDate = urlParams.get('to');
    const selectedFeatures = urlParams.get('features');

    // Default dates to "2023-09-15" if they are not provided
    const formattedFromDate = fromDate || "2023-09-15";
    const formattedToDate = toDate || "2023-09-15";

    // Convert the date parameters to the desired format (yyyy/MM/dd)
    const formattedFromDateForURL = formatDateForURL(formattedFromDate);
    const formattedToDateForURL = formatDateForURL(formattedToDate);

    // Log the selected country, city, and dates
    console.log("Selected Country:", selectedCountry);
    console.log("Selected City:", selectedCity);
    console.log("From Date:", formattedFromDate);
    console.log("To Date:", formattedToDate);
    console.log("Selected Features:", selectedFeatures);

    // Construct the JSON search URL with the formatted date parameters and features
    const searchParams = new URLSearchParams();
    searchParams.set('from', formattedFromDateForURL);
    searchParams.set('to', formattedToDateForURL);
    if (selectedCountry) searchParams.set('country', selectedCountry);
    if (selectedCity) searchParams.set('city', selectedCity);
    if (selectedFeatures) searchParams.set('features', selectedFeatures);

    const searchURL = propertiesURL + '?' + searchParams.toString();

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

  // Function to check if the URL has any query parameters
  const hasQueryParameters = () => {
    return window.location.search !== '';
  };

  // Initial load
  if (hasQueryParameters()) {
    loadMoreVillas();
  }

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
