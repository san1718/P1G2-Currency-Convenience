const API_ID = "7a0d8107c267491eb5c71b5745995c86"
const  el= document.getElementById("currencies")
const fromel=document.getElementById ("user-entry")
const finalamount=document.getElementById("finalAmount")

$.get('https://openexchangerates.org/api/latest.json', {app_id: API_ID}, function(data) {
    console.log(data);
    $.get('https://openexchangerates.org/api/currencies.json', function(countrydata) {
        console.log(countrydata);
    
    let fromHtmlList=document.createElement("select")
    fromHtmlList.setAttribute("id","fromCurrency")
    fromHtmlList.classList.add("input")
    let toHtmlList=document.createElement("select")
    toHtmlList.setAttribute("id","toCurrency")
    toHtmlList.classList.add("input")
    for(let key in data.rates){
        let value = data.rates[key]
        let country = countrydata[key]
        let optionEl = document.createElement("option")
        optionEl.setAttribute("value",value)
        optionEl.textContent = country + ": "+key
        let optionElement = document.createElement("option")
        optionElement.setAttribute("value",value)
        optionElement.textContent = country + ": "+key
        toHtmlList.appendChild(optionElement)
        fromHtmlList.appendChild(optionEl)
    }
    let fromlabel=document.createElement("label")
    fromlabel.classList.add("label")
    fromlabel.textContent=" Current Currency"
    el.appendChild(fromlabel)

     el.appendChild(fromHtmlList)
     let tolabel=document.createElement("label")
     fromlabel.classList.add("label")
    tolabel.textContent="Exchange Currency"
    el.appendChild(tolabel)
    el.appendChild(toHtmlList)
});
});

fromel.addEventListener("submit",function(event)
{
    event.preventDefault()
    var amount=document.getElementById("amount").value
    var fromcurrency=document.getElementById("fromCurrency").value
    var tocurrency=document.getElementById("toCurrency").value 
    //var toCurrencysign = document.getElementById("toCurrency").textContent
    var fromCurrencyInUSDollars = (amount / fromcurrency)
    var toCurrencySign = document.getElementById("toCurrency").textContent

    var toCurrencyAmount = fromCurrencyInUSDollars * tocurrency
    console.log(amount,fromcurrency,tocurrency)
    finalamount.textContent = "Converted currency: "+ toCurrencyAmount.toFixed(2) 

})
