$(document).ready(function () {
  function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);

    // Iterate through all the query parameters
    for (const param of urlParams) {
      if (param[0].endsWith(name)) {
        return param[1]; // Return the value of the parameter
      }
    }

    return null; // Return null if the parameter is not found
  }

  var propertyId = parseInt(getUrlParameter('id'));
  if (!isNaN(propertyId)) {
    var apiUrl = "https://spapi.weboscy.com/testimonial?id=" + propertyId;

    var allReviews = [];
    var showAllReviews = false;
    var initialReviewsToShow = 6;

    function renderReviews() {
      var reviewsContainer = $(".reviews-container");
      reviewsContainer.empty();

      var endIndex = showAllReviews ? allReviews.length : initialReviewsToShow;

      for (var i = 0; i < endIndex && i < allReviews.length; i++) {
        var item = allReviews[i];

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

        reviewContainer.append(starWrapper, reviewText, reviewName, reviewDate);
        reviewsContainer.append(reviewContainer);
      }

      $(".review-number").text(allReviews.length); // Update review count here

      // Hide the more-reviews element if there are no more than 6 reviews
      if (allReviews.length <= initialReviewsToShow) {
        $(".more-reviews").hide();
      } else {
        $(".more-reviews").show();
      }
    }

    function updateShowMoreText() {
      if (showAllReviews) {
        $(".more-reviews").text("Show Less Reviews");
      } else {
        $(".more-reviews").text("Show More Reviews");
      }
    }

    $.getJSON(apiUrl, function (data) {
      if (Array.isArray(data) && data.length > 0) {
        allReviews = data;
        renderReviews();
        updateShowMoreText();

        $(".more-reviews").click(function () {
          showAllReviews = !showAllReviews;
          renderReviews();
          updateShowMoreText();
        });
      } else {
        $(".reviews-container").html("No reviews available.");
        $(".review-number").text("0"); // Update review count when no reviews are available
        $(".more-reviews").hide(); // Hide the more-reviews element when no reviews are available
      }
    });

  } else {
    $(".reviews-container").html("Property not found.");
    $(".review-number").text("0");
    $(".more-reviews").hide(); // Hide the more-reviews element when the property is not found
  }
});
