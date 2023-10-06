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
      var rentalRate = $("<div>").addClass("rental-rate");

      // Set the text for rental-rate based on JSON data (daterange) in EUR
      rentalRate.text(item.daterange + ": €" + item.eur);

      // Append rentalRate to rentalRateBlock
      rentalRateBlock.append(rentalRate);

      // Append rentalRateBlock to .rental-rates-grid
      $(".rental-rates-grid").append(rentalRateBlock);
    });
  } else {
    // Handle the case where data is not an array (no blocks to display)
    $(".rental-rates-grid").html("No rental rates available.");
  }
});
