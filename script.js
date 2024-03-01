const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const countryOptions = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const from =  document.querySelector(".from select");
const to =  document.querySelector(".to select");
const msg = document.querySelector(".msg");
//change options
for (select of countryOptions) {
  for (currencyCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currencyCode;
    newOption.value = currencyCode;
    if (select.name === "from" && currencyCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currencyCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
//change flags
const updateFlag = (element) => {
  let currencyCode = element.value;
  // console.log(currencyCode);
  let countryCode = countryList[currencyCode];
  // console.log(countryCode);
  let newSrcLink = `https://flagsapi.com/${countryCode}/shiny/64.png`;
  let flagImg = element.parentElement.querySelector("img");
  flagImg.src = newSrcLink;
};


btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  updateExchangeRate();
  });

//backend using api
const updateExchangeRate = async ()=>{
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if (amountValue === "" || amountValue < 1) {
      alert("Enter a valid Amount!!");
      amount.value = 1;
      amountValue = 1;
    };
    let fromCurrencyCode = from.value;
    let toCurrencyCode = to.value;
    const API = `${BASE_URL}/${fromCurrencyCode.toLowerCase()}/${toCurrencyCode.toLowerCase()}.json`
  
    //fetching API
    let response = await fetch(API);
    let data = await response.json();
    let exchangeRate = data[toCurrencyCode.toLowerCase()];
    let finalAmount = exchangeRate*amountValue;
  
    //update message
    msg.innerText = `${amountValue} ${fromCurrencyCode} = ${finalAmount} ${toCurrencyCode}`;
};

window.addEventListener("load",()=>{
    updateExchangeRate();
});
