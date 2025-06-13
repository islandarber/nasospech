import React from "react";
import { FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-black p-4 font-montserrat text-center" aria-label="Footer">
      <div className="flex justify-center gap-6 mb-2 text-white text-xl">
        <a
          href="https://www.instagram.com/nasos_pechlivanidis"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.linkedin.com/in/nasos-pechlivanidis-4b5602234/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a href="mailto:nasospechlivanidis@gmail.com" aria-label="Email">
          <FaEnvelope />
        </a>
      </div>
      <p className="text-white text-xs">
        © 2023 Nasos Pechlivanidis. All rights reserved.
      </p>
    </footer>
  );
};
