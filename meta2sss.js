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

    // Update title tag
    document.title = `Luxury Holiday Villa ${propertyId} in ${region}, ${city}, ${country}`;

    // Update or create meta description tag
    let metaDescription = document.head.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
    }
    const truncatedSummary = accommodationsSummary && accommodationsSummary.length > 145
        ? accommodationsSummary.substring(0, 142) + "..."
        : accommodationsSummary;
    metaDescription.content = truncatedSummary;

    // Update or create og:title tag
    let ogTitle = document.head.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.property = "og:title";
        document.head.appendChild(ogTitle);
    }
    ogTitle.content = `Luxury Holiday Villa ${propertyId} in ${region}, ${city}, ${country}`;

    // Update or create og:description tag
    let ogDescription = document.head.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
        ogDescription = document.createElement('meta');
        ogDescription.property = "og:description";
        document.head.appendChild(ogDescription);
    }
    ogDescription.content = truncatedSummary;

    // Update or create og:image tag
    let ogImage = document.head.querySelector('meta[property="og:image"]');
    if (!ogImage) {
        ogImage = document.createElement('meta');
        ogImage.property = "og:image";
        document.head.appendChild(ogImage);
    }
    const firstImage = images.split(',')[0].trim();
    ogImage.content = firstImage;

    // Update or create twitter:title tag
    let twitterTitle = document.head.querySelector('meta[property="twitter:title"]');
    if (!twitterTitle) {
        twitterTitle = document.createElement('meta');
        twitterTitle.property = "twitter:title";
        document.head.appendChild(twitterTitle);
    }
    twitterTitle.content = `Luxury Holiday Villa ${propertyId} in ${region}, ${city}, ${country}`;

    // Update or create twitter:description tag
    let twitterDescription = document.head.querySelector('meta[property="twitter:description"]');
    if (!twitterDescription) {
        twitterDescription = document.createElement('meta');
        twitterDescription.property = "twitter:description";
        document.head.appendChild(twitterDescription);
    }
    twitterDescription.content = truncatedSummary;

    // Update or create twitter:image tag
    let twitterImage = document.head.querySelector('meta[property="twitter:image"]');
    if (!twitterImage) {
        twitterImage = document.createElement('meta');
        twitterImage.property = "twitter:image";
        document.head.appendChild(twitterImage);
    }
    twitterImage.content = firstImage;

    // Log the updated metadata
    console.log("Updated Metadata:", {
        title: document.title,
        description: metaDescription.content,
        ogTitle: ogTitle.content,
        ogDescription: ogDescription.content,
        ogImage: ogImage.content,
        twitterTitle: twitterTitle.content,
        twitterDescription: twitterDescription.content,
        twitterImage: twitterImage.content
    });
}

