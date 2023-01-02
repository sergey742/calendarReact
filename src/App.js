
import './App.css';
import Header from './components/Header/Header';
import Calendar from './components/Calendar/Calendar';
import { useState } from 'react';

function App() {
  const [onMonthChange, setOnMonthChange] = useState(false);
  const handleOnMonthChange = () => setOnMonthChange(prevState => !prevState);
  
  return (
    <div className="App">
      <Header handleOnMonthChange={handleOnMonthChange} />
      <Calendar handleOnMonthChange={handleOnMonthChange} onMonthChange={onMonthChange}/>
    </div>
  );
}

export default App;
