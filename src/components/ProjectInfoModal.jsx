import React, { useState} from 'react';

export const ProjectInfoModal = ({ project, handleCloseCard }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleVideoLoad = () => {
    setIsLoading(false);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 p-4 z-50">
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto bg-black bg-opacity-90 p-6 rounded-lg relative">
        <button
          className="absolute top-2 right-2 text-white text-2xl font-bold"
          onClick={handleCloseCard}
        >
          ×
        </button>
        <div className="flex-1 mb-4 md:mb-0 md:mr-4 flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 flex items-center gap-2 justify-center bg-black bg-opacity-50">
              <div className="h-5 w-1 bg-white animate-wave"></div>
              <div className="h-8 w-1 bg-white animate-wave delay-150"></div>
              <div className="h-3 w-1 bg-white animate-wave delay-300"></div>
            </div>
          )}
          <iframe
            className="w-full h-56 sm:h-64 md:w-[700px] md:h-[400px] lg:w-[800px] lg:h-[450px]"
            src={project.video}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Project Video"
            onLoad={handleVideoLoad}
          />
        </div>
        <div className="flex-1 flex flex-col justify-center text-center md:text-left">
          <h3 className="text-xl sm:text-2xl text-white font-bold mb-4">
            {project.title}
          </h3>
          <p className="text-white text-base sm:text-lg text-lg">{project.info}</p>
        </div>
      </div>
    </div>
  );
};
