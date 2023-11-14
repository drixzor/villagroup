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

async function fetchAndPopulatePropertyData(propertyId) {
    const apiUrl = "https://spapi.weboscy.com/property?id=" + propertyId;

    try {
        console.log("Fetching property data...");
        const matchingProperty = await fetchData(apiUrl);

        if (matchingProperty) {
            console.log("Property data retrieved:", matchingProperty);
            populatePropertyDetails(matchingProperty);
            updateMetadata(matchingProperty);
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

    // Update meta description (truncate to 145 characters if needed)
    const truncatedSummary = accommodationsSummary && accommodationsSummary.length > 145
        ? accommodationsSummary.substring(0, 142) + "..."
        : accommodationsSummary;

    // Log the truncated summary
    console.log("Truncated Summary:", truncatedSummary);

    // Update or create meta description tag
    let metaDescription = document.head.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
    }
    metaDescription.content = truncatedSummary;

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
