let operations = document.querySelector(".operations");
const calculatorKeys = document.querySelector(".calculator-keys");
let num1, num2, op;

const showOperation = (num) =>{
    if(operations.textContent === "0"){
        operations.textContent = num;
        return;
    }
    operations.textContent += num;
};

const calculate = (n1,n2,op) => {
    if (op === "+") {
        res = n1 + n2;
    } else if (op === "-") {
        res = n1 - n2;
    } else if (op === "x") {
        res = n1 * n2;
    } else if (op === "/") {
        res = n1 / n2;
    } 
    operations.textContent = res;
    num1 = res;
    num2 = undefined;
};

const validate = () => {
    if(Number(operations.textContent) || operations.textContent === "0") {
        operations.textContent += op;
    }    

    if(operations.textContent.split(op)[1] !== ""){
        num1 = Number(operations.textContent.split(op)[0]);
        num2 = Number(operations.textContent.split(op)[1]);
        calculate(num1,num2,op);
    }
};

calculatorKeys.addEventListener('click', (e)=>{
    if(e.target.classList.value === "calculator-keys") return

    if(e.target.classList[1] === "Op"){
        op = e.target.textContent; 
        validate();
    }else if(e.target.textContent === "="){
        if(op) validate();
    }else if(e.target.textContent === "Del"){
        operations.textContent = operations.textContent.substr(0,operations.textContent.length-1);
        if(!operations.textContent) operations.textContent = 0;
    }else if(e.target.textContent === "."){
        textActual = operations.textContent
        if(operations.textContent.includes(op)) textActual = operations.textContent.substr(operations.textContent.indexOf(op)-1, operations.textContent.length)
        if(textActual.includes(".")) return
        showOperation(e.target.textContent);
    }else{
    showOperation(e.target.textContent);
    }
})
