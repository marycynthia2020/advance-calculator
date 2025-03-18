// const buttons = document.querySelectorAll(".button");
const container = document.getElementById("button-container");
const result = document.getElementById("result");

const arryOfOperators = ["/", "-", "+", "*"];

container.addEventListener("click", validateInput);

function validateInput(e) {
  const buttonDataType = e.target.getAttribute("data-button-type");
  if (buttonDataType === "number") {
    displayNumber(e.target.innerText);
  }
  if (buttonDataType === "operator") {
    displayOperator(e.target.innerText);

    // disablebuttons();
  }
  if (buttonDataType === "decimal") {
    displayDecimal(e.target.innerText);
    // e.target.disabled = true;
  }
  if (buttonDataType === "reset") {
    reset();
  }
  if (buttonDataType === "delete") {
    deleteInput();
  }
  if (buttonDataType === "equality") {
    result.innerText = calculate();
  }
}

function displayNumber(num) {
  if (result.innerText === "0") {
    result.innerText = num;
  } else {
    result.innerText += num;
  }
}

function displayOperator(operator) {
  const lastChar = result.innerText.at(-1);

  let isOperatorDisplayed = false;

  arryOfOperators.forEach((operator) => {
    if (result.innerText.includes(operator)) {
      isOperatorDisplayed = true;
    }
  });

  if (
    result.innerText !== "" &&
    !isOperatorDisplayed &&
    result.innerText.at(-1) !== "."
  ) {
    // if (result.innerText.at(-1) === ) {
    //   console.log(result.innerText);
    //   console.log("yes");

    //   // console.log(result.innerText.slice(0, result.innerText.length));
    //   // result.innerText.at(-1) = operator
    // }
    result.innerText += operator;
  }

  if (arryOfOperators.includes(lastChar)) {
    result.innerText = result.innerText.slice(0, -1) + operator;
  }

  // if (
  //   result.innerText !== "" &&
  //   !result.innerText.includes("-") &&
  //   !result.innerText.includes("+") &&
  //   !result.innerText.includes("/") &&
  //   !result.innerText.includes("*")
  // ) {
  //   result.innerText += operator;
  // }
}

function displayDecimal(decimal) {
  // if (result.innerText !== "" && !result.innerText.includes(".")) {
  //   result.innerText += decimal;
  // }

  arryOfOperators.forEach((operator) => {
    const operatorIndex = result.innerText.lastIndexOf(operator);
    const decimalIndex = result.innerText.lastIndexOf(".");

    if (
      result.innerText !== "" &&
      operatorIndex >= decimalIndex &&
      result.innerText.at(-1) !== operator
    ) {
      result.innerText += decimal;
    }

    if (result.innerText.at(-1) === operator) {
      result.innerText += `0${decimal}`;
    }

    // if (operatorIndex > decimalIndex) {
    //   result.innerText += decimal;
    // }
    // if (decimalIndex > operatorIndex) {
    //   console.log("ji");
    // }
  });
}

function reset() {
  result.innerText = 0;
}

function deleteInput() {
  let newString = result.innerText.slice(0, -1);
  console.log(newString);
  result.innerText = newString;
  if (result.innerText === "") {
    result.innerText = 0;
  }
}

function calculate() {
  let results = result.innerText;
  let solution;

  arryOfOperators.forEach((operator) => {
    if (results.includes(operator)) {
      let operatorIndex = results.lastIndexOf(operator);

      let nextOperandIndex = operatorIndex + 1;

      let firstOperand = Number(results.slice(0, operatorIndex));
      let secondOperand = Number(
        results.slice(nextOperandIndex, results[results.length])
      );

      if (operator === "+") {
        solution = firstOperand + secondOperand;
      }
      if (operator === "-") {
        solution = firstOperand - secondOperand;
      }
      if (operator === "*") {
        solution = firstOperand * secondOperand;
      }
      if (operator === "/") {
        solution = firstOperand / secondOperand;
      }
    }
  });
  return solution;
}
