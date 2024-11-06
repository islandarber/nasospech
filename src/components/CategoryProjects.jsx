import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectInfoModal } from "./ProjectInfoModal";

export const CategoryProjects = () => {
  const navigate = useNavigate();

  const [selectedProject, setSelectedProject] = useState(null);

  const AudioDesignProj = [
    {
      title: "Echoes of Nature",
      work: "Sound Designer",
      info: "A captivating audio experience featuring natural soundscapes recorded in various environments, blending technology with the beauty of nature.",
      video: "https://www.youtube.com/embed/xyz1234",
      img: "https://www.youtube.com/embed/--LUL5ri-FY?si=jlozv28iwZn5X5C8",
    },
    {
      title: "City Symphony",
      work: "Audio Engineer",
      info: "An innovative audio project capturing the sounds of urban life, combining field recordings and musical elements to create a unique sound journey.",
      video: "https://www.youtube.com/embed/--LUL5ri-FY?si=jlozv28iwZn5X5C8",
      img: "https://images.squarespace-cdn.com/content/v1/52afa15ce4b042c7f0089b22/1636990402970-26XQFASTQUXFQUDDI0UY/SKYSCRAPER+SYMPHONY3.jpeg",
    },
    {
      title: "Whispers of the Forest",
      work: "Foley Artist",
      info: "A short film focused on the delicate sounds of the forest, meticulously crafted foley effects to enhance the viewer's experience.",
      video: "https://www.youtube.com/embed/--LUL5ri-FY?si=jlozv28iwZn5X5C8",
      img: "https://i.ytimg.com/vi/5_qMEY8Vdeg/maxresdefault.jpg",
    },
    {
      title: "The Sound of Silence",
      work: "Mixing Engineer",
      info: "An immersive audio installation exploring the theme of silence and sound, utilizing innovative mixing techniques to evoke deep emotions.",
      video: "https://www.youtube.com/embed/--LUL5ri-FY?si=jlozv28iwZn5X5C8",
      img: "https://i.scdn.co/image/ab67616d0000b273efdd027223403ba22b6a62f1",
    },
    {
      title: "Echoes of Nature",
      work: "Sound Designer",
      info: "A captivating audio experience featuring natural soundscapes recorded in various environments, blending technology with the beauty of nature.",
      video: "https://www.youtube.com/embed/xyz1234",
      img: "https://i.ytimg.com/vi/W61e-qTaVgU/sddefault.jpg",
    },
    {
      title: "City Symphony",
      work: "Audio Engineer",
      info: "An innovative audio project capturing the sounds of urban life, combining field recordings and musical elements to create a unique sound journey.",
      video: "https://www.youtube.com/embed/abc5678",
      img: "https://images.squarespace-cdn.com/content/v1/52afa15ce4b042c7f0089b22/1636990402970-26XQFASTQUXFQUDDI0UY/SKYSCRAPER+SYMPHONY3.jpeg",
    },
    {
      title: "Whispers of the Forest",
      work: "Foley Artist",
      info: "A short film focused on the delicate sounds of the forest, meticulously crafted foley effects to enhance the viewer's experience.",
      video: "https://www.youtube.com/embed/def91011",
      img: "https://i.ytimg.com/vi/5_qMEY8Vdeg/maxresdefault.jpg",
    },
    {
      title: "The Sound of Silence",
      work: "Mixing Engineer",
      info: "An immersive audio installation exploring the theme of silence and sound, utilizing innovative mixing techniques to evoke deep emotions.",
      video: "https://www.youtube.com/embed/ghi1213",
      img: "https://i.scdn.co/image/ab67616d0000b273efdd027223403ba22b6a62f1",
    },
  ];

  const handleClick = (project) => {
    setSelectedProject(project); // Set selected project on click
  };

  const handleCloseCard = () => {
    setSelectedProject(null); // Close modal by clearing selected project
  };

  return (
    <div className="bg-custom-gradient min-h-screen relative">

      <button
        onClick={() => navigate("/projects")}
        className="text-white text-xs sm:text-sm font-semibold transition-opacity duration-200 hover:opacity-70 ml-2"
      ><span>&#8592;</span>
        Back to Categories
      </button>
      
      <div className="flex flex-col items-center mt-2">
        <h1 className="text-white text-4xl font-bold mb-6">Audio Design</h1>
        <p className="text-gray-300 w-[250px] sm:w-full text-xs max-w-lg text-center mb-8">
          Explore a selection of audio design projects showcasing innovative soundscapes, foley effects, and mixing techniques.
        </p>

        {/* Embedded YouTube video */}
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/zFWPE9kfOZs?si=UxVTGdfNWPhNg_Nu"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="mb-4"
        ></iframe>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 px-4 mt-10">
          {AudioDesignProj.map((project, index) => (
            <div
              key={index}
              className="bg-gray-800 h-[200px] rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:cursor-pointer flex flex-col"
              onClick={() => handleClick(project)}
            >
              {/* Thumbnail container */}
              <div
                className="h-full bg-center bg-cover overflow-hidden relative"
                style={{ backgroundImage: `url('${project.img}')` }}
              ></div>

              {/* Project details */}
              <div className="p-4 flex-grow">
                <h3 className="text-white text-[0.7em] font-semibold">{project.title}</h3>
                <p className="text-gray-400 text-[0.5em] mt-2">{project.info}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectInfoModal project={selectedProject} handleCloseCard={handleCloseCard} />
      )}
    </div>
  );
};
