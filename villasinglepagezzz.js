// Create a mapping object for amenity codes to descriptions
        const amenityMappings = {
    LOCATION_TYPE_RESORT: {
        description: "Resort Location",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    SPORTS_GOLF: {
        description: "Golf",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    ATTRACTIONS_HEALTH_BEAUTY_SPA: {
        description: "Health & Beauty Spa",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    LEISURE_HORSEBACK_RIDING: {
        description: "Horseback Riding",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    ATTRACTIONS_WATER_PARKS: {
        description: "Water Parks",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    SPORTS_SWIMMING: {
        description: "Swimming",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    AMENITIES_HAIR_DRYER: {
        description: "Hair Dryer",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    AMENITIES_INTERNET: {
        description: "Internet",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    AMENITIES_AIR_CONDITIONING: {
        description: "Air Conditioning",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    AMENITIES_IRON_BOARD: {
        description: "Iron & Ironing Board",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    KITCHEN_DINING_MICROWAVE: {
        description: "Microwave",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    KITCHEN_DINING_AREA: {
        description: "Dining Area",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    OUTDOOR_BALCONY: {
        description: "Balcony",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    AMENITIES_PARKING: {
        description: "Parking",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    OUTDOOR_DECK_PATIO_UNCOVERED: {
        description: "Uncovered Deck/Patio",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    POOL_SPA_HEATED_POOL: {
        description: "Heated Pool",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    LOCATION_TYPE_OCEAN_VIEW: {
        description: "Ocean View",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    LOCATION_TYPE_BEACH: {
        description: "Beach",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    LOCATION_TYPE_WATERFRONT: {
        description: "Waterfront",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    THEMES_FAMILY: {
        description: "Family Themes",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    SPORTS_SNORKELING: {
        description: "Snorkeling",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    SPORTS_CYCLING: {
        description: "Cycling",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    SPORTS_SCUBA_OR_SNORKELING: {
        description: "Scuba or Snorkeling",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    SPORTS_FISHING: {
        description: "Fishing",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    LOCATION_TYPE_MOUNTAIN: {
        description: "Mountain",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    LOCATION_TYPE_VILLAGE: {
        description: "Village",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    SPORTS_MOUNTAIN_BIKING: {
        description: "Mountain Biking",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    ATTRACTIONS_MUSEUMS: {
        description: "Museums",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    KITCHEN_DINING_ROOM: {
        description: "Room (Kitchen & Dining)",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    ENTERTAINMENT_POOL_TABLE: {
        description: "Pool Table (Entertainment)",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    ENTERTAINMENT_GAMES: {
        description: "Games (Entertainment)",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    AMENITIES_GARAGE: {
        description: "Garage",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    AMENITIES_DRYER: {
        description: "Dryer",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    ENTERTAINMENT_PING_PONG_TABLE: {
        description: "Ping Pong Table (Entertainment)",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    ACCOMMODATIONS_HOUSE_CLEANING_INCLUDED: {
        description: "House Cleaning Included",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    ENTERTAINMENT_VIDEO_LIBRARY: {
        description: "Video Library (Entertainment)",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    AMENITIES_HEATING: {
        description: "Heating",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
    LEISURE_SHOPPING: {
        description: "Shopping",
        imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cb9ffea725b757be79bb87_oven.png",
    },
};

        // Function to convert amenity codes to text descriptions
        function convertAmenitiesToString(amenities) {
            if (!amenities) {
                return "No amenities available"; // Handle the case when amenities are null or undefined
            }
            const amenityCodes = amenities.split(',').map(code => code.trim());
            const amenityDescriptions = amenityCodes.map(code => amenityMappings[code] ? amenityMappings[code].description : code); // Use the mapping or the code itself if not found
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
                // Split the amenities string into an array using commas as the delimiter
                const amenityCodes = amenities.split(',').map(amenity => amenity.trim());

                // Map amenity codes to descriptions and images using the amenityMappings object
                const amenityDetails = amenityCodes.map(code => {
                    const amenityMapping = amenityMappings[code];
                    return {
                        description: amenityMapping ? amenityMapping.description : code,
                        imageUrl: amenityMapping ? amenityMapping.imageUrl : "",
                    };
                });

                // Get the element with the class .amenities
                const amenitiesContainer = document.querySelector('.amenities');

                // Create an unordered list element
                const amenitiesList = document.createElement('ul');

                // Loop through the amenity details and create list items with images
                amenityDetails.forEach((detail) => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `<img src="${detail.imageUrl}" alt="${detail.description}" /> ${detail.description}`;
                    amenitiesList.appendChild(listItem);

                    // Add the amenity-block class to the list item
                    listItem.classList.add('amenity-block');
                });

                // Append the list to the .amenities container
                amenitiesContainer.appendChild(amenitiesList);
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
