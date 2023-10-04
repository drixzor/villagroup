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

  // Function to convert GBP to EUR and round down to the nearest whole number
  function convertToEUR(gbpAmount, exchangeRate) {
    return Math.floor(gbpAmount * exchangeRate);
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
    var exchangeRateUrl = "https://api.exchangeratesapi.io/latest?base=GBP"; // Free exchange rate API URL

    // Fetch rental rates and exchange rate data concurrently
    $.when(
      $.getJSON(apiUrl),
      $.getJSON(exchangeRateUrl)
    ).done(function(rentalData, exchangeData) {
      var rentalRates = rentalData[0];
      var exchangeRateData = exchangeData[0];

      // Check if exchangeData contains the exchange rate
      if (exchangeRateData && exchangeRateData.rates && exchangeRateData.rates.EUR) {
        var exchangeRate = exchangeRateData.rates.EUR;

        // Iterate through the JSON data and display converted EUR values
        if (Array.isArray(rentalRates)) {
          $.each(rentalRates, function(index, item) {
            var rentalRateBlock = $("<div>").addClass("rental-rate-block");
            var rentalRate = $("<div>").addClass("rental-rate");

            var eurRate = convertToEUR(item.week, exchangeRate);
            rentalRate.text(item.daterange + ": €" + eurRate + ".00/week");

            rentalRateBlock.append(rentalRate);
            $(".rental-rates-grid").append(rentalRateBlock);
          });
        } else {
          // Handle the case where data is not an array (no blocks to display)
          $(".rental-rates-grid").html("No rental rates available.");
        }
      } else {
        // Handle the case where exchange rate data is missing or API is unavailable
        if (Array.isArray(rentalRates)) {
          // Display the rental rates in GBP without conversion
          $.each(rentalRates, function(index, item) {
            var rentalRateBlock = $("<div>").addClass("rental-rate-block");
            var rentalRate = $("<div>").addClass("rental-rate");

            rentalRate.text(item.daterange + ": £" + item.week + "/week");

            rentalRateBlock.append(rentalRate);
            $(".rental-rates-grid").append(rentalRateBlock);
          });
        } else {
          // Handle the case where data is not an array (no blocks to display)
          $(".rental-rates-grid").html("No rental rates available.");
        }
      }
    }).fail(function() {
      // Handle the case where either API request fails
      $(".rental-rates-grid").html("Unable to fetch data. Showing rates in GBP.");
    });
  } else {
    // Handle the case where dynamicId is not found
    $(".rental-rates-grid").html("Property not found.");
  }
});
