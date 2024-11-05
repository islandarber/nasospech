import { useNavigate } from "react-router-dom";

export const CategoryProjects = () => {
  const navigate = useNavigate();

  const AudioDesignProj = [
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
                className="h-48 bg-center bg-no-repeat bg-cover overflow-hidden relative" 
                style={{ backgroundImage: `url('${project.img}')`, backgroundSize: 'cover' }}
              >
                <img 
                  src={project.img} 
                  alt="Project"
                  className="absolute top-1/2 left-1/2 w-auto h-full min-w-full min-h-full transform -translate-x-1/2 -translate-y-1/2"
                />
              </div>

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
