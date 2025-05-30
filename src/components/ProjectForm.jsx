import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { processProjects } from '../utils/thumbnailUtils';

export const ProjectForm = ({ project, closeModal, setProjects }) => {
  const [formData, setFormData] = useState({
    title: '',
    media: [],
    categories: [],
    roles: '',
    info: '',
    featured: false,
    priority: 1,
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [fileSizeError, setFileSizeError] = useState('');

  const api_url = import.meta.env.VITE_BACKEND_URL;

  const titleRef = useRef(null);
  const categoriesRef = useRef(null);
  const rolesRef = useRef(null);

  const refs = { title: titleRef, categories: categoriesRef, roles: rolesRef };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${api_url}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();

    if (project) {
      setFormData({
        title: project.title,
        media: project.media || [],
        categories: Array.isArray(project.categories)
          ? project.categories.map(cat => cat._id || cat).filter(Boolean)
          : [project.category?._id || project.category].filter(Boolean),
        roles: project.roles,
        info: project.info,
        featured: project.featured,
        priority: project.priority,
      });
    }
  }, [project]);

  useEffect(() => {
    return () => {
      newImageFiles.forEach(file => URL.revokeObjectURL(file));
    };
  }, [newImageFiles]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const oversized = files.find(file => file.size > 20 * 1024 * 1024);
    if (oversized) {
      setFileSizeError('One or more images exceed the 20MB limit.');
      return;
    }
    setFileSizeError('');
    setNewImageFiles(prev => [...prev, ...files]);
  };

  const handleRemoveNewImage = (index) => {
    setNewImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddVideo = () => {
    if (!newVideoUrl.trim()) return;
    setFormData((prev) => ({
      ...prev,
      media: [...prev.media, { type: 'video', url: newVideoUrl.trim() }],
    }));
    setNewVideoUrl('');
  };

  const handleRemoveMedia = (index) => {
    setFormData((prev) => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!formData.title) validationErrors.title = 'Title is required';
    if (!formData.categories.length) validationErrors.categories = 'Categories are required';
    if (!formData.roles) validationErrors.roles = 'Roles are required';
    setErrors(validationErrors);

    for (const [field, errorMessage] of Object.entries(validationErrors)) {
      if (errorMessage) {
        const ref = refs[field]?.current;
        if (ref) ref.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }

    const requestData = new FormData();
    requestData.append('title', formData.title);
    formData.categories.forEach(cat => requestData.append('categories[]', cat));
    requestData.append('roles', formData.roles);
    requestData.append('info', formData.info);
    requestData.append('featured', formData.featured);
    requestData.append('priority', formData.priority);

    formData.media.forEach(item => {
      if (item.type === 'video') {
        requestData.append('media', item.url);
      } else if (item.type === 'image' && item.url) {
        requestData.append('media', item.url);
      }
    });

    newImageFiles.forEach(file => requestData.append('mediaFiles', file));

    try {
      setLoading(true);
      if (project) {
        await axios.put(`${api_url}/projects/${project._id}`, requestData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        const response = await axios.get(`${api_url}/projects`);
        setProjects(response.data);
      } else {
        await axios.post(`${api_url}/projects`, requestData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        const updatedProjects = await axios.get(`${api_url}/projects`);
        setProjects(processProjects(updatedProjects.data));
      }
      closeModal();
    } catch (error) {
      console.error('Error submitting project:', error);
      setErrors({ submit: 'Submission failed. Please try again.' });
    } finally {
      setLoading(false);
      setNewImageFiles([]);
    }
  };

  const isFormValid = formData.title && formData.categories.length && formData.roles;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-black p-6 rounded-md w-full max-w-5xl max-h-[90vh] overflow-y-auto relative">
        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-2xl" aria-label="Close form">&times;</button>
        <h2 className="text-4xl font-semibold mb-6 text-white">{project ? 'Edit Project' : 'Create Project'}</h2>

        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Form content stays the same */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className={`w-full p-6 rounded-md text-white ${!isFormValid || loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
              disabled={!isFormValid || loading}
              aria-disabled={!isFormValid || loading}
              aria-busy={loading}
            >
              {loading ? (project ? 'Saving...' : 'Creating...') : (project ? 'Save Project' : 'Create Project')}
            </button>
            {errors.submit && <p className="text-red-500 text-center mt-4">{errors.submit}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};
