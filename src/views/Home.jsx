import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ProjectInfoModal } from "../components/ProjectInfoModal";
import axios from 'axios';

export const Home = () => {
  const [slideInfo, setSlideInfo] = useState([]);
  const [clickedSlide, setClickedSlide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api_url = import.meta.env.VITE_BACKEND_URL;

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
        setSlideInfo(response.data);
      } catch (error) {
        console.error("Error fetching slides:", error);
        setError("Something went wrong while loading projects.");
      } finally {
        setLoading(false);
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

  const getFirstImage = (media) => {
    if (!Array.isArray(media)) return null;
    const image = media.find(item => item.type === 'image');
    return image ? image.url : null;
  };

  return (
    <>
      {loading ? (
        <div className="flex space-x-1 justify-center items-center mt-10 mb-4">
          <div className="h-5 w-1 bg-white animate-wave"></div>
          <div className="h-8 w-1 bg-white animate-wave delay-150"></div>
          <div className="h-3 w-1 bg-white animate-wave delay-300"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center mt-10">{error}</div>
      ) : clickedSlide === null ? (
        <div className="md:bg-custom-gradient focus:outline-none outline-none">
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            arrows={true}
            swipeable={true}
            draggable={true}
          >
            {slideInfo.map((slide, index) => {
              const imageUrl = getFirstImage(slide.media);
              return (
                <div key={index} className="flex justify-center items-center">
                  <div
                    className="md:relative flex flex-col md:items-center justify-center h-[60vh] md:h-[70vh] w-full max-w-[1350px] cursor-pointer md:mt-4"
                    onClick={() => handleSlideClick(index)}
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={`Image of ${slide.title}`}
                          loading="lazy"
                          className="md:absolute top-0 left-0 w-full h-full object-contain md:object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
                        />
                      ) : (
                        <div className="text-white text-center w-full h-full flex items-center justify-center bg-gray-800">
                          No Image
                        </div>
                      )}
                    </div>
                    <h3 className="text-white text-lg p-2 text-center">
                      {slide.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      ) : (
        <ProjectInfoModal project={slideInfo[clickedSlide]} handleCloseCard={handleCloseCard} />
      )}
    </>
  );
};
