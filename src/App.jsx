import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import {Home} from './views/Home';
import {Navbar} from './components/Navbar';
import {Footer} from './components/Footer';
import NightSky from './components/NightSky';
import { Projects } from './views/Projects';


function App() {
  return (
    <>
      <div className="bg-cover bg-repeat custom-bg">
        <NightSky />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
