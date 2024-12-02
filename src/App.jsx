import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './views/Home';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import {Aboutme} from './views/Aboutme'
import NightSky from './components/NightSky';
import { Projects } from './views/Projects';
import { CategoryProjects } from './components/CategoryProjects';
import { Contact } from './views/Contact';

function App() {
  return (
    <>
      <div className="bg-cover bg-repeat custom-bg min-h-screen flex flex-col">
        <NightSky />
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:category" element={<CategoryProjects />} />
            <Route path="/aboutme" element={<Aboutme/>} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
