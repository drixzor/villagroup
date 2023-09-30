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

  // Declare the moreReviewsDisplayed variable here
  var moreReviewsDisplayed = false; // Initialize it as false

  // Declare the reviewsGrid variable here
  var reviewsGrid = $(".reviews-grid");

  // If propertyId is found, fetch and display reviews
  if (!isNaN(propertyId)) {
    var apiUrl = "https://spapi.weboscy.com/testimonial?id=" + propertyId;

    // Create an array to store displayed guest names
    var displayedGuestNames = [];

    // Variable to keep track of the number of reviews displayed
    var displayedReviewCount = 0;

    // Function to display additional reviews
    function displayAdditionalReviews(data) {
      // Determine the number of reviews to display in this batch (e.g., 4)
      var batchSize = 4;

      // Calculate the index of the last review to display
      var endIndex = displayedReviewCount + batchSize;

      // Iterate through the JSON data
      for (var i = displayedReviewCount; i < endIndex && i < data.length; i++) {
        var item = data[i];

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
          for (var j = 0; j < 5; j++) {
            var star = $("<div>").addClass("star");
            if (j < rating) {
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

          // Append the review container to the reviews grid
          reviewsGrid.append(reviewContainer);
        }
      }

      // Update the number of displayed reviews
      displayedReviewCount = endIndex;

      // Check if all reviews have been displayed
      if (displayedReviewCount >= data.length) {
        // Hide the "Show More Reviews" button
        $(".more-reviews").hide();
      }
    }

    // Initial fetch of reviews data
    $.getJSON(apiUrl, function (data) {
      // Check if data is an array
      if (Array.isArray(data) && data.length > 0) {
        // Your existing button element
        var showMoreButton = $(".more-reviews");

        // Handle the existing "Show More Reviews" button click event
        showMoreButton.on("click", function () {
          // Toggle between displaying more and fewer reviews
          if (moreReviewsDisplayed) {
            // Display fewer reviews (reset to 4)
            reviewsGrid.empty();
            displayedReviewCount = 0;
            displayAdditionalReviews(data);
            showMoreButton.text("Show More Reviews");
          } else {
            // Display more reviews
            displayAdditionalReviews(data);
            showMoreButton.text("Show Less Reviews");
          }

          // Update the toggle state
          moreReviewsDisplayed = !moreReviewsDisplayed;
        });

        // Initial display of reviews (display first batch)
        displayAdditionalReviews(data);
      } else {
        // Handle the case where data is not an array or is empty (no reviews to display)
        reviewsGrid.html("No reviews available.");
        // Hide the "Show More Reviews" button as there are no reviews
        $(".more-reviews").hide();
      }
    });
  } else {
    // Handle the case where propertyId is not found or is not a valid number
    reviewsGrid.html("Property not found or invalid ID.");
    // Hide the "Show More Reviews" button if there is an issue
    $(".more-reviews").hide();
  }
});
