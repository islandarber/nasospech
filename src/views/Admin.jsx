import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProjectForm } from '../components/ProjectForm';

export const Admin = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null); // For editing projects

  // Fetching projects and categories on mount
  useEffect(() => {
    axios.get('http://localhost:8000/projects')
      .then((response) => {
        setProjects(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching projects: ', error);
      });

    axios.get('http://localhost:8000/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories: ', error);
      });
  }, []);

  // Open modal for adding or editing project
  const handleAddProject = () => {
    setSelectedProject(null); // Clear selected project for adding new project
    setIsModalOpen(true);
  };

  // Open modal for editing a project
  const handleEditProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-6xl font-bold mb-8">Admin Dashboard</h1>

      {/* Button to open the modal for adding a project */}
      <button 
        onClick={handleAddProject} 
        className="bg-transparent text-4xl text-bold py-2 px-6 border border-white rounded hover:bg-gray-600 mb-4"
      >
        Add new Project
      </button>

      <div className="mt-10">
        <h1 className="text-4xl">Project Overview per Category</h1>
        {categories.length > 0 && projects.length > 0 && (
          categories.map((category) => (
            <div key={category.id} className="mb-8">
              <h2 className="text-2xl font-semibold">{category.name}</h2>
              <ul className="space-y-4 mt-4">
                {projects
                  .filter((project) => project.category === category.name)
                  .map((project) => (
                    <li key={project.id} className="p-4 border rounded-md shadow-md hover:bg-gray-400 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-lg">{project.title}</span>
                        <div>
                          <button
                            onClick={() => handleEditProject(project)}
                            className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ))
        )}
      </div>

      {/* Modal for Add/Edit Project */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
            <ProjectForm 
              project={selectedProject} 
              closeModal={closeModal} 
              setProjects={setProjects} 
            />
          </div>
        </div>
      )}
    </div>
  );
};
