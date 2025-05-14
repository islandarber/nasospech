import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProjectForm } from '../components/ProjectForm';
import { processProjects } from '../utils/thumbnailUtils';

export const Admin = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const api_url = import.meta.env.VITE_BACKEND_URL;

  // Fetch projects and categories on mount
  useEffect(() => {
  setLoading(true);

  Promise.all([
    axios.get(`${api_url}/projects`),
    axios.get(`${api_url}/categories`),
  ])
    .then(([projectsRes, categoriesRes]) => {
      const processedProjects = processProjects(projectsRes.data); // 👈 use the util here
      setProjects(processedProjects);
      setCategories(categoriesRes.data);
    })
    .catch(error => console.error('Error fetching data:', error))
    .finally(() => setLoading(false));
}, []);
;  
  
  // Open modals
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
    console.log(projectId);
  
    const previousProjects = [...projects];
    setProjects((prevProjects) => prevProjects.filter(project => project._id !== projectId));
  
    try {
      await axios.delete(`${api_url}/projects/${projectId}`);
      console.log('Project deleted successfully');
    } catch (error) {
      console.error('Error deleting project:', error);
      setProjects(previousProjects); // Rollback state
    }
  };

  // Close modals
  const closeModal = () => setIsModalOpen(false);

  

  return (
    <div className="p-8 text-white">
      <h1 className="text-6xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Add Project Button */}
      <button onClick={handleAddProject} className="bg-transparent text-4xl py-2 px-6 border border-white rounded hover:bg-gray-600 mb-4">
        Add New Project
      </button>
      {/* Project Overview */}
<div className="mt-10">
  <h1 className="text-5xl">Project Overview per Category</h1>
  {loading && (
  <div className="flex space-x-1 justify-center items-center mt-10 mb-4">
    <div className="h-5 w-1 bg-white animate-wave"></div>
    <div className="h-8 w-1 bg-white animate-wave delay-150"></div>
    <div className="h-3 w-1 bg-white animate-wave delay-300"></div>
  </div>
)}
  {error && <p className="text-red-500">{error}</p>}
  {categories.map(category => (
  <div key={category._id} className="mb-8 mt-8">
    <h2 className="text-2xl font-semibold">{category.name}</h2>
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {projects.filter(project => project.categories.some(cat => cat._id === category._id)).map(project => (
        <li key={project._id} className="border rounded-md shadow-md hover:shadow-lg cursor-pointer overflow-hidden">
          <div className="relative">
            {/* Project Image */}
            <img
              src={project.img}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            {/* Overlay with Buttons */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleEditProject(project)}
                className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProject(project._id)}
                className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
          {/* Project Title */}
          <div className="p-4">
            <h3 className="font-medium text-lg">{project.title}</h3>
          </div>
        </li>
      ))}
    </ul>
  </div>
))}

</div>

      {/* Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
            <ProjectForm project={selectedProject} closeModal={closeModal} setProjects={setProjects} />
          </div>
        </div>
      )}
    </div>
  );
};
