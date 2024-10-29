import React from "react";

const ProjectCard = ({ videoUrl, title, work, info, videoType, reverse }) => {
  return (
    <div className={`max-w-3xl mx-auto p-6 rounded-lg mb-8 shadow-lg text-sm flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} space-y-6 md:space-y-0 md:space-x-6`}>
      <a 
        href={videoUrl} 
        className="flex-shrink-0 w-full md:w-1/2"
        target="_blank" 
        rel="noopener noreferrer"
      >
        {videoType === 'iframe' ? (
          <iframe 
            className="w-full h-48 md:h-64 lg:h-80 object-cover rounded-lg" 
            src={videoUrl} 
            title={title} 
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture" 
            allowFullScreen
          />
        ) : (
          <img 
            className="w-full h-48 md:h-64 lg:h-80 object-cover rounded-lg" 
            src={videoUrl} 
            alt={title}
          />
        )}
      </a>
      <div className="w-full md:w-1/2 text-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">
          {title}
        </h2>
        <p className="mb-2"><strong>My Contributions:</strong> {work}</p>
        <p><strong>Key Details:</strong> {info}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
