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

    // Function to render the reviews
    function renderReviews(reviewsToShow) {
      var reviewsContainer = $(".reviews-container");
      reviewsContainer.empty();

      for (var i = 0; i < reviewsToShow; i++) {
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

        // Append review content to the .review-container
        reviewContainer.append(starWrapper, reviewText, reviewName);

        // Append the .review-container to the reviews container
        reviewsContainer.append(reviewContainer);
      }
    }

    $.getJSON(apiUrl, function (data) {
      if (Array.isArray(data) && data.length > 0) {
        allReviews = data;

        // Show the first 6 reviews initially
        renderReviews(6);

        // Handle "Show More Reviews" button click
        $(".more-reviews").click(function () {
          // Show the next 6 reviews or remaining reviews
          var startIndex = $(".review-container").length;
          var endIndex = startIndex + 6;

          if (endIndex < allReviews.length) {
            renderReviews(endIndex);
          } else {
            renderReviews(allReviews.length);
            $(".more-reviews").hide(); // Hide the button when all reviews are shown
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
