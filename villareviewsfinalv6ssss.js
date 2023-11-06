$(document).ready(function () {
  function getUrlParameter(name) {
    var url = new URL(window.location.href);
    return url.searchParams.get(name);
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
      }
    });

  } else {
    $(".reviews-container").html("Property not found.");
    $(".review-number").text("0");
  }
});
