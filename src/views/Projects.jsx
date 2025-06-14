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

  const api_url = import.meta.env.VITE_BACKEND_URL;

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
        const response = await axios.get(`${api_url}/categories`);
        const categoriesWithImages = response.data.map((category) => ({
          ...category,
          imgPath: categoryImages[category.name] || "",
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
    <div className="bg-custom-gradient font-poiretone">
      {/* Header Section */}
      <div className="sm:mx-10 px-4 py-6">
        {/* Centered title */}
        <h1 className="text-white text-3xl font-bold text-center mb-6">
          Projects
        </h1>

        {/* Text and SoundWaves */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-32">
          <p className="text-white text-md tracking-wider text-center sm:text-left sm:max-w-xl">
            Explore my portfolio by browsing projects tailored to each of my specialized services.
          </p>
          <SoundWaves />
        </div>
      </div>

      {/* Category List */}
      {loading ? (
        <div className="flex space-x-1 justify-center items-center mb-4" aria-label="Loading...">
          <div className="h-5 w-1 bg-white animate-wave"></div>
          <div className="h-8 w-1 bg-white animate-wave delay-150"></div>
          <div className="h-3 w-1 bg-white animate-wave delay-300"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center mt-10" role="alert">{error}</p>
      ) : (
        <div className="p-2 mt-4">
          {categories.map((category, index) => (
            <Link to={`/projects/${category._id}`} key={index} aria-label={`View projects in ${category.name}`} tabIndex={0}>
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
                  scale: 0.90,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
                role="button"
              >
                <h2 className="text-4xl text-white mb-1" aria-label={category.name}>{category.name}</h2>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
