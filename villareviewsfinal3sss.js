$(document).ready(function () {
  // Function to get URL parameter by name
  function getUrlParameter(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  // Extract the dynamic ID from the URL and parse it as an integer
  var propertyId = parseInt(getUrlParameter('id'));
  if (propertyId !== null) {
    var apiUrl = "https://spapi.weboscy.com/testimonial?id=" + propertyId;

    // Create an array to store displayed guest names
    var displayedGuestNames = [];

    $.getJSON(apiUrl, function (data) {
      if (Array.isArray(data) && data.length > 0) {
        // Get the Swiper container
        var reviewsGrid = $(".swiper-wrapper");

        $.each(data, function (index, item) {
          if (displayedGuestNames.indexOf(item.guest) === -1) {
            displayedGuestNames.push(item.guest);

            // Create a .review-container for each review
            var reviewContainer = $("<div>").addClass("swiper-slide review-container");

            var starWrapper = $("<div>").addClass("star-wrapper");
            var rating = Math.floor(item.rating);

            for (var i = 0; i < 5; i++) {
              var star = $("<div>").addClass("star");
              if (i < rating) {
                star.addClass("filled");
              }
              starWrapper.append(star);
            }

            var decodedReviewContent = he.decode(item.content);

            var reviewText = $("<div>").addClass("review-text").html(decodedReviewContent);
            var reviewName = $("<div>").addClass("review-name").text(item.guest);

            // Append review content to the .review-container
            reviewContainer.append(starWrapper, reviewText, reviewName);

            // Append the .review-container to the Swiper container
            reviewsGrid.append(reviewContainer);
          }
        });

        // Initialize Swiper Slider
        var swiper = new Swiper(".swiper-container", {
          slidesPerView: 3,
          spaceBetween: 20,
          
          // Optional navigation buttons
          navigation: {
            nextEl: ".swiper-button-next1",
            prevEl: ".swiper-button-prev1",
          },
          
          breakpoints: {
            76: {
              slidesPerView: 1,
            },
          },
        });
      } else {
        $(".swiper-container").html("No reviews available.");
      }
    });
  } else {
    $(".swiper-container").html("Property not found.");
  }
});
