import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import {Home} from './views/Home.jsx';
import {Navbar} from './views/Navbar.jsx';
import {Footer} from './views/Footer.jsx';

function App() {
  return (
    <>
      <div className="bg-cover bg-repeat custom-bg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
