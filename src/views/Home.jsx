import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ProjectInfoModal } from "../components/ProjectInfoModal";
import axios from 'axios';
import { processProjects } from "../utils/thumbnailUtils"; 

export const Home = () => {
  const [slideInfo, setSlideInfo] = useState([]); // Ensure slideInfo is initialized as an empty array
  const [clickedSlide, setClickedSlide] = useState(null);

  const api_url = import.meta.env.VITE_BACKEND_URL; 

  // Responsive settings for the carousel
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
  const fetchSlides = async () => {
    try {
      const response = await axios.get(`${api_url}/projects/featured`);
      const processedSlides = processProjects(response.data); // 👈 apply utility
      setSlideInfo(processedSlides);
    } catch (error) {
      console.error("Error fetching slides:", error);
    }
  };

  fetchSlides();
}, []);

  const handleSlideClick = (index) => {
    setClickedSlide(index);
  };

  const handleCloseCard = () => {
    setClickedSlide(null);
  };

  return (
    <div className="bg-custom-gradient h-screen">
      {clickedSlide === null ? (
        <Carousel
          responsive={responsive}
          infinite={true} // Allows infinite scrolling
          autoPlay={true} // Enable autoplay
          autoPlaySpeed={3000} // Speed of autoplay
          arrows={true} // Show arrows
          swipeable={true} // Allow swipe gestures
          draggable={true} // Allow drag gestures
          className="shadow-lg ml-4 mr-4 rounded-lg"
        >
          {slideInfo.map((slide, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center justify-center h-[80vh] cursor-pointer"
              onClick={() => handleSlideClick(index)}
            >
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={slide.img} // Use the image from the slide data
                  alt="proj"
                  className="absolute top-0 left-0 w-full h-full object-contained transition-transform duration-500 ease-in-out transform hover:scale-105"
                />
              </div>

              <h3 className="text-white text-xs p-1 text-center">
                {slide.title} {/* Display the title of the slide */}
              </h3>
            </div>
          ))}
        </Carousel>
      ) : (
        // After clicking to show details of the featured project
        <ProjectInfoModal project={slideInfo[clickedSlide]} handleCloseCard={handleCloseCard} />
      )}
    </div>
  );
};
