import { useState } from "react"
export function useCalculator() {
    const [operation, setOperation] = useState('');
    const [first, appendFirst, firstToNumber] = useNumberInput();
    const [second, appendSecond, secondToNumber] = useNumberInput();
    const appendCurrent = inputFirst(first, operation) ? appendFirst : appendSecond;
    const getResult = () => {
        if (!inputFirst(first,operation) && second !== '' && !isNaN(second)) {
            secondToNumber(); 
            return calculate(first, second, operation);
        }
    };
    const append = (c, other) => {
        if (isOperation(c) && first != '' && operation != c) {
            setOperation(c);
            firstToNumber();
        }
        else if (c == 'c') {
            appendFirst('c');
            appendSecond('c');
            setOperation('');
        }
        else {
            c = c == 'ce' ? 'c' : c;
            if (c == 'del' && operation != '' && second == '') {
                setOperation('');
            }
            else {
                appendCurrent(c, inputFirst(first, operation) ? undefined : other);
            }
        }
    }
    return [first, second, operation, append , getResult];
}
function isOperation(c) {
    return ['+', '-', '*', '/'].includes(c);
}
export function inputFirst(first, operation) {
    return isNaN(first) || first == '' || operation == '';
}
function useNumberInput(num = '') {
    const [number, setNumber] = useState(num);
    const append = (operation, other) => {
        const x = applyOperation(number, operation, other);
        if (number != x) {
            setNumber(x);
        }
    };
    const toNumber = () => {
        const x = Number(number).toString();
        if (number != x) {
            setNumber(x.toString());
        }
    }
    return [number, append, toNumber];
}
function calculate(first, second, operation) {
    const f = Number(first);
    const s = Number(second);
    switch (operation) {
        case '+':
            return (f + s).toString();
        case '-':
            return (f - s).toString();
        case '*':
            return (f * s).toString();
        case '/':
            return (f / s).toString();
    }
}
function applyOperation(number, operation, other) {
    const hasDot = number.includes('.');
    const n = Number(number);
    const o = Number(other);
    switch (operation) {
        case '%':
            if (!isNaN(other))
                number = (o * n / 100).toString();
            break;
        case '+/-':
            number = number.length == 0 ? '-' :
                number[0] == '-' ? number.substring(1) : '-' + number;
            break;
        case '.':
            if (!hasDot) {
                if (number.length == 0) {
                    number += '0';
                }
                number += '.';
            }
            break;
        case 'del':
            number = number.substring(0, number.length - 1);
            break;
        //Reciprocal
        case 'rec':
            number = (1 / n).toString();
            break;
        case 'sqr':
            number = (n ** 2).toString();
            break;
        case 'sqrt':
            number = (Math.sqrt(n)).toString();
            break;
        case 'c':
            number = '';
            break;

    }
    if (!isNaN(operation)) {
        number += operation;
    }
    while (number.length > 1 && number[0] == '0' && number[1] != '.') {
        number = number.substring(1);
    }
    return number;
}

export default useCalculator
