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
                // Delay the execution of updateMetadata to ensure meta tags are added to the DOM
                setTimeout(() => {
                    updateMetadata(matchingProperty);
                    metadataUpdated = true; // Set the flag to true after updating metadata
                }, 0);
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
        accommodationsSummary,
        images
    } = property;

    // Log the fetched data
    console.log("Fetched data:", property);

    // Update title tag
    document.title = `Luxury Holiday Villa ${propertyId} in ${region}, ${city}, ${country}`;

    // Update meta description (truncate to 145 characters if needed) and remove HTML tags
    const truncatedSummary = accommodationsSummary && accommodationsSummary.length > 145
        ? accommodationsSummary.substring(0, 142) + "..."
        : accommodationsSummary;
    const truncatedSummaryWithoutHTML = truncatedSummary.replace(/<\/?[^>]+(>|$)/g, "");

    // Update or create meta description tag
    let metaDescription = document.head.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
    }
    metaDescription.content = truncatedSummaryWithoutHTML;

    // Log the updated meta description
    console.log("Updated Meta Description:", metaDescription);

    // Update or create graph image meta tag
    let graphImage = document.head.querySelector('meta[property="og:image"]');
    if (!graphImage) {
        graphImage = document.createElement('meta');
        graphImage.property = "og:image";
        document.head.appendChild(graphImage);
    }
    // Use the first image from the images array
    graphImage.content = images.split(',')[0].trim();
    // Log the updated graph image
    console.log("Updated Graph Image:", graphImage);
}
