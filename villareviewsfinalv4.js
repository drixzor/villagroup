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

    // Create an array to store all reviews
    var allReviews = [];

    // Global variables to track the current state
    var showAllReviews = false;

    // Maximum number of reviews to show when in "Show All Reviews" state
    var maxReviewsToShow = 10;

    // Function to render the reviews
    function renderReviews() {
      var reviewsContainer = $(".reviews-container");
      reviewsContainer.empty();

      var endIndex = showAllReviews ? Math.min(maxReviewsToShow, allReviews.length) : 6;

      for (var i = 0; i < endIndex; i++) {
        var item = allReviews[i];

        // Create a div for each review
        var reviewContainer = $("<div>").addClass("review-container");

        var starWrapper = $("<div>").addClass("star-wrapper");
        var rating = Math.floor(item.rating);

        for (var j = 0; j < 5; j++) {
          var star = $("<div>").addClass("star");
          if (j < rating) {
            star.addClass("filled");
          }
          starWrapper.append(star);
        }

        var decodedReviewContent = he.decode(item.content);

        var reviewText = $("<div>").addClass("review-text").html(decodedReviewContent);
        var reviewName = $("<div>").addClass("review-name").text(item.guest);
        var reviewDate = $("<div>").addClass("review-date").text(item.date);

        // Append review content to the .review-container
        reviewContainer.append(starWrapper, reviewText, reviewName);

        // Append the .review-container to the reviews container
        reviewsContainer.append(reviewContainer);
      }
    }

    $.getJSON(apiUrl, function (data) {
      if (Array.isArray(data) && data.length > 0) {
        allReviews = data;

        // Show the initial set of reviews
        renderReviews();

        // Handle "Show More Reviews" button click
        $(".more-reviews").click(function () {
          // Toggle between showing all reviews and initial 6 reviews
          showAllReviews = !showAllReviews;

          // Render the reviews based on the current state
          renderReviews();

          // Update the button text based on the current state
          if (showAllReviews) {
            $(".more-reviews").text("Show Less Reviews");
          } else {
            $(".more-reviews").text("Show More Reviews");
          }
        });
      } else {
        $(".reviews-container").html("No reviews available.");
      }
    });
  } else {
    $(".reviews-container").html("Property not found.");
  }
});
