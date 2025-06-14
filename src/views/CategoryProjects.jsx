import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectInfoModal } from "../components/ProjectInfoModal";
import axios from "axios";
import { getThumbnail } from "../utils/thumbnailUtils";

export const CategoryProjects = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const api_url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        if (!categoryId) return;

        const response = await axios.get(
          `${api_url}/projects/category/${categoryId}`
        );

        const updatedProjects = response.data
          .map(project => {
            const firstImage = project.media.find(item => item.type === 'image');
            const firstVideo = project.media.find(item => item.type === 'video');
            const fallbackThumbnail = firstVideo ? getThumbnail(firstVideo.url) : null;

            return {
              ...project,
              img: firstImage ? firstImage.url : fallbackThumbnail
            };
          })
          .sort((a, b) => a.priority - b.priority);

        setProjects(updatedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [categoryId]);

  const handleClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseCard = () => {
    setSelectedProject(null);
  };

  return (
    <div className="bg-transparent min-h-screen relative font-poiretone">
      <button
        onClick={() => navigate("/projects")}
        className="text-white text-xs sm:text-sm font-semibold transition-opacity duration-200 hover:opacity-70 ml-2"
      >
        <span>&#8592;</span> Back to Categories
      </button>

      <div className="flex flex-col items-center mt-2">
        {projects[0] && (
          <>
            <h1 className="text-white text-4xl font-bold mb-6">
              {projects[0].categories[0].name}
            </h1>
            <p className="text-gray-300 w-[250px] sm:w-full text-lg max-w-lg text-center mb-8">
              Explore a selection of projects in the {projects[0].categories[0].name} category.
            </p>
          </>
        )}

        {loading ? (
          <div className="flex space-x-4 justify-center items-center mt-10 mb-4">
            <div className="h-5 w-1 bg-white animate-wave"></div>
            <div className="h-8 w-1 bg-white animate-wave delay-150"></div>
            <div className="h-3 w-1 bg-white animate-wave delay-300"></div>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-300 text-center mt-10">No projects found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 px-4 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <div
                key={index}
                onClick={() => handleClick(project)}
                className="relative bg-transparent rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:cursor-pointer flex flex-col items-center w-full h-[350px]"
              >
                <div className="w-full h-full flex items-center justify-center">
                  {project.img ? (
                    <img
                      src={project.img}
                      alt={project.title}
                      loading="lazy"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-white text-center">No Image</div>
                  )}
                </div>

                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 flex items-center justify-center transition-opacity duration-300 hover:opacity-100">
                  <h3 className="text-white text-lg font-semibold text-center px-2">
                    {project.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedProject && (
        <ProjectInfoModal project={selectedProject} handleCloseCard={handleCloseCard} />
      )}
    </div>
  );
};
