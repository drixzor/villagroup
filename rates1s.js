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

  // Function to convert GBP to EUR
  function convertToEUR(gbpAmount, exchangeRate) {
    return gbpAmount * exchangeRate;
  }

  // Function to format a number to always have two decimal places
  function formatNumberToTwoDecimals(number) {
    return parseFloat(number).toFixed(2);
  }

  // Extract the dynamic ID from the URL and parse it as an integer
  var dynamicId = parseInt(getUrlParameter('id'));

  // If dynamicId is found, fetch and display rental rates
  if (!isNaN(dynamicId)) {
    var apiUrl = "https://spapi.weboscy.com/rates?id=" + dynamicId;

    // Fetch the exchange rate from GBP to EUR from an API
    var exchangeRateUrl = "https://api.exchangerate-api.com/v4/latest/GBP"; // Replace with a real API URL
    $.getJSON(exchangeRateUrl, function(exchangeData) {
      // Check if exchangeData contains the exchange rate
      if (exchangeData && exchangeData.rates && exchangeData.rates.EUR) {
        var exchangeRate = exchangeData.rates.EUR;

        // Fetch rental rates
        $.getJSON(apiUrl, function(data) {
          if (Array.isArray(data)) {
            // Iterate through the JSON data
            $.each(data, function(index, item) {
              // Create a rental rate block for each item
              var rentalRateBlock = $("<div>").addClass("rental-rate-block");
              var rentalRate = $("<div>").addClass("rental-rate");

              // Convert GBP rate to EUR and format to two decimal places
              var eurRate = convertToEUR(item.week, exchangeRate);
              var formattedEURRate = formatNumberToTwoDecimals(eurRate);

              // Set the text for rental-rate based on JSON data (daterange and week) in EUR
              rentalRate.text(item.daterange + ": €" + formattedEURRate + "/week");

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
      } else {
        // Handle the case where exchange rate data is missing
        $(".rental-rates-grid").html("Unable to fetch exchange rate data.");
      }
    });
  } else {
    // Handle the case where dynamicId is not found
    $(".rental-rates-grid").html("Property not found.");
  }
});
