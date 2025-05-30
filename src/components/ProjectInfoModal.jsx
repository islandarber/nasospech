import React, { useState } from 'react';
import { getThumbnail } from '../utils/thumbnailUtils';

export const ProjectInfoModal = ({ project, handleCloseCard }) => {
  if (!project || !project.media || project.media.length === 0) return null;

  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? project.media.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === project.media.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 p-4 z-50 overflow-y-auto">
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto bg-black bg-opacity-90 p-4 rounded-lg relative w-full">
        <button
          className="absolute top-2 right-2 text-white text-2xl font-bold z-50"
          onClick={handleCloseCard}
        >
          ×
        </button>

        {/* Media display */}
        <div className="w-full md:w-2/3 flex flex-col items-center justify-center">
          <div className="relative main-image-container mb-4 w-full max-h-[400px] flex justify-center items-center">
            {project.media[activeIndex].type === 'image' ? (
              <img
                src={project.media[activeIndex].url}
                alt={`media-${activeIndex}`}
                className="rounded-lg shadow-md max-w-full h-auto max-h-[400px] object-contain"
              />
            ) : (
              <iframe
                className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]"
                src={project.media[activeIndex].url}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                title={`video-${activeIndex}`}
              />
            )}
            {/* Arrow Buttons */}
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-3xl px-2 z-30"
              onClick={goToPrevious}
            >
              ❮
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-3xl px-2 z-30"
              onClick={goToNext}
            >
              ❯
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {project.media.map((item, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-md overflow-hidden border ${
                  activeIndex === index ? 'border-white scale-105' : 'border-gray-600'
                } transition-transform duration-200`}
                onClick={() => setActiveIndex(index)}
              >
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={`thumb-${index}`}
                    className="w-20 h-16 object-cover"
                  />
                ) : (
                  <div className="relative w-20 h-16">
                    <img
                      src={getThumbnail(item.url)}
                      alt={`thumb-${index}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white bg-opacity-75 rounded-full p-1">
                        <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Text Info */}
        <div className="w-full md:w-1/3 flex flex-col justify-start text-left mt-6 md:mt-0 md:ml-4 space-y-3 text-sm sm:text-base">
          <h3 className="text-xl sm:text-2xl text-white font-bold">
            {project.title}
          </h3>

          <div>
            <h4 className="text-gray-300 font-semibold mb-1">About</h4>
            <p className="text-white leading-relaxed whitespace-pre-wrap break-words">{project.info}</p>
          </div>

          <div>
            <h4 className="text-gray-300 font-semibold mb-1">Roles</h4>
            <p className="text-white italic whitespace-pre-wrap break-words">{project.roles}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

