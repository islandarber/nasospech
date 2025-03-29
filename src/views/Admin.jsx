import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProjectForm } from '../components/ProjectForm';

export const Admin = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch projects and categories on mount
  useEffect(() => {
    axios.get('http://localhost:8000/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching projects:', error));

    axios.get('http://localhost:8000/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  console.log(projects);
  
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
      await axios.delete(`http://localhost:8000/projects/${projectId}`);
      console.log('Project deleted successfully');
    } catch (error) {
      console.error('Error deleting project:', error);
      setProjects(previousProjects); // Rollback state
    }
  };

  const handleAddCategory = () => {
    setIsCategoryModalOpen(true);
  };

  // Close modals
  const closeModal = () => setIsModalOpen(false);
  const closeCategoryModal = () => setIsCategoryModalOpen(false);

  

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
  {categories.map(category => (
    <div key={category.id} className="mb-8 mt-8">
      <h2 className="text-2xl font-semibold">{category.name}</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {projects.filter(project => project.category === category.name).map(project => (
          <li key={project.id} className="border rounded-md shadow-md hover:shadow-lg cursor-pointer overflow-hidden">
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
                  onClick={() =>handleDeleteProject(project._id)}
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

      {/* Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">Create New Category</h2>
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}
            <form onSubmit={handleSubmitCategory}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Category Name</label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black"
                  placeholder="Enter category name"
                  required
                />
              </div>
              <button type="submit" disabled={loading} className={`w-full py-2 px-4 rounded-md ${loading ? 'bg-gray-500' : 'bg-blue-500'} text-white font-semibold`}>
                {loading ? 'Creating...' : 'Create Category'}
              </button>
              <button type="button" onClick={closeCategoryModal} className="w-full mt-2 py-2 px-4 rounded-md bg-gray-500 text-white font-semibold">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
