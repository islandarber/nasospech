import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ProjectInfoModal } from "../components/ProjectInfoModal";

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
              className="relative flex flex-col items-center justify-center h-[450px] sm:h-[600px] lg:h-[700px] cursor-pointer"
              onClick={() => handleSlideClick(index)}
            >
              
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1563860429-8a9ee43167bc?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8MTYlM0E5fGVufDB8fDB8fHww"
                  alt="proj"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>

              <h3 className="text-white text-xs p-1 text-center">
                {slide.title}
              </h3>

            </div>
          ))}
        </Carousel>
      ) : (
        //After clicking to show details of the featured project
        <ProjectInfoModal project={slideInfo[clickedSlide]} handleCloseCard={handleCloseCard} />
      )}
    </div>
  );
};
