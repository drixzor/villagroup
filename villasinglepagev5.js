// Create a mapping object for amenity codes to descriptions
        const amenityMappings = {
  LOCATION_TYPE_RESORT: {
    description: "Resort Location",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/65098ffde22204f1e19bcc48_sunbed.png",
  },
  SPORTS_GOLF: {
    description: "Golf",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/65099045105ed7072362a672_golf-player.png",
  },
  ATTRACTIONS_HEALTH_BEAUTY_SPA: {
    description: "Health & Beauty Spa",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650990920049cf8832205272_spa.png",
  },
  LEISURE_HORSEBACK_RIDING: {
    description: "Horseback Riding",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650990f200f80ba3b7b4a5fa_horse-racing.png",
  },
  ATTRACTIONS_WATER_PARKS: {
    description: "Water Parks",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/65098da2ee29e6509a1cfedc_Asset%20201.png",
  },
  SPORTS_SWIMMING: {
    description: "Swimming",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/65098da27560cbe2509543e1_Asset%20204.png",
  },
  AMENITIES_HAIR_DRYER: {
    description: "Hair Dryer",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650990f200f80ba3b7b4a5fa_horse-racing.png",
  },
  AMENITIES_INTERNET: {
    description: "Internet",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/65098d1a37c76b9ec2c0ccd4_Asset%2010.png",
  },
  AMENITIES_AIR_CONDITIONING: {
    description: "Air Conditioning",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64cd06173345baa622eaa0ef_air-conditioning.png",
  },
  AMENITIES_IRON_BOARD: {
    description: "Iron & Ironing Board",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/6509919a2931ef73d6e5673c_iron.png",
  },
  KITCHEN_DINING_MICROWAVE: {
    description: "Microwave",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650991e6a779df4ce4a48613_microwave-oven.png",
  },
  KITCHEN_DINING_AREA: {
    description: "Dining Area",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/64d1079964df468032915be7_chair.png",
  },
  OUTDOOR_BALCONY: {
    description: "Balcony",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/6509921ad88267dff67dbc81_balcony.png",
  },
  AMENITIES_PARKING: {
    description: "Parking",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/6509931e0c7bf34d1aad17c6_parking.png",
  },
  OUTDOOR_DECK_PATIO_UNCOVERED: {
    description: "Uncovered Deck/Patio",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650993478925754a9e66587d_terrace.png",
  },
  POOL_SPA_HEATED_POOL: {
    description: "Heated Pool",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/65099380bddcd92ac308fe53_swimming-pool.png",
  },
  LOCATION_TYPE_OCEAN_VIEW: {
    description: "Ocean View",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650993b281077a19736c8503_sea.png",
  },
  LOCATION_TYPE_BEACH: {
    description: "Beach",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650993d92e3e5e4ef878e1fc_sun-umbrella.png",
  },
  LOCATION_TYPE_WATERFRONT: {
    description: "Waterfront",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/6509941039f1a60f559b424f_beach-house.png",
  },
  THEMES_FAMILY: {
    description: "Family House",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/6509943ccd8145aef354c62c_family.png",
  },
  SPORTS_SNORKELING: {
    description: "Snorkeling",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650994623f321d0d95933b42_diving-goggles.png",
  },
  SPORTS_CYCLING: {
    description: "Cycling",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/65099482f90a0523003817b9_bicycle.png",
  },
  SPORTS_SCUBA_OR_SNORKELING: {
    description: "Scuba or Snorkeling",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650994c2c45e969987e31c6f_oxygen-tank.png",
  },
  SPORTS_FISHING: {
    description: "Fishing",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650994e085513fa06c9920a2_fishing.png",
  },
  LEISURE_WATER_SPORTS: {
    description: "Water Sports",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650995632b7c2de84ecf5d45_kayak.png",
  },
  AMENITIES_FIREPLACE: {
    description: "Fireplace",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650995827560cbe2509e3448_fireplace.png",
  },
  POOL_SPA_SAUNA: {
    description: "Pool & Spa (Sauna)",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650995b461ed58c3db75fd57_steam-room.png",
  },
  KITCHEN_DINING_REFRIGERATOR: {
    description: "Refrigerator",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650995d3f54c3602dc23a9ec_refrigerator.png",
  },
  KITCHEN_DINING_DISHWASHER: {
    description: "Dishwasher",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650995feb58c77281288d5fa_dishwasher.png",
  },
  KITCHEN_DINING_HIGHCHAIR: {
    description: "Highchair",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/65099627f90a05230039f7c8_baby-chair.png",
  },
  KITCHEN_DINING_ROOM: {
    description: "Kitchen",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/6509964e0ba4c9cac5679d09_kitchen.png",
  },
  ENTERTAINMENT_BOOKS: {
    description: "Books",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650996717b13f83b01866bee_stack-of-books.png",
  },
  ENTERTAINMENT_DVD: {
    description: "DVD",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/6509969ae5079bce2b79aaf3_dvd-player.png",
  },
  ENTERTAINMENT_STEREO: {
    description: "Stereo",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650996c06a050a1f22a3eaa0_stereo.png",
  },
  OUTDOOR_GARDEN: {
    description: "Outdoor Garden",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650996ef72d10e33e4bd41d0_terrace%20(1).png",
  },
  POOL_SPA_PRIVATE_POOL: {
    description: "Private Pool & Spa",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/6509972620073363a221ea15_pool.png",
  },
  LOCATION_TYPE_BEACH_FRONT: {
    description: "Beach Front",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650993b281077a19736c8503_sea.png",
  },
  ACCOMMODATIONS_OTHER_SERVICES_CONCIERGE: {
    description: "Concierge",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/65099963f993a66b544bfe7c_concierge%20(1).png",
  },
  LOCATION_TYPE_MOUNTAIN: {
    description: "Mountain View",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/6509993057ee810c89b59f41_mountain.png",
  },
  LOCATION_TYPE_VILLAGE: {
    description: "Village View",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650999118444bf6caf88b95e_farming.png",
  },
  SPORTS_MOUNTAIN_BIKING: {
    description: "Mountain Biking",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650998eb624d9cee88e328d2_mountain-cycling.png",
  },
  ATTRACTIONS_MUSEUMS: {
    description: "Museums",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650998bf624d9cee88e2ffa0_museum-art.png",
  },
  ENTERTAINMENT_POOL_TABLE: {
    description: "Pool Table",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/65099893ab9ceeaabfd8ca18_billiards.png",
  },
  ENTERTAINMENT_GAMES: {
    description: "Games",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/6509987aa6667fcf72d025e1_console.png",
  },
  AMENITIES_GARAGE: {
    description: "Garage",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/6509985e2c1f444dfea1dacf_smart-garage.png",
  },
  AMENITIES_DRYER: {
    description: "Dryer",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650991135d491452201fb127_hairdryer.png",
  },
  ENTERTAINMENT_PING_PONG_TABLE: {
    description: "Ping Pong Table",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650998272c1d3bf11f59b5a4_table-tennis.png",
  },
  ENTERTAINMENT_VIDEO_LIBRARY: {
    description: "Video Library",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/65099804e951a9e4a5a00391_video-library.png",
  },
  AMENITIES_HEATING: {
    description: "Heating",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650997e98640b596bb2aaf8c_heating.png",
  },
  LEISURE_SHOPPING: {
    description: "Shopping",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650997cb1ab3e09d9af17caf_online-shopping.png",
  },
  AMENITIES_FITNESS_ROOM: {
    description: "Fitness Room",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650997aeed4b09c75afc9c16_stationary-bike.png",
  },
  LOCATION_TYPE_DOWNTOWN: {
    description: "Downtown Location",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/6509978d811bf79de298f3a8_skyscrapers.png",
  },
  LOCATION_TYPE_RURAL: {
    description: "Rural Location",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/6509976be1fc560052265132_agricultural.png",
  },
  KITCHEN_DINING_ICE_MAKER: {
    description: "Ice Maker",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/65099743a6667fcf72ced0dd_ice.png",
  },
  SPORTS_SAILING: {
    description: "Sailing",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/65099b36f977efe1c9d95659_boat.png",
  },
  SPORTS_SAILING: {
    description: "Sailing",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/65099b36f977efe1c9d95659_boat.png",
  }, 
  THEMES_HISTORIC: {
    description: "Historic Location",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/65099b94811bf79de29ea221_arch.png",
  }, 
  AMENITIES_ELEVATOR: {
    description: "Elevator",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/65099bdedc91670e655c9d09_elevator.png",
  }, 
  POOL_SPA_HOT_TUB: {
    description: "Hot Tub",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/65099c1af993a66b544fd4ba_hot-tub.png",
  },
  LOCATION_TYPE_GOLF_COURSE_VIEW: {
    description: "Golf Course View",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650ae0c7cc1ec46b2541fc76_golf-course.png",
  },
  ACCOMMODATIONS_HOUSE_CLEANING_INCLUDED: {
    description: "House Cleaning Included",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650ae14e9022ce4cf5c11535_cleaning-products.png",
  },
   SUITABILITY_ACCESSIBILITY_WHEELCHAIR_ACCESSIBLE: {
    description: "Wheelchair Accessible",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/650ae1a02fa3a33d36883d79_disabled-person.png",
  },
  THEMES_ROMANTIC: {
    description: "Wedding Villa",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/651fb3c5dc3b882cea12edb2_wedding-location.png",
  },
  ENTERTAINMENT_FOOSBALL: {
    description: "Table Football",
    imageUrl: "https://uploads-ssl.webflow.com/64c37e33e743d0c2d6b3fead/651fb44213c0ebcf4cfe25bf_table-soccer.png",
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
        bathrooms,
        propertyType,
        min_price_eur,
        pricenotes,
        cover,
        region,
        accommodationsSummary
    } = property;

    // Populate HTML elements
document.querySelector(".villa-id").textContent = `Villa ${id}`;
document.querySelector(".property-id").textContent = `Villa ${propertyId}`;
document.querySelector(".status").textContent = `Status: ${status}`;
document.querySelector(".guest-number").textContent = `Up to ${maximumOccupancyGuests} Guests`;
document.querySelector(".bed-number").textContent = `${bedrooms} Bedrooms`;
document.querySelector(".bath-number").textContent = `${bathrooms} Bathrooms`;
document.querySelector(".address-line").textContent = `Address Line: ${addressLine}`;
document.querySelector(".country").textContent = `Country: ${country}`;
document.querySelector(".post-code").textContent = `Post Code: ${postCode}`;
document.querySelector(".name").textContent = `${name}`;
document.querySelector(".accepted-payment-forms").textContent = `Accepted Payment Forms: ${acceptedPaymentForms}`;
document.querySelector(".cancellation-policy").textContent = `Cancellation Policy: ${cancellationPolicy}`;
document.querySelector(".check-in-times").textContent = `Check-in Time: ${checkInTime}`;
document.querySelector(".check-out-time").textContent = `Check-out Time: ${checkOutTime}`;
document.querySelector(".children-allowed").textContent = `Children Allowed: ${childrenAllowed}`;
document.querySelector(".maximum-occupancy-adults").textContent = `Maximum Occupancy Adults: ${maximumOccupancyAdults}`;
document.querySelector(".maximum-occupancy-children").textContent = `Maximum Occupancy Children: ${maximumOccupancyChildren}`;
document.querySelector(".pets-allowed").textContent = `Pets Allowed: ${petsAllowed}`;
document.querySelector(".smoking-allowed").textContent = `Smoking Allowed: ${smokingAllowed}`;
document.querySelector(".subcaption").textContent = `Subcaption: ${subcaption}`;
document.querySelector(".villa-description").innerHTML = `${accommodationsSummary}`;
document.querySelector(".about-text").innerHTML = `${accommodationsSummary}`;
document.querySelector(".changeover").textContent = `Changeover: ${changeover}`;
document.querySelector(".min-price").textContent = `${min_price_eur}`;
document.querySelector(".villa-location").textContent = `${region}`;
document.querySelector(".price-notes").innerHTML = `${pricenotes}`;
document.querySelector(".images").textContent = `Images: ${images}`;
document.querySelector(".cover").style.backgroundImage = `url(${cover})`;
console.log('test', property);

// Handle the "villa-city" elements
document.querySelectorAll(".villa-city").forEach(element => {
  if (element.textContent.trim() === 'CY') {
    element.textContent = 'Cyprus';
  } else {
    const [country, city, region] = element.textContent.split(', ');
    element.textContent = `${country}, ${city}, ${region}`;
  }
});
     // Round up the min_price value to the nearest whole number
    const roundedMinPrice = Math.ceil(min_price_eur);

    // Set the text for min-price with the rounded value
    document.querySelector(".min-price").textContent = `€${roundedMinPrice}`;    

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

    const galleryGrid = document.querySelector('.gallery-grid');

    // Check if imagesArray has at least 4 images
    if (imagesArray.length >= 4) {
        for (let i = 0; i < 4; i++) {
            const imageElement = document.createElement('img');
            imageElement.className = 'gallery-image';
            imageElement.src = imagesArray[i];
            galleryGrid.appendChild(imageElement);
        }
    } else {
        console.log('Not enough images available for the gallery.');
    }
}
