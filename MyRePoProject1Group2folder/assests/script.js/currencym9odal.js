document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("currencyModal");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.querySelector(".delete");
    const footerCloseBtn = document.getElementById("closeModalBtn");
    const form = document.getElementById("currencyForm");
    const result = document.getElementById("conversionResult");
  
    // Open the modal
    openModalBtn.onclick = function() {
      modal.classList.add("is-active");
    };
  
    // Close the modal
    closeModalBtn.onclick = function() {
      modal.classList.remove("is-active");
      result.textContent = '';  // Clear result when modal is closed
    };
  
    // Close the modal by footer button
    footerCloseBtn.onclick = function() {
      modal.classList.remove("is-active");
      result.textContent = '';  // Clear result when modal is closed
    };
  
    // Close the modal if the user clicks outside the modal content
    document.querySelector(".modal-background").onclick = function() {
      modal.classList.remove("is-active");
      result.textContent = '';  // Clear result when modal is closed
    };
  
    // Handle form submission and call API
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      
      const amount = document.getElementById("amount").value;
      const fromCurrency = document.getElementById("fromCurrency").value.toUpperCase();
      const toCurrency = document.getElementById("toCurrency").value.toUpperCase();
  
      // Replace with your actual API URL and key
      const apiKey = "YOUR_API_KEY";
      const apiURL = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
  
      // Fetch currency conversion rates
      fetch(apiURL)
        .then(response => response.json())
        .then(data => {
          const rate = data.rates[toCurrency];
          if (rate) {
            const convertedAmount = (amount * rate).toFixed(2);
            result.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
          } else {
            result.textContent = `Invalid currency: ${toCurrency}`;
          }
        })
        .catch(error => {
          result.textContent = "Error fetching conversion rate.";
          console.error("Error:", error);
        });
    });
  });