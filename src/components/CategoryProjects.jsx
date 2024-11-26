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
      img: "https://images.squarespace-cdn.com/content/v1/61c4da8eb1b30a201b9669f2/e2e0e62f-0064-4f86-b9d8-5a55cb7110ca/Korembi-January-2024.jpg",
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
      img: "https://images.squarespace-cdn.com/content/v1/61c4da8eb1b30a201b9669f2/e2e0e62f-0064-4f86-b9d8-5a55cb7110ca/Korembi-January-2024.jpg",
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
        <p className="text-gray-300 w-[250px] sm:w-full text-md max-w-lg text-center mb-8">
          Explore a selection of audio design projects showcasing innovative soundscapes, foley effects, and mixing techniques.
        </p>

        <div
              className="bg-transparent w-[90%] sm:w-[600px] h-[300px] sm:h-[400px] rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:cursor-pointer flex flex-col"
            >
              {/* Thumbnail container */}
              <div
                className="h-full bg-center bg-cover overflow-hidden relative"
                style={{ backgroundImage: `url(https://images.squarespace-cdn.com/content/v1/61c4da8eb1b30a201b9669f2/e2e0e62f-0064-4f86-b9d8-5a55cb7110ca/Korembi-January-2024.jpg)` }}
              ></div>
              <h2 className="text-white text-center">The title of the image project here</h2>
            </div>
        {/* Embedded YouTube video */}
        {/* <iframe
          width="85%"
          height="400"
          src="https://www.youtube.com/embed/zFWPE9kfOZs?si=UxVTGdfNWPhNg_Nu"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="mb-4"
        ></iframe> */}

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 px-4 mt-10">
        {AudioDesignProj.map((project, index) => (
        <div
          key={index}
          className="relative bg-gray-400 bg-opacity-20 w-[300px] h-[300px] rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:cursor-pointer flex flex-col"
          onClick={() => handleClick(project)}
        >
          {/* Thumbnail container */}
          <div
            className="h-full bg-center bg-cover overflow-hidden"
            style={{ backgroundImage: `url('${project.img}')` }}
          ></div>

          {/* Title on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 flex items-center justify-center transition-opacity duration-300 hover:opacity-100">
            <h3 className="text-white text-lg font-semibold text-center px-2">
              {project.title}
            </h3>
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
