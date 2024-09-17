import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import {Home} from './views/Home';
import {Navbar} from './views/Navbar';
import {Footer} from './views/Footer';


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
