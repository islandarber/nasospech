import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import logo from "/src/assets/logo.png";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
                  rgba(255, 255, 255, 0) 70%)`,
              WebkitMaskImage: `
                radial-gradient(circle, 
                  rgba(255, 255, 255, 1) 30%, 
                  rgba(255, 255, 255, 0) 70%)`,
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
          <button
            className="text-white focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Normal Menu Links (Visible on larger screens) */}
        <ul className={`hidden md:flex md:flex-row space-x-10 mr-10`}>
          {["Projects", "About Me", "Contact"].map((item, index) => (
            <li key={index}>
              <NavLink
                to={`/${item.toLowerCase().replace(/\s+/g, "")}`}
                className={({ isActive }) =>
                  isActive ? "text-white underline font-semibold" : "text-white font-semibold"
                }
              >
                <motion.span
                  whileHover={{
                    opacity: 1,
                    textShadow: "0 0 8px rgba(255, 255, 255, 1)",
                    transition: { duration: 0.3 },
                  }}
                  initial={{ opacity: 0.7 }}
                >
                  {item}
                </motion.span>
              </NavLink>
            </li>
          ))}

          {token ? (
            <>
              <li>
                <NavLink to="/admin/dashboard" className="text-white text-md font-semibold">
                  Dashboard
                </NavLink>
              </li>
              <li>
                <button onClick={logout} className="text-red-400 text-md font-semibold">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink
                to="/admin/login"
                className="text-white text-xs font-semibold opacity-30 hover:opacity-100 transition duration-200"
              >
                Admin Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Menu Links */}
      <motion.ul
        id="mobile-menu"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
        transition={{ duration: 0.3 }}
        className={`md:hidden ${isOpen ? "block" : "hidden"}`}
      >
        {["Projects", "About Me", "Contact"].map((item, index) => (
          <li key={index} className="text-white p-2">
            <NavLink to={`/${item.toLowerCase().replace(/\s+/g, "")}`} onClick={closeMenu}>
              {item}
            </NavLink>
          </li>
        ))}

        {token ? (
          <>
            <li className="text-white p-2">
              <NavLink to="/admin/dashboard" onClick={closeMenu}>
                Dashboard
              </NavLink>
            </li>
            <li className="text-red-400 p-2">
              <button onClick={() => { logout(); closeMenu(); }}>Logout</button>
            </li>
          </>
        ) : (
          <li className="text-white p-2">
            <NavLink to="/admin/login" onClick={closeMenu}>
              Admin Login
            </NavLink>
          </li>
        )}
      </motion.ul>
    </nav>
  );
};
