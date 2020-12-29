"use strict";

/**
 * Genera la calculadora en la UI manteniendo el estado de la operación
 */
const generateCalculator = () => {
  const keys = {
    keyOpDelete: "Del",
    keyOpDiv: "/",
    keyOpMul: "*",
    keyOpSub: "-",
    key7: "7",
    key8: "8",
    key9: "9",
    keyOpSum: "+",
    key4: "4",
    key5: "5",
    key6: "6",
    key1: "1",
    key2: "2",
    key3: "3",
    keyOpEq: "=",
    keyOpAns: "Ans",
    key0: "0",
    keyOpDot: ".",
  };
  let operation = "0";
  let ans = "0";
  const calculatorContainer = document.getElementById("calculatorContainer");

  const calculatorKeys = document.createElement("DIV");
  calculatorKeys.classList.add("calculator__keys");

  Object.keys(keys).forEach((key) => {
    const keyCurrent = htmlToElement(`<div class="${key}">${keys[key]}</div>`);
    keyCurrent.addEventListener("mousedown", () => {
      [operation, ans] = handleKeyPress(keys[key], operation, ans);
      showOperationDisplay(operation);
      showAnsDisplay(ans);
    });
    calculatorKeys.append(keyCurrent);
  });

  calculatorContainer.append(calculatorKeys);
};

/**
 * Valida la tecla presionada por el usuario
 * @param {String} key tecla pensionada por el usuario
 * @param {String} operation estado de la operación
 * @param {String} ans valor de la ultima operación
 * @returns {Array<String>} estado y valor de la ultima operación
 */
const handleKeyPress = (key, operation, ans) => {
  if (key === "Del") {
    operation = deleteKeyOperation(operation);
  } else if (key === "Ans") {
    [operation, ans] = calculateAnsOperation(operation, ans);
  } else if (key === "=") {
    operation = calculateOperation(operation);
    if (!isNaN(operation) && !operation.includes("Infinity")) {
      ans = operation;
    }
  } else {
    operation = addKeyOperation(key, operation);
  }

  return [operation, ans];
};

/**
 * Borra lo último escrito por el usuario
 * @param {String} operation estado de la operación
 * @returns {String} estado de la operación
 */
const deleteKeyOperation = (operation) => {
  if (!operation || operation === "Error" || operation.includes("Infinity")) {
    operation = "0";
  }

  if (operation && operation !== "0") {
    operation = operation.substring(0, operation.length - 1);
  }
  return operation;
};

/**
 * Añade a la operación actual el valor de la ultima operación
 * @param {String} operation estado de la operación
 * @param {String} ans valor de la ultima operación
 * @returns {Array<String>} estado y valor de la ultima operación
 */
const calculateAnsOperation = (operation, ans) => {
  const last = operation[operation.length - 1];
  if (isNaN(last)) {
    operation += ans;
  } else if (operation === "0") {
    operation = ans;
  }
  return [operation, ans];
};

/**
 * Realiza la operación actual
 * @param {String} operation estado de la operación
 * @returns {String} resultado de la operación
 */
const calculateOperation = (operation) => {
  let result = eval(operation);
  if (isNaN(result)) {
    result = "Error";
  }
  const resultString = String(result);
  return resultString;
};

/**
 * Concatena la tecla presionada por el usuario a la operación actual
 * @param {String} key tecla pensionada por el usuario
 * @param {String} operation estado de la operación
 * @return {String} estado de la operación
 */
// TODO: Verificar que un numero sea coma flotante en los operación
const addKeyOperation = (key, operation) => {
  const last = operation[operation.length - 1];
  if (!isNaN(key) && operation === "0") {
    operation = key;
  } else if (
    !isNaN(last) || // Que el ultimo dígito sea un numero
    (isNaN(last) && !isNaN(key)) //Lo el ultimo dígito sea un símbolo y que lo dígitado sea un numero
  ) {
    operation += key;
  } else if (isNaN(last) && isNaN(key)) {
    operation = operation.slice(0, operation.length - 1);
    operation += key;
  }
  return operation;
};

/**
 * Muestra en la UI la operación actual
 * @param {String} operation estado de la operación
 */
const showOperationDisplay = (operation) => {
  const display = document.getElementById("display");
  display.textContent = operation;
};

/**
 * Muestra en la UI el valor de la ultima operación
 * @param {String} ans valor de la ultima operación
 */
const showAnsDisplay = (ans) => {
  const display = document.getElementById("ans");
  display.textContent = ans;
};

/**
 * Convierte un string a un elemento HTML
 * @param {String} html String de un elemento HTML
 * @return {HTMLElement} Elemento HTML
 */
const htmlToElement = (html) => {
  const template = document.createElement("TEMPLATE");
  template.innerHTML = html.trim();
  return template.content.firstChild;
};

/**
 * Evento ejecuta una función cuando se el DOM de carga
 */
addEventListener("DOMContentLoaded", generateCalculator);
