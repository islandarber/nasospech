import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { processProjects } from '../utils/thumbnailUtils';

export const ProjectForm = ({ project, closeModal, setProjects }) => {
  console.log(project)
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
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
      setErrors(error.message);
    } finally {
      setLoading(false);
      setNewImageFiles([]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-black p-6 rounded-md w-full max-w-5xl max-h-[90vh] overflow-y-auto relative">
        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-2xl">&times;</button>
        <h2 className="text-4xl font-semibold mb-6 text-white">{project ? 'Edit Project' : 'Create Project'}</h2>

        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-xl font-medium text-white">Title <span className="text-red-500">*</span></label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} ref={titleRef} className="mt-1 p-4 border border-gray-300 rounded-md w-full text-black" />
              {errors.title && <p className="text-red-500 text-xl">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-xl font-medium text-white">Upload Image(s)</label>
              <input type="file" multiple accept="image/*" onChange={handleImageChange} className="mt-1 p-4 border border-gray-300 rounded-md w-full text-black" />
              <div className="grid grid-cols-3 gap-4 mt-2">
                {newImageFiles.map((file, index) => (
                  <div key={index} className="relative">
                    <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-32 object-cover rounded" />
                    <button type="button" onClick={() => handleRemoveNewImage(index)} className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center">&times;</button>
                  </div>
                ))}
                {formData.media.map((item, index) => item.type === 'image' && (
                  <div key={index} className="relative">
                    <img src={item.url} alt={`Project image ${index + 1}`} className="w-full h-32 object-cover rounded" />
                    <button type="button" onClick={() => handleRemoveMedia(index)} className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center">&times;</button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xl font-medium text-white">Add Video Link(s)</label>
              <div className="flex space-x-2 mb-2">
                <input type="text" value={newVideoUrl} onChange={(e) => setNewVideoUrl(e.target.value)} placeholder="Enter video URL" className="flex-grow p-4 rounded-md text-black" />
                <button type="button" onClick={handleAddVideo} className="bg-blue-500 hover:bg-blue-600 text-white px-6 rounded-md">Add</button>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {formData.media.map(({ type, url }, index) => type === 'video' && (
                  <div key={index} className="flex items-center justify-between bg-gray-800 p-2 rounded">
                    <div className="flex items-center space-x-2">
                      <span className="capitalize font-semibold text-red-400">[{type}]</span>
                      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline truncate max-w-xs">{url}</a>
                    </div>
                    <button type="button" onClick={() => handleRemoveMedia(index)} className="text-red-600 hover:text-red-800 font-bold">&times;</button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xl font-medium text-white">Categories <span className="text-red-500">*</span></label>
              <div ref={categoriesRef}>
                {categories.map((cat) => (
                  <label key={cat._id} className="block text-white">
                    <input type="checkbox" value={cat._id} checked={formData.categories.includes(cat._id)} onChange={(e) => {
                      const newCategories = e.target.checked ? [...formData.categories, cat._id] : formData.categories.filter(id => id !== cat._id);
                      setFormData({ ...formData, categories: newCategories });
                    }} className="mr-2" />
                    {cat.name}
                  </label>
                ))}
              </div>
              {errors.categories && <p className="text-red-500 text-lg">{errors.categories}</p>}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-xl font-medium text-white">Roles <span className="text-red-500">*</span></label>
              <input type="text" value={formData.roles} onChange={(e) => setFormData({ ...formData, roles: e.target.value })} ref={rolesRef} className="mt-1 p-4 text-black border border-gray-300 rounded-md w-full" />
              {errors.roles && <p className="text-red-500 text-lg">{errors.roles}</p>}
            </div>

            <div>
              <label className="block text-xl font-medium text-white">Information</label>
              <textarea value={formData.info} onChange={(e) => setFormData({ ...formData, info: e.target.value })} className="mt-1 p-4 text-black border border-gray-300 rounded-md w-full" />
            </div>

            <div className="flex items-center">
              <label className="text-xl text-white">Featured</label>
              <input type="checkbox" checked={formData.featured} onChange={() => setFormData({ ...formData, featured: !formData.featured })} className="ml-2 mt-2" />
            </div>

            <div>
              <label className="block text-xl font-medium text-white">Priority (3 : low, 2: Medium, 1: High)</label>
              <input type="number" value={formData.priority} min="1" max="3" onChange={(e) => setFormData({ ...formData, priority: Math.max(1, parseInt(e.target.value, 10) || 1) })} className="mt-1 p-4 border text-black border-gray-300 rounded-md w-full" />
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <button type="submit" className={`w-full p-6 rounded-md text-white ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`} disabled={loading}>
              {loading ? (project ? 'Saving...' : 'Creating...') : (project ? 'Save Project' : 'Create Project')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};