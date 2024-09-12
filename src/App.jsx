import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import {Home} from './views/Home.jsx';
import {Navbar} from './views/Navbar.jsx';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
