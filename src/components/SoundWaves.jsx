import React from 'react';
import { motion } from 'framer-motion';

const SoundWaves = () => {
    const lineHeights = [1,1,1,1,1,1,2,3, 5, 10, 15, 20, 25, 30, 40, 30, 25, 20, 30, 20, 10, 5,
        2, 5, 10, 20, 30, 40, 50, 60, 65, 50, 45, 30, 25, 40, 30, 20, 10, 5,
        2, 5, 10, 20, 25, 30, 35, 30, 23, 20, 15, 10, 5, 3, 2, 1, 1, 1,];

    return (
        <div className="flex gap-1 justify-center items-end mt-5 sm:mt-0">
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
