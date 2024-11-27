import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "/src/assets/logo.png";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-transparent p-2 font-montserrat">
      <div className="flex justify-between items-center">
        <NavLink to="/" className="text-white flex items-center text-lg mt-2">
          <img 
            src={logo} 
            alt="logo" 
            className="rounded h-20 w-auto mr-2 mb-2" 
            style={{
              maskImage: `
                radial-gradient(circle, 
                  rgba(255, 255, 255, 1) 30%, 
                  rgba(255, 255, 255, 0) 70%)
              `,
              WebkitMaskImage: `
                radial-gradient(circle, 
                  rgba(255, 255, 255, 1) 30%, 
                  rgba(255, 255, 255, 0) 70%)
              `,
            }}
            
          />
          <div className="text-md">
            Nasos<strong>Pechlivanidis</strong>
            <br />
            Nocturnal<strong>AudioDesign</strong>
          </div>
        </NavLink>

        {/* Hamburger Icon */}
        <div className="md:hidden" onClick={toggleMenu}>
          <button className="text-white focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      

      {/* Normal Menu Links (Visible on larger screens) */}
      <ul className={`hidden md:flex md:flex-row space-x-10 mr-10 ${isOpen ? 'block' : 'hidden'}`}>
        {["Projects", "About Me", "Contact"].map((item, index) => (
          <li key={index}>
            <NavLink 
              to={`/${item.toLowerCase().replace(/\s+/g, '')}`} 
              className="text-white text-md font-semibold"
            >
              <motion.span 
                whileHover={{ 
                  opacity: 1, 
                  textShadow: "0 0 8px rgba(255, 255, 255, 1)", 
                  transition: { duration: 0.3 }
                }}
                initial={{ opacity: 0.7 }}
              >
                {item}
              </motion.span>
            </NavLink>
          </li>
        ))}
      </ul>
      </div>
        {/* Hamburger Menu Links (Visible on smaller screens) */}
        <ul className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        {["Projects", "About Me", "Contact"].map((item, index) => (
          <li key={index} className="text-white p-2">
            <NavLink 
            to={`/${item.toLowerCase().replace(/\s+/g, '')}`}
            onClick={closeMenu}
            >{item}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
