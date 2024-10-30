import React from 'react';
import { motion } from 'framer-motion';

const SoundWaves = () => {
    // Array of heights to create more lines, including shorter ones on the left
    const lineHeights = [2,5,10,20,30,40,50,80,90,70,60,50,45,40,30,20,10,5,2,5,10,15,20,30,20,15,10, 15, 20, 25, 30, 40, 60, 80, 100, 120, 100, 80, 60, 40, 20, 60, 80, 20,15, 10 , 5];

    return (
        <div
            style={{
                display: 'flex',
                gap: '3px',
                justifyContent: 'center',
                alignItems: 'flex-end', // Aligns the base of each line at the bottom
            }}
        >
            {lineHeights.map((height, index) => (
                <motion.div
                    key={index}
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: [1, 1.5, 1] }} // Scale up and down to simulate movement
                    transition={{
                        duration: 2, // Slower and smoother animation
                        ease: "easeInOut", // Smooth easing for natural flow
                        delay: index * 0.1, // Staggered delay
                    }}
                    style={{
                        width: '5px',
                        backgroundColor: 'white',
                        height: `${height}px`, // Fixed height as the base
                        transformOrigin: 'bottom', // Anchor at the bottom
                    }}
                />
            ))}
        </div>
    );
};

export default SoundWaves;
