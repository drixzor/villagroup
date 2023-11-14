document.addEventListener("DOMContentLoaded", function () {
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
        const matchingProperty = await fetchData(apiUrl);

        if (matchingProperty) {
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
    const {
        propertyId,
        region,
        city,
        country,
        accommodationsSummary,
        images
    } = property;

    // Update title tag
    document.title = `Luxury Holiday Villa ${propertyId} in ${region}, ${city}, ${country}`;

    // Update meta description (truncate to 145 characters if needed)
    const truncatedSummary = accommodationsSummary.length > 145
        ? accommodationsSummary.substring(0, 142) + "..."
        : accommodationsSummary;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = truncatedSummary;
    } else {
        // If meta description tag doesn't exist, create it
        const newMeta = document.createElement('meta');
        newMeta.name = "description";
        newMeta.content = truncatedSummary;
        document.head.appendChild(newMeta);
    }

    // Update graph image
    const graphImage = document.querySelector('meta[property="og:image"]');
    if (graphImage) {
        // Use the first image from the images array
        const firstImage = images.split(',')[0].trim();
        graphImage.content = firstImage;
    } else {
        // If og:image tag doesn't exist, create it
        const newGraphImage = document.createElement('meta');
        newGraphImage.property = "og:image";
        // Use the first image from the images array
        newGraphImage.content = images.split(',')[0].trim();
        document.head.appendChild(newGraphImage);
    }
}
