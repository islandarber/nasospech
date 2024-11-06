import React from 'react';
import { motion } from 'framer-motion';

const SoundWaves = () => {
    const lineHeights = [1,1,1,1,1,1,2,3, 5, 10, 15, 20, 25, 30, 40, 30, 25, 20, 30, 20, 10, 5,
        2, 5, 10, 20, 30, 40, 50, 60, 65, 50, 45, 30, 25, 40, 30, 20, 10, 5,
        2, 5, 10, 15, 20, 30, 20, 15, 10, 15, 20, 25, 30, 40, 45, 50, 60, 70,
        65, 50, 55, 40, 20, 10, 30, 20, 15, 10, 5,
    ];

    return (
        <div className="flex gap-1 justify-center items-end">
            {lineHeights.map((height, index) => (
                <motion.div
                    key={index}
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: [1, 1.5, 1] }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        delay: index * 0.1,
                    }}
                    className="w-[3px] bg-white bg-opacity-30 origin-bottom"
                    style={{ height: `${height}px` }}
                />
            ))}
        </div>
    );
};

export default SoundWaves;
