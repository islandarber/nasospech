import { motion } from 'framer-motion';

export const SoundWaves = () => {
  return (
    <svg width="200" height="100" viewBox="0 0 200 100">
      <motion.path
        d="M0,50 C50,10 150,90 200,50"
        stroke="white"
        strokeWidth="2"
        fill="none"
        animate={{
          pathLength: [0, 1],
          opacity: [0, 1],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
      />
      <motion.path
        d="M0,60 C50,20 150,100 200,60"
        stroke="white"
        strokeWidth="2"
        fill="none"
        animate={{
          pathLength: [0, 1],
          opacity: [0, 1],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          delay: 0.5, // Delay for the second wave
        }}
      />
      <motion.path
        d="M0,40 C50,0 150,80 200,40"
        stroke="white"
        strokeWidth="2"
        fill="none"
        animate={{
          pathLength: [0, 1],
          opacity: [0, 1],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          delay: 1, // Delay for the third wave
        }}
      />
    </svg>
  );
};

