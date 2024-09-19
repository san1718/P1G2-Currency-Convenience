const API_ID = "7a0d8107c267491eb5c71b5745995c86";
const el = document.getElementById("currencies");

fetch(`https://openexchangerates.org/api/latest.json?app_id=${API_ID}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let htmlList = "";
    for (let key in data.rates) {
      let value = data.rates[key];
      htmlList += `<option value="${value}">${key}</option>`;
    }

    const fromCurrency = `
      <label>Select Currency(from)</label>
      <select name="fromCurrency" id="fromCurrency">
        ${htmlList}
      </select>`;

    const toCurrency = `
      <label>Select Currency(to)</label>
      <select name="toCurrency" id="toCurrency">
        ${htmlList}
      </select>`;

    el.innerHTML = fromCurrency + toCurrency;
  })
  .catch(error => {
    console.error('Error:', error);
  });
