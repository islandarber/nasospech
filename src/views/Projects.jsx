import SoundWaves from "../components/SoundWaves";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import soundDesignImage from "../assets/Categories/sounddesign4.jpg";
import postProdImage from "../assets/Categories/postprod 2.jpg";
import audioRecordImage from "../assets/Categories/rec 1.jpg";
import compositionImage from "../assets/Categories/composition 2.jpg";
import audioEngineerImage from "../assets/Categories/install 2.jpg";
import axios from 'axios';
import { useState, useEffect } from 'react';

export const Projects = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Map category names to their corresponding images
  const categoryImages = {
    "Audio Design": soundDesignImage,
    "Audio Postproduction": postProdImage,
    "Audio Recording": audioRecordImage,
    "Film Scoring": compositionImage,
    "Audio Engineering / Installations": audioEngineerImage,
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/categories');

        // Add the corresponding image to each category
        const categoriesWithImages = response.data.map((category) => ({
          ...category,
          imgPath: categoryImages[category.name] || "", // Add the image or leave empty if not found
        }));

        setCategories(categoriesWithImages);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-custom-gradient min-h-screen font-poiretone">
      <div className="sm:flex justify-between gap-20 mr-4 sm:ml-10 sm:mr-10">
        <div className="ml-4 sm:ml-12">
          <h1 className="text-white text-center sm:text-left text-4xl font-bold">Projects</h1>
          <p className="text-white text-center sm:text-left text-md w-full mt-2 tracking-wider ">
            Explore my portfolio by browsing projects tailored to each of my specialized services.
          </p>
        </div>
        <SoundWaves />
      </div>

      {loading ? (
          <div className="flex space-x-1 justify-center items-center mt-10 mb-4">
            <div className="h-5 w-1 bg-white animate-wave"></div>
            <div className="h-8 w-1 bg-white animate-wave delay-150"></div>
            <div className="h-3 w-1 bg-white animate-wave delay-300"></div>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
        <div className="p-2 mt-4">
        {categories.map((category, index) => (
          <Link to={`/projects/${category._id}`} key={index}>
            <motion.div
              className={`bg-transparent rounded-lg shadow-md p-4 flex items-center 
                ${index % 2 === 0 ? 'justify-start' : 'justify-end'}
                min-h-12 md:min-h-36 lg:min-h-48`}
              style={{
                cursor: "pointer",
                background: `
                  linear-gradient(
                    to ${index % 2 === 0 ? 'left' : 'right'}, 
                    rgba(0, 0, 0, 0) 20%, 
                    rgba(0, 0, 0, 0.6) 30%,
                    rgba(0, 0, 0, 0.9) 50%,
                    rgba(0, 0, 0, 1) 100%
                  ),
                  url(${category.imgPath})
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              whileHover={{
                scale: 0.90, // Makes the div 5% larger on hover
              }}
              transition={{
                duration: 0.2, // Smooth transition duration
                ease: "easeInOut", // Easing effect
              }}
            >
              <h2 className={`text-4xl text-white mb-1`}>{category.name}</h2>
            </motion.div>
          </Link>
        ))}
      </div>)}
    </div>
  );
};