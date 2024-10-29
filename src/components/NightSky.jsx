import React from "react";
import { motion } from "framer-motion";

const NightSky = () => {
  return (
    <div className="night-sky">
      <motion.div 
        className="stars" 
        animate={{ backgroundPosition: ["0 0", "-500px 500px"], opacity: [0.8, 1, 0.8] }} 
        transition={{ duration: 300, repeat: Infinity, ease: "linear" }} 
      />
      <motion.div 
        className="twinkling" 
        animate={{ opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="clouds" 
        animate={{ backgroundPosition: ["0 0", "300px 0"] }} 
        transition={{ duration: 200, repeat: Infinity, ease: "linear" }} 
      />
    </div>
  );
};

export default NightSky;
