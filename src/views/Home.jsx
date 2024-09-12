import React from "react";

export const Home = () => {
  return (
    <div className="font-Montserrat">
      {/* RIAS Choir Performance */}
      <div className="max-w-3xl mx-auto p-6 rounded-lg bg-gray-700 bg-opacity-40 flex items-start space-x-6 mb-8 shadow-lg border border-gray-600">
        <iframe 
          className="w-1/2 h-64 object-cover rounded-lg" 
          src="https://www.youtube.com/embed/j5rS3qjs3aw" 
          title="RIAS Choir Performance" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen>
        </iframe>
        <div className="w-1/2 text-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">
            RIAS Choir Performance @ Philharmonie Berlin / Commercial Video
          </h2>
          <p className="mb-2"><strong>My work:</strong> Audio recording, Audio design and postproduction, Stereo and 5.1 Mixing/Mastering</p>
          <p><strong>Important info:</strong> Aired in all Yorck Kinos Berlin for 2 months</p>
        </div>
      </div>

      {/* Insektensterben - Alles wird gut */}
      <div className="max-w-3xl mx-auto p-6 rounded-lg bg-gray-700 bg-opacity-50 flex items-start space-x-6 mb-8 shadow-lg border border-gray-600">
        <a 
          href="https://youtu.be/N1AXKNIDlzg" 
          className="w-1/2" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <iframe 
            className="w-full h-64 object-cover rounded-lg" 
            src="https://www.youtube.com/embed/N1AXKNIDlzg" 
            title="Insektensterben Exhibition Video" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
        </a>
        <div className="w-1/2 text-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">
            Insektensterben - Alles wird gut @ Natural History Museum of Bern / Exhibition
          </h2>
          <p className="mb-2"><strong>My work:</strong> Audio design, Foley design, Ambience and Soundtrack</p>
          <p><strong>Important info:</strong> Exhibition running from 03.11.2023 to 31.05.2025</p>
        </div>
      </div>

      {/* A Pia (The Sink) */}
      <div className="max-w-3xl mx-auto p-6 rounded-lg bg-gray-700 bg-opacity-50 flex items-start space-x-6 mb-8 shadow-lg border border-gray-600">
        <a 
          href="https://vimeo.com/837296390" 
          className="w-1/2" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <iframe 
            className="w-full h-64 object-cover rounded-lg" 
            src="https://player.vimeo.com/video/837296390" 
            title="A Pia (The Sink) Short Film" 
            allow="autoplay; fullscreen; picture-in-picture" 
            allowFullScreen>
          </iframe>
        </a>
        <div className="w-1/2 text-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">
            A Pia (The Sink) [2023] Short Film / Audio Postproduction
          </h2>
          <p className="mb-2"><strong>My work:</strong> Audio cleanup, Audio and Foley design, Stereo and 5.1 Mixing/Mastering</p>
          <p><strong>Important info:</strong> Available on Vimeo</p>
        </div>
      </div>
    </div>
  );
};
