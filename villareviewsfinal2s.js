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

  // If propertyId is found, fetch and display reviews
  if (!isNaN(propertyId)) {
    var apiUrl = "https://spapi.weboscy.com/testimonial?id=" + propertyId;

    $.getJSON(apiUrl, function(data) {
      // Check if data is an array
      if (Array.isArray(data) && data.length > 0) {
        // Create a container for the reviews slider
        var reviewsSlider = $(".reviews-slider");

        // Create an empty array to store review containers
        var reviewContainers = [];
        var displayedGuestNames = []; // Initialize the array

        // Iterate through the JSON data
        $.each(data, function(index, item) {
          // Check if this review has a guest name that hasn't been displayed yet
          if (displayedGuestNames.indexOf(item.guest) === -1) {
            // Add the guest name to the list of displayed names
            displayedGuestNames.push(item.guest);

            // Create a review container for each review
            var reviewContainer = $("<div>").addClass("review-container");

            // Create a star wrapper for the star rating
            var starWrapper = $("<div>").addClass("star-wrapper");

            // Calculate the integer part of the rating (e.g., 4 for 4.5 stars)
            var rating = Math.floor(item.rating);

            // Create star div blocks based on the rating
            for (var i = 0; i < 5; i++) {
              var star = $("<div>").addClass("star");
              if (i < rating) {
                star.addClass("filled");
              }
              starWrapper.append(star);
            }

            // Decode HTML entities in the review content
            var decodedReviewContent = he.decode(item.content);

            // Create review text and review name elements
            var reviewText = $("<div>").addClass("review-text").html(decodedReviewContent);
            var reviewName = $("<div>").addClass("review-name").text(item.guest);

            // Append star wrapper, review text, and review name to the review container
            reviewContainer.append(starWrapper, reviewText, reviewName);

            // Add the review container to the array
            reviewContainers.push(reviewContainer);
          }
        });

        // Divide the review containers into groups of 4
        var groupsOfFour = [];
        while (reviewContainers.length > 0) {
          groupsOfFour.push(reviewContainers.splice(0, 4));
        }

        // Create a slider for each group of 4 reviews
        $.each(groupsOfFour, function(index, group) {
          var slide = $("<div>").addClass("slide");
          slide.append(group);
          reviewsSlider.append(slide);
        });

        // Initialize Slick Slider
        reviewsSlider.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true, // Add navigation dots if needed
          autoplay: true, // Auto-play the slider
          autoplaySpeed: 5000 // Set the auto-play speed (milliseconds)
        });
      } else {
        // Handle the case where data is not an array or is empty (no reviews to display)
        $(".reviews-slider").html("No reviews available.");
      }
    });
  } else {
    // Handle the case where propertyId is not found
    $(".reviews-slider").html("Property not found.");
  }
});
