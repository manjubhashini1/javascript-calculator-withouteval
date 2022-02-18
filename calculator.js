//calculator without eval.

//First get all the elements
const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const tempResultEl = document.querySelector(".temp-result");
const numbersEl = document.querySelectorAll(".number");
const operatorEl = document.querySelectorAll(".operation");
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all-clear");
const lastClearEl = document.querySelector(".last-clear");

//declare variables required
let displayNumber1 = "";
let displayNumber2 = "";
let result = null;
let lastOperation = "";
//handle decimal numbers - assuming initially dot is false
let haveDot = false;

// adding event listeners to the buttons
// numberselement is a array of buttons element - so implemet each and then add event click listener

numbersEl.forEach((number) => {
    number.addEventListener("click", (e) => {
        // 2. handle the dot
        if (e.target.innerText === "." && !haveDot) {
            haveDot = true;
        }
        else if (e.target.innerText === "." && haveDot) {
            return;
        }
        // 1. this is general condition
        displayNumber2 += e.target.innerText;
        display2El.innerText = displayNumber2;
    });
});

//adding event listners to operators

operatorEl.forEach((operator) => {
    operator.addEventListener("click", (e) => {
        // when a operator is clicked i need to check if a number is present or not else no sense so
        // checking if there is number entered in display 2
        if (!displayNumber2) return;
        // if display 2 present we will proceed next steps below
        //if dot was true earlier when a numebr was clicked make it false for next number to include dot
        haveDot = false;
        // get the operator
        const operationName = e.target.innerText;
        if (displayNumber1 && displayNumber2 && lastOperation) {
            mathOperation();
        }
        else {
            result = parseFloat(displayNumber2);
        }
        //move dis2 to disp1 and clear the displ2 for next value
        clearVar(operationName);
        lastOperation = operationName;
    });
});

function clearVar(opName = '') {
    displayNumber1 += displayNumber2 + " " + opName;
    display1El.innerText = displayNumber1;
    //clear display2
    displayNumber2 = "";
    display2El.innerText = "";
    tempResultEl.innerText = result;
}

function mathOperation() {
    if (lastOperation === "*") {
        result = parseFloat(result) * parseFloat(displayNumber2);
    }
    else if (lastOperation === "+") {
        result = parseFloat(result) + parseFloat(displayNumber2);
    }
    else if (lastOperation === "-") {
        result = parseFloat(result) - parseFloat(displayNumber2);
    }
    else if (lastOperation === "/") {
        result = parseFloat(result) / parseFloat(displayNumber2);
    }
    else if (lastOperation === "%") {
        result = parseFloat(result) % parseFloat(displayNumber2);
    }
}

equalEl.addEventListener("click", () => {
    if (!displayNumber1 || !displayNumber2) return;
    haveDot = false;
    mathOperation();
    clearVar();
    displayNumber2.innerText = "";
    tempResultEl.innerText = result;
    displayNumber2 = result;
    displayNumber1 = "";
})

clearAllEl.addEventListener("click", () => {
    displayNumber1 = "";
    displayNumber2 = "";
    display1El.innerText = "";
    display2El.innerText = "";
    result = "";
    tempResultEl.innerText = "";
    lastOperation = "";
})

lastClearEl.addEventListener("click", () => {
    display2El.innerText = "";
    displayNumber2 = "";
});


