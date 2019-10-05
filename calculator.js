/* Global state for calculation */
let calculation = [];

let resultField = document.getElementById("result-field");

const isNumber = str => !!str.match(/^([0-9.]+)$/g);
const isPeriod = str => !!str.match(/^[0-9]*\.$/g);
const isOperand = str => !!str.match(/^[+-/*]$/g);

const reset = () => {
  resultField.value = "";
  calculation.splice(0, calculation.length);
};

const addNumber = (operations, number) => {
  let latest = operations[operations.length - 1] || "";
  let operand = "";

  if (isNumber(latest) || isPeriod(latest)) {
    operand = `${latest}${number}`;
    operations[operations.length - 1] = operand;
  } else if (isOperand(latest)) {
    operand = number;
    operations.push(operand);
  } else if (operations.length === 0) {
    operations.push(number);
  } else {
    console.log(`This should never be printed out.
      DEBUG:
      Latest: ${latest}
      Operations: ${operations}`);
  }

  resultField.value = `(${operations.join(" ")})`;
  console.log(operations);
};

const addOperand = (operations, operand) => {
  let latest = operations[operations.length - 1] || "";

  if (isNumber(latest)) {
    operations.push(operand);
  } else if (isPeriod(latest)) {
    newOperand = `${latest}.0`;
    operations[operations.length - 1] = newOperand;
    operations.push(operand);
  } else {
    operations[operations.length - 1] = operand;
  }
  console.log(operations);
  resultField.value = `(${operations.join(" ")})`;
};

const addPeriod = operations => {
  let latest = operations[operations.length - 1] || "";
  if (isNumber(latest)) {
    newOperand = `${latest}.`;
    operations[operations.length - 1] = newOperand;
  } else if (isOperand(latest)) {
    operations.push(`0.`);
  }
  resultField.value = `(${operations.join(" ")})`;
  console.log(operations);
};

const calculate = operations => {
  const result = eval(operations.join(""));
  operations.splice(0, operations.length);
  operations.push(`${result}`);
  return result;
};

document.getElementById("button-c").addEventListener("click", reset);

Object.values(document.getElementsByClassName("numeric-operation")).forEach(
  element => {
    element.addEventListener("click", ev => {
      let value = ev.target.dataset.value;
      addNumber(calculation, value);
    });
  }
);

Object.values(document.getElementsByClassName("calculation-operation")).forEach(
  element => {
    element.addEventListener("click", ev => {
      let operand = ev.target.dataset.operand;
      addOperand(calculation, operand);
    });
  }
);

document.getElementById("button-equals").addEventListener("click", () => {
  let result = calculate(calculation);
  resultField.value = result;
});

document.getElementById("button-period").addEventListener("click", () => {
  addPeriod(calculation);
});
