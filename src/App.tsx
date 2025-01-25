import React, { useState } from 'react';
import { Equal, Delete, Plus, Minus, X, Divide } from 'lucide-react';

function App() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleNumber = (num: string) => {
    if (display === '0' || shouldResetDisplay) {
      setDisplay(num);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (operator: string) => {
    setShouldResetDisplay(true);
    setEquation(display + ' ' + operator + ' ');
  };

  const handleEqual = () => {
    try {
      const result = eval(equation + display);
      setDisplay(String(result));
      setEquation('');
    } catch (error) {
      setDisplay('Error');
    }
    setShouldResetDisplay(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setShouldResetDisplay(false);
  };

  const Button = ({ children, onClick, className = '' }: { 
    children: React.ReactNode; 
    onClick: () => void; 
    className?: string;
  }) => (
    <button
      onClick={onClick}
      className={`p-4 text-lg font-semibold rounded-lg transition-colors
        hover:bg-gray-200 active:bg-gray-300 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-gray-800 p-6 text-right">
          <div className="text-gray-400 text-sm h-6">{equation}</div>
          <div className="text-white text-4xl font-light tracking-wider">{display}</div>
        </div>
        
        <div className="grid grid-cols-4 gap-1 p-4 bg-gray-50">
          <Button onClick={handleClear} className="col-span-3 bg-red-100 hover:bg-red-200">
            <div className="flex items-center justify-center gap-2">
              <Delete size={20} /> Clear
            </div>
          </Button>
          <Button onClick={() => handleOperator('/')}><Divide size={20} /></Button>
          
          {['1', '2', '3'].map(num => (
            <Button key={num} onClick={() => handleNumber(num)}>{num}</Button>
          ))}
          <Button onClick={() => handleOperator('*')}><X size={20} /></Button>
          
          {['4', '5', '6'].map(num => (
            <Button key={num} onClick={() => handleNumber(num)}>{num}</Button>
          ))}
          <Button onClick={() => handleOperator('-')}><Minus size={20} /></Button>
          
          {['7', '8', '9'].map(num => (
            <Button key={num} onClick={() => handleNumber(num)}>{num}</Button>
          ))}
          <Button onClick={() => handleOperator('+')}><Plus size={20} /></Button>
          
          <Button onClick={() => handleNumber('0')} className="col-span-2">0</Button>
          <Button onClick={() => handleNumber('.')}>.</Button>
          <Button onClick={handleEqual} className="bg-blue-100 hover:bg-blue-200">
            <Equal size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;