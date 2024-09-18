const API_ID = "7a0d8107c267491eb5c71b5745995c86"
const  el= document.getElementById("currencies")

$.get('https://openexchangerates.org/api/latest.json', {app_id: API_ID}, function(data) {
    console.log(data);
    let htmlList=""
    for(let key in data.rates){
        let value = data.rates[key]
        htmlList+= `<option value="${value}">${key}</option>`
    }
    //console.log(htmlList)
    const fromCurrency = `
    <label>Select Currency(from)</label>
    <select name="fromCurrency" id="fromCurrency">
    ${htmlList}
    </select>
    `
    const tocurrency= `
    <label>Select Currency(to)</label>
    <select name="toCurrency" id="toCurrency">
    ${htmlList}
    </select>
    `
   // el.appendChild(fromCurrency)
    //el.appendChild(tocurrency)
    el.innerHTML   = fromCurrency + tocurrency
});
