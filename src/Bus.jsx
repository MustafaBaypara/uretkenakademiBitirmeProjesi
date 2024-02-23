import React from 'react';
import MapComponent from './map';
import InputComponent from './addBus';
import './App.css';

const BusApp = () => {
    
    if (!localStorage.getItem('savedData')) {
        localStorage.setItem('savedData', '%%38%%95%%E2%%98');
    }
    const data = localStorage.getItem('savedData');
    const localData = data ? data.split('%%').map((item, index) => ({ id: index, title: item })) : [];
    const dataComponents = localData.slice(1).map(item => {
        return <MapComponent id={item.id} code={item.title} rota={0} key={item.id}/>;
      });      


    return (
      <>
      <InputComponent />
      <div className='mainMap'>
        {dataComponents}
      </div>
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap')
      </style>
      </>
    );
};

export default BusApp;
