import React, { useEffect, useRef, useState } from 'react';
import { getThumbnail } from '../utils/thumbnailUtils';

export const ProjectInfoModal = ({ project, handleCloseCard }) => {
  if (!project || !project.media || project.media.length === 0) return null;

  const [activeIndex, setActiveIndex] = useState(0);
  const modalRef = useRef(null);

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

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleCloseCard();
    } else if (e.key === 'ArrowLeft') {
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  };

  useEffect(() => {
    const current = modalRef.current;
    if (current) {
      current.focus();
    }
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 p-4 z-50 overflow-auto"
      role="dialog"
      aria-modal="true"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      ref={modalRef}
    >
      <div className="flex flex-col md:flex-row w-[90vw] max-w-[1400px] max-h-[90vh] overflow-auto bg-black bg-opacity-90 p-4 md:p-5 gap-4 md:gap-6 rounded-lg relative">
        <button
          className="absolute top-2 right-2 text-white text-xl md:text-2xl font-bold z-50"
          onClick={handleCloseCard}
        >
          ×
        </button>

        {/* Left Section (Media) */}
        <div className="w-full md:w-2/3 flex flex-col items-center justify-center">
          <div className="relative mb-4 w-full max-h-[300px] md:max-h-[500px] lg:max-h-[700px] flex justify-center items-center">
            {project.media[activeIndex].type === 'image' ? (
              <img
                src={project.media[activeIndex].url}
                alt={`media-${activeIndex}`}
                className="rounded-lg shadow-md max-w-full h-auto object-contain max-h-[300px] md:max-h-[500px] lg:max-h-[600px]"
                loading="lazy"
              />
            ) : (
              <iframe
                className="w-full h-[200px] md:h-[350px] lg:h-[500px]"
                src={project.media[activeIndex].url}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                title={`video-${activeIndex}`}
              />
            )}
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-2xl md:text-3xl px-2 z-30"
              onClick={goToPrevious}
            >
              ❮
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-2xl md:text-3xl px-2 z-30"
              onClick={goToNext}
            >
              ❯
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-2 md:mt-4">
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
                    className="w-16 h-14 md:w-20 md:h-16"
                    loading="lazy"
                  />
                ) : (
                  <div className="relative w-16 h-14 md:w-20 md:h-16">
                    <img
                      src={getThumbnail(item.url)}
                      alt={`thumb-${index}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white bg-opacity-75 rounded-full p-1">
                        <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24">
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

        {/* Right Section (Info) */}
        <div className="w-full md:w-1/3 flex flex-col gap-16 text-left mt-4 md:ml-2 text-sm md:text-base lg:text-lg">
          <div>
            <h3 className="text-lg flex flex-col md:text-2xl text-white font-bold">
              {project.title}
            </h3>
            <div className='mt-12'>
              <h4 className="text-gray-300 font-semibold mb-1">About</h4>
              <p className="text-white leading-relaxed whitespace-pre-wrap break-words">{project.info}</p>
            </div>
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
