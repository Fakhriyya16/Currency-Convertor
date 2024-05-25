// selector for all buttons
buttonsLeft = document.querySelectorAll(".left-box .buttons button");
buttonsRight = document.querySelectorAll(".right-box .buttons button");

// selector for spans
converterLeft = document.querySelector(".left-box span");
converterRight = document.querySelector(".right-box span");

// selector for active buttons
activeLeft = document.querySelector(".left-box .buttons .active-button");
activeRight = document.querySelector(".right-box .buttons .active-button");

// selector for inputs
inputLeft = document.querySelector(".left-box input");
inputRight = document.querySelector(".right-box input");

// rates
let rateFirst;
let rateSecond;

(async function() {
    rateFirst = await GetRate(activeLeft.innerText, activeRight.innerText, converterLeft);
    rateSecond = await GetRate(activeRight.innerText, activeLeft.innerText, converterRight);
})();

// fetch
async function GetRate(currency, activeButtonValue, converter) {
    try {
        const response = await fetch("https://v6.exchangerate-api.com/v6/6f447e0e94adc9a4e8af203c/latest/" + currency.toLowerCase());
        const data = await response.json();
        const rate = data.conversion_rates[activeButtonValue];
        converter.innerText = "1" + " " + currency + " " + "=" + " " + rate + " " + activeButtonValue;
        return rate;
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
    }
}

// events
buttonsLeft.forEach(button => {
    button.addEventListener("click",async function(){
        buttonsLeft.forEach(element => {
            element.classList.remove("active-button");
        });
        this.classList.add("active-button");   
        activeLeft = this;

        rateFirst = await GetRate(this.innerText,activeRight.innerText,converterLeft);
        rateSecond = await GetRate(activeRight.innerText,activeLeft.innerText,converterRight);

        if(inputLeft != ""){
            inputLeft.value = inputRight.value * rateSecond;
        }
    })
});

buttonsRight.forEach(button => {
    button.addEventListener("click",async function(){
        buttonsRight.forEach(element => {
            element.classList.remove("active-button");
        });
        this.classList.add("active-button");   
        activeRight = this;

        rateFirst = await GetRate(activeLeft.innerText,activeRight.innerText,converterLeft);
        rateSecond = await GetRate(this.innerText,activeLeft.innerText,converterRight);

        if(inputRight != ""){
            inputRight.value = inputLeft.value * rateFirst;
        }
    })
});

inputLeft.addEventListener("input",function(){
    inputRight.value = inputLeft.value * rateFirst;
})

inputRight.addEventListener("input",function(){
    inputLeft.value = inputRight.value * rateSecond;
})