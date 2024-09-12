import React from "react";
import ProjectCard from "../components/ProjectCard";

export const Home = () => {
  return (
    <div className="font-Montserrat mt-10">
      <ProjectCard 
        videoUrl="https://www.youtube.com/embed/j5rS3qjs3aw"
        title="RIAS Choir Performance @ Philharmonie Berlin / Commercial Video"
        work="Audio recording, Audio design and postproduction, Stereo and 5.1 Mixing/Mastering"
        info="Aired in all Yorck Kinos Berlin for 2 months"
        videoType="iframe"
        reverse={false} // First card, normal layout
      />
       <div className="my-8 flex justify-center">
        <hr className="w-1/2 border-t border-gray-300" />
      </div>
      <ProjectCard 
        videoUrl="https://www.youtube.com/embed/N1AXKNIDlzg"
        title="Insektensterben - Alles wird gut @ Natural History Museum of Bern / Exhibition"
        work="Audio design, Foley design, Ambience and Soundtrack"
        info="Exhibition running from 03.11.2023 to 31.05.2025"
        videoType="iframe"
        reverse={true} // Second card, reversed layout
      />
       <div className="my-8 flex justify-center">
        <hr className="w-1/2 border-t border-gray-300" />
      </div>
      <ProjectCard 
        videoUrl="https://player.vimeo.com/video/837296390"
        title="A Pia (The Sink) [2023] Short Film / Audio Postproduction"
        work="Audio cleanup, Audio and Foley design, Stereo and 5.1 Mixing/Mastering"
        info="Available on Vimeo"
        videoType="iframe"
        reverse={false} // Third card, normal layout
      />
    </div>
  );
};
