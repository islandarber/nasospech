import { useEffect, useState } from 'react';
import api from '../api/axios';
import { ProjectForm } from '../components/ProjectForm';
import { CategoryManager } from '../components/CategoryManager';
import { withPreviews } from '../utils/thumbnailUtils';

export const Admin = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);

    Promise.all([
      api.get(`/projects`),
      api.get(`/categories`),
    ])
      .then(([projectsRes, categoriesRes]) => {
        setProjects(withPreviews(projectsRes.data));
        setCategories(categoriesRes.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError("Something went wrong while loading the data.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAddProject = () => {
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    const previousProjects = [...projects];
    setProjects(prevProjects => prevProjects.filter(p => p._id !== projectId));

    try {
      await api.delete(`/projects/${projectId}`);
    } catch (error) {
      console.error('Error deleting project:', error);
      setError("Failed to delete project. Please try again.");
      setProjects(previousProjects);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-8 text-white">
      <h1 className="text-6xl font-bold mb-8">Admin Dashboard</h1>

      <button onClick={handleAddProject} className="bg-transparent text-4xl py-2 px-6 border border-white rounded hover:bg-gray-600 mb-4">
        Add New Project
      </button>

      <CategoryManager categories={categories} setCategories={setCategories} />

      <div className="mt-10">
        <h1 className="text-5xl">Project Overview per Category</h1>
        {loading && (
          <div className="flex space-x-1 justify-center items-center mt-10 mb-4">
            <div className="h-5 w-1 bg-white animate-wave"></div>
            <div className="h-8 w-1 bg-white animate-wave delay-150"></div>
            <div className="h-3 w-1 bg-white animate-wave delay-300"></div>
          </div>
        )}
        {error && <p className="text-red-500 text-center mt-6">{error}</p>}
        {categories.map(category => {
          const filteredProjects = projects.filter(p => p.categories.some(cat => cat._id === category._id));
          return (
            <div key={category._id} className="mb-8 mt-8">
              <h2 className="text-2xl font-semibold">{category.name}</h2>
              {filteredProjects.length === 0 && !loading && (
                <p className="text-gray-300 mt-2">No projects in this category.</p>
              )}
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {filteredProjects.map(project => (
                  <li key={project._id} className="border rounded-md shadow-md hover:shadow-lg overflow-hidden flex flex-col">
                    <img src={project.preview} alt={project.title || 'Project preview'} className="w-full h-48 object-cover" />
                    <div className="p-4 flex items-center justify-between gap-2">
                      <h3 className="font-medium text-lg truncate">{project.title}</h3>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => handleEditProject(project)} className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600">
                          Edit
                        </button>
                        <button onClick={() => handleDeleteProject(project._id)} className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600">
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <ProjectForm project={selectedProject} closeModal={closeModal} setProjects={setProjects} />
      )}
    </div>
  );
};
