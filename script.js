const display = document.getElementById("display");
const history = document.getElementById("history");

let current = "0";
let previous = "";
let operator = null;
let resetScreen = false;


// Number buttons
document.querySelectorAll("[data-number]").forEach(button => {

    button.addEventListener("click", () => {

        const number = button.dataset.number;

        if (resetScreen) {
            current = "";
            resetScreen = false;
        }

        // Prevent multiple decimal points
        if (number === "." && current.includes(".")) {
            return;
        }

        if (current === "0" && number !== ".") {
            current = number;
        } else {
            current += number;
        }

        updateDisplay();
    });

});


// Operator buttons
document.querySelectorAll(".operator").forEach(button => {

    button.addEventListener("click", () => {

        const action = button.dataset.action;

        if (operator !== null && !resetScreen) {
            calculate();
        }

        previous = current;
        operator = action;
        resetScreen = true;

        history.textContent =
            previous + " " + getSymbol(action);
    });

});


// Equal button
document.querySelector('[data-action="="]')
.addEventListener("click", () => {

    if (operator === null) {
        return;
    }

    calculate();

    operator = null;
    resetScreen = true;
});


// Calculate
function calculate() {

    const first = parseFloat(previous);
    const second = parseFloat(current);

    let result;

    if (operator === "+") {
        result = first + second;
    }

    else if (operator === "-") {
        result = first - second;
    }

    else if (operator === "*") {
        result = first * second;
    }

    else if (operator === "/") {

        if (second === 0) {
            current = "Error";
            updateDisplay();
            return;
        }

        result = first / second;
    }

    current = String(Number(result.toFixed(10)));

    history.textContent =
        previous + " " +
        getSymbol(operator) +
        " " +
        second +
        " =";

    updateDisplay();
}


// Clear button
document.querySelector('[data-action="clear"]')
.addEventListener("click", () => {

    current = "0";
    previous = "";
    operator = null;
    resetScreen = false;

    history.textContent = "";

    updateDisplay();
});


// Plus / Minus
document.querySelector('[data-action="sign"]')
.addEventListener("click", () => {

    if (current !== "0" && current !== "Error") {
        current = String(parseFloat(current) * -1);
        updateDisplay();
    }

});


// Percentage
document.querySelector('[data-action="percent"]')
.addEventListener("click", () => {

    if (current !== "Error") {
        current = String(parseFloat(current) / 100);
        updateDisplay();
    }

});


// Update display
function updateDisplay() {
    display.textContent = current;
}


// Operator symbols
function getSymbol(action) {

    if (action === "+") {
        return "+";
    }

    if (action === "-") {
        return "−";
    }

    if (action === "*") {
        return "×";
    }

    if (action === "/") {
        return "÷";
    }

    return "";
}


// Light / Dark Mode
const themeToggle = document.getElementById("themeToggle");
const modeText = document.getElementById("modeText");

themeToggle.addEventListener("change", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        modeText.textContent = "DARK MODE";
    } else {
        modeText.textContent = "LIGHT MODE";
    }

});