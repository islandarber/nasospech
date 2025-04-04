import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import { ProjectInfoModal } from "../components/ProjectInfoModal";
import axios from "axios";

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
        if (!categoryId) return; // Ensure categoryId is available

        // Fetch projects for the specific category
        const response = await axios.get(
          `${api_url}/projects/category/${categoryId}`
        );
        setProjects(response.data);
        console.log(response.data); // Log the fetched projects
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [categoryId]); // Re-run when categoryName changes

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
      >
        <span>&#8592;</span> Back to Categories
      </button>

      <div className="flex flex-col items-center mt-2">
        {projects[0] && <>
          <h1 className="text-white text-4xl font-bold mb-6">{projects[0].category.name}</h1>
          <p className="text-gray-300 w-[250px] sm:w-full text-md max-w-lg text-center mb-8">
            Explore a selection of projects in the {projects[0].category.name} category.
          </p>
        </>}
        {loading ? (
          <div className="flex space-x-1 justify-center items-center mt-10 mb-4">
            <div className="h-5 w-1 bg-white animate-wave"></div>
            <div className="h-8 w-1 bg-white animate-wave delay-150"></div>
            <div className="h-3 w-1 bg-white animate-wave delay-300"></div>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 px-4 mt-10">
            {projects && projects.map((project, index) => (
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
        )}
      </div>

      {selectedProject && (
        <ProjectInfoModal project={selectedProject} handleCloseCard={handleCloseCard} />
      )}
    </div>
  );
};