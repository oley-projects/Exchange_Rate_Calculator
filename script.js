const currencyElemOne = document.getElementById('currency-one'),
      amountElemOne = document.getElementById('amount-one'),
      currencyElemTwo = document.getElementById('currency-two'),
      amountElemTwo = document.getElementById('amount-two');

const rateElem = document.getElementById('rate'),
      swap = document.getElementById('swap');

// Fatch exchange rates and update the DOM
function calculate() {
    const currencyOne = currencyElemOne.value,
          currencyTwo = currencyElemTwo.value;

    fetch(`https://v6.exchangerate-api.com/v6/d8f8c3510d5b1cd64a9e1248/latest/${currencyOne}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.conversion_rates[currencyTwo];

            rateElem.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;

            amountElemTwo.value = (amountElemOne.value * rate).toFixed(2);
        });

}

// Event listeners
currencyElemOne.addEventListener('change', calculate);
amountElemOne.addEventListener('input', calculate);
currencyElemTwo.addEventListener('change', calculate);
amountElemTwo.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyElemOne.value;
    currencyElemOne.value = currencyElemTwo.value;
    currencyElemTwo.value = temp;
    calculate();
});

calculate();