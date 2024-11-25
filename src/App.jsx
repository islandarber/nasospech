import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './views/Home';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import NightSky from './components/NightSky';
import { Projects } from './views/Projects';
import { CategoryProjects } from './components/CategoryProjects';

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
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
