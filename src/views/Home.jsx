import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const Home = () => {
  const [clickedSlide, setClickedSlide] = useState(null);

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

  const slideInfo = [
    {
      title:
        "''Insektensterben - Alles wird gut'' \n @Natural History Museum of Bern / Exhibition",
      info: "Audio design, Foley design, Ambience and Soundtrack\nImportant info: Exhibition running from 03.11.2023 to 31.05.2025",
      video: "https://www.youtube.com/embed/N1AXKNIDlzg",
    },
    {
      title: "A Pia (The Sink) [2023]  Short film / Audio Postproduction",
      info: "Audio cleanup, Audio and Foley design, Stereo and 5.1 Mixing/Mastering",
      video: "https://player.vimeo.com/video/837296390",
    },
    {
      title: "RIAS choir performance @ Philharmonie Berlin / Commercial video",
      info: "Audio recording, Audio design and postproduction, Stereo and 5.1 Mixing/Mastering Important info: Aired in all Yorck Kinos Berlin for 2 months",
      video: "https://www.youtube.com/watch?v=j5rS3qjs3aw&list=LL&index=17",
    },
  ];

  const handleSlideClick = (index) => {
    setClickedSlide(index);
  };

  const handleCloseCard = () => {
    setClickedSlide(null);
  };

  return (
    <div className="bg-custom-gradient h-screen">
      {/* Carousel */}
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
              className="relative flex flex-col items-center justify-center h-[400px] lg:h-[550px] cursor-pointer"
              onClick={() => handleSlideClick(index)}
            >
              {/* Image */}
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src="/src/assets/wall.jpg"
                  alt="proj"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                </div>
              {/* Title underneath the image */}
              <h3 className="text-white text-xs p-1 text-center">
                {slide.title}
              </h3>
            </div>
          ))}
        </Carousel>
      ) : (
        //After clicking to show details of the featured project
        <div className="absolute inset-0 flex bg-black bg-opacity-80 p-4">
          <div className="flex flex-col md:flex-row max-w-4xl mx-auto bg-black bg-opacity-90 p-4 rounded-lg relative">
            <button
              className="absolute top-2 right-2 text-white text-2xl font-bold"
              onClick={handleCloseCard}
            >
              ×
            </button>
            <div className="flex-1 mb-4 md:mb-0 md:mr-4 flex items-center justify-center">
              <iframe
                className="w-full h-full md:w-[600px] md:h-[337px] aspect-w-16 aspect-h-9"
                src={slideInfo[clickedSlide].video}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Project Video"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center text-center md:text-left">
              <h3 className="text-xl text-white font-bold mb-2">
                {slideInfo[clickedSlide].title}
              </h3>
              <p className="text-white">{slideInfo[clickedSlide].info}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
