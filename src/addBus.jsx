import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const InputComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [savedData, setSavedData] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('savedData');
    if (data) {
      setSavedData(data);
    }
  }, []);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = (type) => {
    let newData = inputValue;
    newData = savedData + '%%' + inputValue;
    
    localStorage.setItem('savedData', newData);
    setInputValue('');
    setSavedData(newData);
    window.location.reload();
  };

  return (
    <div className='inputDiv'>
        <h1>Otobüs ekle!</h1>
        <input type="text" value={inputValue} onChange={handleChange} />
        <Button variant="success" style={{marginTop: "20px"}} onClick={() => handleClick('gidiş')}>Ekle!</Button>
    </div>
  );
};

export default InputComponent;
