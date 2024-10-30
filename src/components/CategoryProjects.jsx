import { useNavigate } from "react-router-dom";

export const CategoryProjects = () => {
  const navigate = useNavigate();

  const AudioDesignProj = [
    {
      title: "Echoes of Nature",
      work: "Sound Designer",
      info: "A captivating audio experience featuring natural soundscapes recorded in various environments, blending technology with the beauty of nature.",
      video: "https://www.youtube.com/embed/xyz1234",
      img: "https://blog.landr.com/wp-content/uploads/2024/04/Top-10-Best-DAW-Apps-for-Production-in-20242024Featured.png", 
    },
    {
      title: "City Symphony",
      work: "Audio Engineer",
      info: "An innovative audio project capturing the sounds of urban life, combining field recordings and musical elements to create a unique sound journey.",
      video: "https://www.youtube.com/embed/abc5678",
      img: "https://blog.landr.com/wp-content/uploads/2024/04/Top-10-Best-DAW-Apps-for-Production-in-20242024Featured.png", 
    },
    {
      title: "Whispers of the Forest",
      work: "Foley Artist",
      info: "A short film focused on the delicate sounds of the forest, meticulously crafted foley effects to enhance the viewer's experience.",
      video: "https://www.youtube.com/embed/def91011",
      img: "https://blog.landr.com/wp-content/uploads/2024/04/Top-10-Best-DAW-Apps-for-Production-in-20242024Featured.png", 
    },
    {
      title: "The Sound of Silence",
      work: "Mixing Engineer",
      info: "An immersive audio installation exploring the theme of silence and sound, utilizing innovative mixing techniques to evoke deep emotions.",
      video: "https://www.youtube.com/embed/ghi1213",
      img: "https://blog.landr.com/wp-content/uploads/2024/04/Top-10-Best-DAW-Apps-for-Production-in-20242024Featured.png",
    },
  ];


  return (
    <div className="bg-custom-gradient min-h-screen relative">
      <button 
        onClick={() => navigate("/projects")}
        className="absolute top-4 left-4 text-white text-sm font-semibold transition-opacity duration-200 hover:underline"
      >
        Back to Categories
      </button>
      <div className="flex flex-col items-center">
        <h1 className="text-white text-4xl font-bold mb-6">Audio Design</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {AudioDesignProj.map((project, index) => (
            <div 
              key={index} 
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 flex flex-col"
              style={{ height: '400px', cursor: "pointer" }}
            >
              <div 
                className="h-48 bg-center bg-no-repeat bg-cover" 
                style={{ backgroundImage: `url('${project.img}')` }}
              ></div>
              <div className="p-4 flex-grow">
                <h3 className="text-white text-lg font-semibold">{project.title}</h3>
                <p className="text-gray-300 text-sm">{project.work}</p>
                <p className="text-gray-400 text-xs mt-2">{project.info}</p>
                <a 
                  href={project.video} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-blue-400 hover:underline"
                >
                  Watch Video
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
