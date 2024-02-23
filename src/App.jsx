import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <>
    <Router>
      <Home />
    </Router>
    <style>@import url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap')</style></>
  );
}

export default App;
