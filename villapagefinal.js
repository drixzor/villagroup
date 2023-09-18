// Create a mapping object for amenity codes to descriptions
const amenityMappings = {
    LOCATION_TYPE_RESORT: "Resort Location",
    SPORTS_GOLF: "Golf",
    ATTRACTIONS_HEALTH_BEAUTY_SPA: "Health & Beauty Spa",
    LEISURE_HORSEBACK_RIDING: "Horseback Riding",
    ATTRACTIONS_WATER_PARKS: "Water Parks",
    SPORTS_SWIMMING: "Swimming",
    AMENITIES_HAIR_DRYER: "Hair Dryer",
    AMENITIES_INTERNET: "Internet",
    AMENITIES_AIR_CONDITIONING: "Air Conditioning",
    AMENITIES_IRON_BOARD: "Iron & Ironing Board",
    KITCHEN_DINING_MICROWAVE: "Microwave",
    KITCHEN_DINING_AREA: "Dining Area",
    OUTDOOR_BALCONY: "Balcony",
    AMENITIES_PARKING: "Parking",
    OUTDOOR_DECK_PATIO_UNCOVERED: "Uncovered Deck/Patio",
    POOL_SPA_HEATED_POOL: "Heated Pool"
};

// Create a mapping object for category codes to category names
const categoryMappings = {
    LOCATION_TYPE: "Location Type",
    SPORTS: "Sports",
    ATTRACTIONS: "Attractions",
    LEISURE: "Leisure",
    AMENITIES: "Amenities",
    KITCHEN_DINING: "Kitchen & Dining",
    OUTDOOR: "Outdoor",
    POOL_SPA: "Pool & Spa"
    // Add more categories as needed
};

// Function to convert amenity codes to text descriptions
function convertAmenitiesToString(amenities) {
    if (!amenities) {
        return "No amenities available"; // Handle the case when amenities is null or undefined
    }
    const amenityCodes = amenities.split(',').map(code => code.trim());
    const amenityDescriptions = amenityCodes.map(code => amenityMappings[code] || code); // Use the mapping or the code itself if not found
    return amenityDescriptions.join(', ');
}

document.addEventListener("DOMContentLoaded", function () {
    const url = new URL(window.location.href);
    const propertyId = url.searchParams.get("id");
    fetchPropertyData(propertyId);
});

async function fetchPropertyData(propertyId) {
    const apiUrl = "https://spapi.weboscy.com/property?id=" + propertyId;

    try {
        const matchingProperty = await fetchData(apiUrl);

        if (matchingProperty) {
            populatePropertyDetails(matchingProperty);
            // Update the data-calendar-property-id attribute with property ID for the widget
            var bookingWidget = document.getElementById('booking-widget-container');
            if (bookingWidget) {
                bookingWidget.innerHTML = `<div data-calendar-key="306CF20FB9002DA05908D846CACD52D722130AB6F33ED392045C5EE6D0A371C5D639889CDCBFD28CD218A78ED8791E35" data-calendar-property-id="${matchingProperty.propertyId}">Your widget will appear here.</div>`;
            }

        } else {
            console.log("Property not found.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch data (HTTP ${response.status})`);
    }
    return response.json();
}

function populatePropertyDetails(property) {
    const {
        id,
        propertyId,
        status,
        maximumOccupancyGuests,
        bedrooms,
        addressLine,
        city,
        country,
        postCode,
        latitude,
        longitude,
        name,
        acceptedPaymentForms,
        cancellationPolicy,
        checkInTime,
        checkOutTime,
        childrenAllowed,
        maximumOccupancyAdults,
        maximumOccupancyChildren,
        petsAllowed,
        smokingAllowed,
        subcaption,
        description,
        summary,
        changeover,
        images,
        amenities,
        propertyType,
        accommodationsSummary
    } = property;

    // Populate HTML elements
    document.querySelector(".villa-id").textContent = `Villa ${id}`;
    document.querySelector(".villa-id").textContent = `Villa ${id}`;
    document.querySelector(".property-id").textContent = `${propertyId}`;
    document.querySelector(".status").textContent = `Status: ${status}`;
    document.querySelector(".guest-number").textContent = `Up to ${maximumOccupancyGuests} Guests`;
    document.querySelector(".bed-number").textContent = `${bedrooms} Bedrooms`;
    document.querySelector(".address-line").textContent = `Address Line: ${addressLine}`;
    document.querySelector(".villa-city").textContent = `${city}`;
    document.querySelector(".country").textContent = `Country: ${country}`;
    document.querySelector(".post-code").textContent = `Post Code: ${postCode}`;
    document.querySelector(".name").textContent = `${name}`;
    document.querySelector(".accepted-payment-forms").textContent = `Accepted Payment Forms: ${acceptedPaymentForms}`;
    document.querySelector(".cancellation-policy").textContent = `Cancellation Policy: ${cancellationPolicy}`;
    document.querySelector(".check-in-time").textContent = `Check-in Time: ${checkInTime}`;
    document.querySelector(".check-out-time").textContent = `Check-out Time: ${checkOutTime}`;
    document.querySelector(".children-allowed").textContent = `Children Allowed: ${childrenAllowed}`;
    document.querySelector(".maximum-occupancy-adults").textContent = `Maximum Occupancy Adults: ${maximumOccupancyAdults}`;
    document.querySelector(".maximum-occupancy-children").textContent = `Maximum Occupancy Children: ${maximumOccupancyChildren}`;
    document.querySelector(".pets-allowed").textContent = `Pets Allowed: ${petsAllowed}`;
    document.querySelector(".smoking-allowed").textContent = `Smoking Allowed: ${smokingAllowed}`;
    document.querySelector(".subcaption").textContent = `Subcaption: ${subcaption}`;
    document.querySelector(".description").textContent = `Description: ${description}`;
    document.querySelector(".villa-description").innerHTML = `${accommodationsSummary}`;
    document.querySelector(".changeover").textContent = `Changeover: ${changeover}`;
    document.querySelector(".images").textContent = `Images: ${images}`;
    console.log('test', property);

    // Check if amenities is not null or undefined before splitting
    if (amenities) {
        // Use the convertAmenitiesToString function to display amenities
        const amenitiesString = convertAmenitiesToString(amenities);
        // Update the ".amenities" element with the amenities string
        document.querySelector(".amenities").textContent = `Amenities: ${amenitiesString}`;

        // Create HTML blocks for each category of amenities
        const amenityCategories = groupAmenitiesByCategory(amenities);
        const amenityContainer = document.querySelector(".amenity-container");

        // Clear existing content in the amenity container
        amenityContainer.innerHTML = "";

        // Append the category blocks to the amenity container
        for (const category in amenityCategories) {
            const categoryBlock = createCategoryBlock(category, amenityCategories[category]);
            amenityContainer.appendChild(categoryBlock);
        }
    }

    document.querySelector(".property-type").textContent = `Property Type: ${propertyType}`;
    document.querySelector(".accommodations-summary").textContent = `Accommodations Summary: ${accommodationsSummary}`;
    document.querySelector(".data-map-lat").textContent = `${latitude}`;
    document.querySelector(".data-map-lon").textContent = `${longitude}`;

    const imagesArray = images.split(',').map(url => url.trim()); // Trim URLs during split
    const mosaicContainer = document.querySelector(".villa-gallery-mosaic");
    const firstImage = imagesArray[0].trim();
    document.querySelector(".hero").style.backgroundImage = `url(${firstImage})`;
    imagesArray.forEach((image, index) => {
        const imageElement = document.createElement("div");
        imageElement.className = `mosaic-image column-${(index % 3) + 1}`;
        imageElement.style.backgroundImage = `url('${image.trim()}')`;
        mosaicContainer.appendChild(imageElement);
        imageElement.addEventListener('click', function () { openLightbox(index); });
    });

    // Setup Lightbox
    var lightboxImage = document.getElementById("lightbox-img");
    var lightbox = document.getElementById("lightbox");

    document.getElementById('close').addEventListener('click', closeLightbox);
    document.getElementById('next').addEventListener('click', nextImage);
    document.getElementById('prev').addEventListener('click', prevImage);

    function openLightbox(index) {
        lightboxImage.src = imagesArray[index];
        lightbox.style.display = 'flex';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
    }

    function nextImage() {
        const currentIndex = imagesArray.indexOf(lightboxImage.src.trim());
        const newIndex = (currentIndex + 1) % imagesArray.length;
        lightboxImage.src = imagesArray[newIndex];
    }

    function prevImage() {
        const currentIndex = imagesArray.indexOf(lightboxImage.src.trim());
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = imagesArray.length - 1;
        lightboxImage.src = imagesArray[newIndex].trim();
    }
}

// Function to create HTML blocks for amenity categories
function createCategoryBlock(category, amenities) {
    const categoryBlock = document.createElement("div");
    categoryBlock.classList.add("amenity-block");

    const featureBlock = document.createElement("div");
    featureBlock.classList.add("feature-block");

    const amenityCategory = document.createElement("div");
    amenityCategory.classList.add("amenity-category");
    amenityCategory.textContent = categoryMappings[category] || category;

    const amenityText = document.createElement("div");
    amenityText.classList.add("amenity-text");
    amenityText.textContent = amenities.join(', ');

    featureBlock.appendChild(amenityCategory);
    categoryBlock.appendChild(featureBlock);
    categoryBlock.appendChild(amenityText);

    return categoryBlock;
}

// Function to group amenities by category
function groupAmenitiesByCategory(amenities) {
    const amenityCategories = {};

    const amenityCodes = amenities.split(',').map(code => code.trim());
    const amenityDescriptions = amenityCodes.map(code => amenityMappings[code] || code);

    amenityDescriptions.forEach(description => {
        const [category, amenity] = description.split(' - ');
        if (category && amenity) {
            if (!amenityCategories[category]) {
                amenityCategories[category] = [];
            }
            amenityCategories[category].push(amenity);
        }
    });

    return amenityCategories;
}
