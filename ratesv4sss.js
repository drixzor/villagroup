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
  var dynamicId = parseInt(getUrlParameter('id'));

  // If dynamicId is found, fetch and display rental rates
  if (!isNaN(dynamicId)) {
    var apiUrl = "https://spapi.weboscy.com/rates?id=" + dynamicId;

    // Fetch rental rates
    $.getJSON(apiUrl, function(data) {
      if (Array.isArray(data)) {
        // Iterate through the JSON data
        $.each(data, function(index, item) {
          // Create a rental rate block for each item
          var rentalRateBlock = $("<div>").addClass("rental-rate-block");
          var dateRate = $("<div>").addClass("date-rate");
          var rentalRate = $("<div>").addClass("rental-rate");
          var week = $("<div>").addClass("week");

          // Remove cents and display only the whole number part with commas
          var priceWithoutCents = item.gbp.split(".")[0]; // Get the whole number part

          // Use toLocaleString() to add commas as thousands separators
          priceWithoutCents = parseInt(priceWithoutCents).toLocaleString();

          // Set the text for dateRate, rentalRate, and week based on JSON data
          dateRate.text(item.daterange);
          rentalRate.text("£" + priceWithoutCents);
          week.text("/wk");

          // Append dateRate, rentalRate, and week to rentalRateBlock
          rentalRateBlock.append(dateRate);
          rentalRateBlock.append(rentalRate);
          rentalRateBlock.append(week);

          // Append rentalRateBlock to .rental-rates-grid
          $(".rental-rates-grid").append(rentalRateBlock);
        });
      } else {
        // Handle the case where data is not an array (no blocks to display)
        $(".rental-rates-grid").html("No rental rates available.");
      }
    });
  } else {
    // Handle the case where dynamicId is not found
    $(".rental-rates-grid").html("Property not found.");
  }
});
