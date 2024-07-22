import { useState } from "react"
import "./Calculator.css"
import { useCalculator , inputFirst} from "./Calculator";
function App() {
    return (
        <Calculator/>
    );
}
function useHistory(max = 25) {
    const [history, setHistory] = useState([]);
    const add = (first,second,operation,result) => {
        const entry = `${first} ${operation} ${second} = ${result}`;
        if (history.length >= max) {
            const h = history.slice(0, history.length - 1);
            setHistory([entry, ...h]);
        }
        else {
            setHistory([entry, ...history]);
        }
    }
    return [history, add];
}
function Calculator() {
    const [first, second, operation, append, getResult] = useCalculator();
    const [lastResult, setLastResult] = useState('');
    const [history, add] = useHistory();
    const addHistory = (result) => { add(first, second, operation, result) };
    return (
        <div className="box">
            <span className = "calculator">
                <CalculatorDisplay lastResult={lastResult} first={first} second={second} operation={operation} />
                <CalculatorInput addHistory={addHistory} setLastResult={setLastResult} getResult={getResult} append={append} other={inputFirst(first,second,operation)?undefined : first}  />
            </span>
            <span className="history">
            <br/>
                {history.map(x => <><div>{x}</div><br/></>) }
            </span>
        </div>
    );
}

function CalculatorInput({ append, other, getResult, setLastResult, addHistory }) {
    const clearResult = () => setLastResult('');
    return (
        <div className="calculator-input">
            <CalculatorButton clearResult={clearResult} text='%' append={append} other={other} />
            <CalculatorButton clearResult={clearResult} text='CE' c='ce' append={append} />
            <CalculatorButton clearResult={clearResult} text='C' c='c' append={append} />
            <CalculatorButton clearResult={clearResult} text='<=' c='del' append={append} />
            <CalculatorButton clearResult={clearResult} text='1/x' c='rec' append={append} />
            <CalculatorButton clearResult={clearResult} text='x^2' c='sqr' append={append} />
            <CalculatorButton clearResult={clearResult} text='sqrt(x)' c='sqrt' append={append} />
            <CalculatorButton clearResult={clearResult} text='/' append={append} />
            <CalculatorButton clearResult={clearResult} text='7' append={append} />
            <CalculatorButton clearResult={clearResult} text='8' append={append} />
            <CalculatorButton clearResult={clearResult} text='9' append={append} />
            <CalculatorButton clearResult={clearResult} text='x' c='*' append={append} />
            <CalculatorButton clearResult={clearResult} text='4' append={append} />
            <CalculatorButton clearResult={clearResult} text='5' append={append} />
            <CalculatorButton clearResult={clearResult} text='6' append={append} />
            <CalculatorButton clearResult={clearResult} text='-' append={append} />
            <CalculatorButton clearResult={clearResult} text='1' append={append} />
            <CalculatorButton clearResult={clearResult} text='2' append={append} />
            <CalculatorButton clearResult={clearResult} text='3' append={append} />
            <CalculatorButton clearResult={clearResult} text='+' append={append} />
            <CalculatorButton clearResult={clearResult} text='+/-' append={append} />
            <CalculatorButton clearResult={clearResult} text='0' append={append} />
            <CalculatorButton clearResult={clearResult} text='.' append={append} />
            <CalculatorEqualButton addHistory={addHistory} getResult={getResult} setLastResult={setLastResult} />
        </div>
    );
}
function CalculatorDisplay({ first, second, operation, lastResult }) {
    if (inputFirst(first, operation)) {
        return (
            <div className ="calculator-display">
                <div>{first}</div>
                {first == ''?<br/>:'' }
                <br/>
            </div>
        );
    }
    if (lastResult !== '') {
        return (
            <div className="calculator-display">
                <div className ="calculator-display-upper">{first} {operation} {second} =</div>
                <div>{lastResult}</div>
            </div>
        );
    }
    return (
        <div className="calculator-display">
            <div className={second === ''? '' : "calculator-display-upper"}>{first} {operation}</div>
            <div>{second}</div>
            {second == '' ? <br /> : ''}
        </div>
    );
}

function CalculatorButton({ text, append, c, other, clearResult }) {
    c = c === undefined ? text : c;
    return <button className="calculator-button" onClick={() => {
        append(c, other);
        clearResult();
    }}>{text}</button>;
}
function CalculatorEqualButton({ text = '=', getResult, setLastResult,addHistory}) {
    return <button className="calculator-button" onClick={() => {
        const result = getResult();
        if (result !== undefined) {
            setLastResult(result);
            addHistory(result)
        }
    }}>{text}</button>;
}
export default App