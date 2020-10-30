let currDisplay, prevDisplay, pressedOperand, prevOperand;

const operands = Array.from(document.getElementsByClassName("operand"));
const operators = Array.from(document.getElementsByClassName("operator"));
const display = document.querySelector("[value='screen']");

operands.forEach(key => key.addEventListener("click", updateScreen))
operators.forEach(key => key.addEventListener("click", operate))

initValues();

function initValues() {
    currDisplay = "";
    prevDisplay = "";
    pressedOperand = false;
    prevOperand = "";
    display.textContent = "0";
}

function updateScreen(e) {
    let input = e.target.textContent;
    currScreen = Number(display.textContent);
    if (pressedOperand == true) {
        display.textContent = "";
    }
    if (input == "AC") {
        initValues();
    }
    else if (input == "DEL") {
        let currScreen = display.textContent.toString();
        if (currScreen.length > 0) display.textContent = currScreen.slice(0, -1);
    }
    else if (input == "±") display.textContent = -currScreen;
    else if (input == ".") {
        if (display.textContent.toString().indexOf(".") < 0 &&
            display.textContent.toString().length < 13)
            display.textContent += input;
    }
    else {
        if (display.textContent.toString().length < 13)
            display.textContent = Number(display.textContent + input);
    }
    currDisplay = Number(display.textContent);
    if (display.textContent.toString().length < 1) display.textContent = 0;
    if (isNaN(currDisplay)) currDisplay = "";
    pressedOperand = false;
}

function operate(e) {
    const operation = e.target.dataset.val;
    currDisplay = Number(display.textContent);
    performOp(prevOperand);
    handleLongNumbers()
    display.textContent = currDisplay;
    prevOperand = operation;
    prevDisplay = currDisplay;
    pressedOperand = true;
}

function handleLongNumbers() {
    if (currDisplay > 9999999999999) currDisplay = "Too large."
    else if (currDisplay < -9999999999999) currDisplay = "Too small."
    if (currDisplay.toString().length > 13) currDisplay = currDisplay.toString().slice(0, 13)
}

function performOp(op) {
    switch (op) {
        case "add":
            currDisplay += Number(prevDisplay);
            break;
        case "subtract":
            currDisplay = Number(prevDisplay) - currDisplay;
            break;
        case "multiply":
            currDisplay *= Number(prevDisplay);
            break;
        case "divide":
            if (currDisplay == 0) {
                alert("Never divide by zero!")
                break;
            }
            currDisplay = Number(prevDisplay) / currDisplay;
            break;
        case "equals":
            prevDisplay = Number(display.textContent);
            break;
    }
}