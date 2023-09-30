$(document).ready(function() {
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
        var reviewsGrid = $(".swiper-wrapper");

        $.each(data, function (index, item) {
          if (displayedGuestNames.indexOf(item.guest) === -1) {
            displayedGuestNames.push(item.guest);

            var reviewContainer = $("<div>").addClass("swiper-slide"); // Use 'swiper-slide' class for Swiper

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

            reviewContainer.append(starWrapper, reviewText, reviewName);

            reviewsGrid.append(reviewContainer);
          }
        });

        // Initialize Swiper Slider
        var swiper = new Swiper(".swiper-container", {
          slidesPerView: 3,
          spaceBetween: 20,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          breakpoints: {
            768: {
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
