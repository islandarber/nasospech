import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-transparent p-4 font-montserrat">
      <ul className="flex justify-between items-center">
        <li>
          <NavLink 
            to="/" 
            className="text-white text-lg"
          >
            Nasos<strong>Pechlivanidis</strong>
            <br />
            Nocturnal<strong>AudioDesign</strong>
          </NavLink>
        </li>
        <ul className="flex space-x-4 text-sm">
          <li>
            <NavLink 
              to="/" 
              className="font-bold text-white hover:underline hover:underline-white"
              activeClassName="underline underline-white"
            >
              Short-Movies
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              className="font-bold text-white hover:underline hover:underline-white"
              activeClassName="underline underline-white"
            >
              Theater
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/projects" 
              className="font-bold text-white hover:underline hover:underline-white"
              activeClassName="underline underline-white"
            >
              Bio
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              className="font-bold text-white hover:underline hover:underline-white"
              activeClassName="underline underline-white"
            >
              On going
            </NavLink>
          </li>
        </ul>
      </ul>
    </nav>
  );
};
