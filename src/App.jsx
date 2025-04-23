import { useState} from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState('');
  const [rawInput, setRawInput] = useState('')
  const [darkMode, setDarkMode] = useState(false);

  const formatDisplay = (value) => {
    return value
    .split(/([+\-*/])/)
    .map((part) => {
      if (/^\d+(\.\d+)?$/.test(part)){
        return Number(part).toLocaleString();
      }
      return part;
    })
    .join('');
  }

  const handleClick = (value) => {
    const operators = ['+', '-', '*', '/', '%'];
    const lastChar = rawInput.slice(-1);

      if (value === '%'){
        const newRaw = rawInput + '/100';
        const newDisplay = input + '%'
        setRawInput(newRaw);
        setInput(newDisplay);
        return
      }

    if (operators.includes(value)) {
      if (operators.includes(lastChar)) {
        const newRaw = rawInput.slice(0, -1) + value;
        setRawInput(newRaw);
        setInput(formatDisplay(newRaw));
        return
      }
    }

    const newRaw = rawInput + value;
    setRawInput(newRaw);
    setInput(formatDisplay(newRaw));
  };

  const handleDelete = () => {
    const newRaw = rawInput.slice(0, -1);
    setRawInput(newRaw);
    setInput(formatDisplay(newRaw));
  };

  const handleClear = () => {
    setRawInput('');
    setInput('');
  };

  const handleCalculate = () => {
    try{
      const result = eval(rawInput).toString();
      setRawInput(result);
      setInput(formatDisplay(result));
    } catch {
      setRawInput('')
      setInput('');
    }
  };

  return (
    <>
      <div className={`calculator ${darkMode ? 'dark' : ''}`}>
        <h2>Calculator</h2>

        <button className='toggle-btn' onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️Light Mode' : '🌙Dark Mode'}
        </button>

        <input type="text" value={input} readOnly />
        <div className='buttons'>
          <button onClick={() => handleClick('1')}>1</button>
          <button onClick={() => handleClick('2')}>2</button>
          <button onClick={() => handleClick('3')}>3</button>
          <button onClick={() => handleClick('+')}>+</button>

          <button onClick={() => handleClick('4')}>4</button>
          <button onClick={() => handleClick('5')}>5</button>
          <button onClick={() => handleClick('6')}>6</button>
          <button onClick={() => handleClick('-')}>-</button>

          <button onClick={() => handleClick('7')}>7</button>
          <button onClick={() => handleClick('8')}>8</button>
          <button onClick={() => handleClick('9')}>9</button>
          <button onClick={() => handleClick('*')}>*</button>
     
          <button onClick={() => handleClick('%')}>%</button>
          <button onClick={() => handleClick('0')}>0</button>
          <button onClick={handleCalculate}>=</button>
          <button onClick={() => handleClick('/')}>/</button>

          <button onClick={handleClear}>C</button>
          <button onClick={() => handleClick('.')}>.</button>
          <button onClick={handleDelete}>DEL</button>
        </div>
      </div>
    </>
  )
}

export default App
