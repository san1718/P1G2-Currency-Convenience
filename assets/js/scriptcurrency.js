const API_ID = "7a0d8107c267491eb5c71b5745995c86"
const  el= document.getElementById("currencies")
const fromel=document.getElementById ("user-entry")
const finalamount=document.getElementById("finalAmount")

$.get('https://openexchangerates.org/api/latest.json', {app_id: API_ID}, function(data) {
    console.log(data);
    let fromHtmlList=document.createElement("select")
    fromHtmlList.setAttribute("id","fromCurrency")
    let toHtmlList=document.createElement("select")
    toHtmlList.setAttribute("id","toCurrency")
    for(let key in data.rates){
        let value = data.rates[key]
        let optionEl = document.createElement("option")
        optionEl.setAttribute("value",value)
        optionEl.textContent = key
        let optionElement = document.createElement("option")
        optionElement.setAttribute("value",value)
        optionElement.textContent = key
        toHtmlList.appendChild(optionElement)
        fromHtmlList.appendChild(optionEl)
    }
    let fromlabel=document.createElement("label")
    fromlabel.textContent="current_currency"
    el.appendChild(fromlabel)

     el.appendChild(fromHtmlList)
     let tolabel=document.createElement("label")
    tolabel.textContent="exchange_currency"
    el.appendChild(tolabel)
    el.appendChild(toHtmlList)
    
});

fromel.addEventListener("submit",function(event){
    event.preventDefault()
    var amount=document.getElementById("amount").value
    var fromcurrency=document.getElementById("fromCurrency").value
    var tocurrency=document.getElementById("toCurrency").value 
    var fromCurrencyInUSDollars = (amount / fromcurrency)
    var toCurrencySign = document.getElementById("toCurrency").textContent

    var toCurrencyAmount = fromCurrencyInUSDollars * tocurrency
    console.log(amount,fromcurrency,tocurrency)
    finalamount.textContent = toCurrencyAmount.toFixed(2)


})