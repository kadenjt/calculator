let currDisplay = "";
let prevDisplay = "";
let pressedOperand = false;
let prevOperand = "";

const operands = Array.from(document.getElementsByClassName("operand"));
const operators = Array.from(document.getElementsByClassName("operator"));

const display = document.querySelector("[value='screen']");

display.textContent = "";

operands.forEach(key => key.addEventListener("click", updateScreen))
operators.forEach(key => key.addEventListener("click", operate))

function updateScreen(e) {
    let input = e.target.textContent;
    currDisplay = Number(display.textContent);
    currScreen = currDisplay;
    if (pressedOperand == true) {
        display.textContent = "";
    }
    if (input == "AC") {
        display.textContent = "";
        currDisplay = "";
        prevDisplay = "";
        prevOperand = "";
    }
    else if (input == "C") {
        let currScreen = display.textContent.toString()
        if (currScreen.length > 0) display.textContent = currScreen.slice(0, -1);
    }
    else if (input == "+/-") display.textContent = -currDisplay;
    else if (input == ".") {
        if (display.textContent.toString().indexOf(".") <0) display.textContent += input;
    }
    else display.textContent += input;
    currDisplay = Number(display.textContent);
    if (isNaN(currDisplay)) currDisplay = "";
    pressedOperand = false;
}

function operate(e) {
    const operation = e.target.dataset.val;
    switch (prevOperand) {
        case "add":
            currDisplay = Number(display.textContent);
            currDisplay += Number(prevDisplay);
            display.textContent = currDisplay;
            prevDisplay = currDisplay;
            prevOperand = operation;
            break;
        case "subtract":
            currDisplay = Number(display.textContent);
            currDisplay = Number(prevDisplay) - currDisplay;
            display.textContent = currDisplay;
            prevDisplay = currDisplay;
            prevOperand = operation;
            break;
        case "multiply":
            currDisplay = Number(display.textContent);
            currDisplay *= Number(prevDisplay);
            display.textContent = currDisplay;
            prevDisplay = currDisplay;
            prevOperand = operation;
            break;
        case "divide":
            currDisplay = Number(display.textContent);
            if (currDisplay == 0) {
                alert("Never divide by zero!")
                break;
            }
            currDisplay = Number(prevDisplay)/currDisplay;
            display.textContent = currDisplay;
            prevDisplay = currDisplay;
            prevOperand = operation;
            break;
        case "equals":
            display.textContent = currDisplay;
            prevDisplay = Number(display.textContent);
            prevOperand = "";
            break;
        default:
            prevOperand = operation;
            currDisplay = Number(display.textContent);
            prevDisplay = currDisplay;
    }
    console.log(prevOperand)
    pressedOperand = true;
}