document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM content loaded");

    const url = window.location.href;
    const urlParams = new URLSearchParams(url.split('?').pop());
    const propertyId = urlParams.get("id");

    if (propertyId) {
        fetchAndPopulatePropertyData(propertyId);
    } else {
        console.log("No property ID found in the URL");
    }
});

// Use a flag to check if updateMetadata has been called for the current property
let metadataUpdated = false;

async function fetchAndPopulatePropertyData(propertyId) {
    const apiUrl = "https://spapi.weboscy.com/property?id=" + propertyId;

    try {
        console.log("Fetching property data...");
        const matchingProperty = await fetchData(apiUrl);

        if (matchingProperty) {
            console.log("Property data retrieved:", matchingProperty);

            // Check if metadata has been updated for this property
            if (!metadataUpdated) {
                populatePropertyDetails(matchingProperty);
                updateMetadata(matchingProperty);
                metadataUpdated = true;
            } else {
                console.log("Metadata already updated for this property.");
            }
        } else {
            console.log("Property not found.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

function updateMetadata(property) {
    console.log("Updating metadata");

    const {
        propertyId,
        region,
        city,
        country,
    } = property;

    // Update title tag
    document.getElementById('pageTitle').innerText = `Luxury Holiday Villa ${propertyId} in ${region}, ${city}, ${country}`;

    // Log the updated metadata
    console.log("Updated Metadata:", {
        title: document.getElementById('pageTitle').innerText,
    });
}
