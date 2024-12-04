import { useState, useEffect } from 'react';
import axios from 'axios';

export const ProjectForm = ({ project, closeModal, setProjects }) => {
  const [formData, setFormData] = useState({
    title: '',
    img: null,
    video: '',
    category: '',
    roles: '',
    info: '',
    additionalMedia: [],
    tags: [],
    links: [],
    featured: false,
    priority: 0,
  });

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();

    if (project) {
      setFormData({
        title: project.title,
        img: project.img || null,
        video: project.video,
        category: project.category,
        roles: project.roles,
        info: project.info,
        additionalMedia: project.additionalMedia || [],
        tags: project.tags || [],
        links: project.links || [],
        featured: project.featured,
        priority: project.priority,
      });
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!formData.title) validationErrors.title = 'Title is required';
    if (!formData.img) validationErrors.img = 'Image is required';
    if (!formData.category) validationErrors.category = 'Category is required';
    if (!formData.roles) validationErrors.roles = 'Roles are required';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const requestData = new FormData();

    // Append form fields to FormData object
    requestData.append('title', formData.title);
    requestData.append('video', formData.video);
    requestData.append('category', formData.category);
    requestData.append('roles', formData.roles);
    requestData.append('info', formData.info);
    requestData.append('additionalMedia', JSON.stringify(formData.additionalMedia));
    requestData.append('tags', JSON.stringify(formData.tags));
    requestData.append('links', JSON.stringify(formData.links));
    requestData.append('featured', formData.featured);
    requestData.append('priority', formData.priority);

    if (formData.img && formData.img instanceof File) {
      requestData.append('img', formData.img);
    }

    try {
      // Send data to your existing /projects route
      if (project) {
        await axios.put(`http://localhost:8000/projects/${project.id}`, requestData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post('http://localhost:8000/projects', requestData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      setProjects((prev) =>
        project
          ? prev.map((p) => (p.id === project.id ? { ...p, ...formData } : p))
          : [...prev, formData]
      );
      closeModal();
    } catch (error) {
      console.error('Error submitting project:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, img: file });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4">{project ? 'Edit Project' : 'Create Project'}</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input
              name:img
              type="file"
              onChange={handleImageChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {formData.img && formData.img instanceof File && (
              <div className="mt-2">
                <p>Selected file: {formData.img.name}</p>
                <img
                  src={URL.createObjectURL(formData.img)}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover"
                />
              </div>
            )}
            {errors.img && <p className="text-red-500 text-sm">{errors.img}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Video Link</label>
            <input
              type="text"
              value={formData.video}
              onChange={(e) => setFormData({ ...formData, video: e.target.value })}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Roles</label>
            <input
              type="text"
              value={formData.roles}
              onChange={(e) => setFormData({ ...formData, roles: e.target.value })}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.roles && <p className="text-red-500 text-sm">{errors.roles}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Information</label>
            <textarea
              value={formData.info}
              onChange={(e) => setFormData({ ...formData, info: e.target.value })}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Additional Media</label>
            <input
              type="text"
              value={formData.additionalMedia}
              onChange={(e) =>
                setFormData({ ...formData, additionalMedia: e.target.value.split(',') })
              }
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Comma separated media links"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tags</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',') })}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Comma separated tags"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Links</label>
            <input
              type="text"
              value={formData.links}
              onChange={(e) => setFormData({ ...formData, links: e.target.value.split(',') })}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Comma separated links"
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={() => setFormData({ ...formData, featured: !formData.featured })}
              className="mr-2"
            />
            <label className="text-sm text-gray-700">Featured</label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <input
              type="number"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value, 10) })}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            {project ? 'Save Project' : 'Create Project'}
          </button>
        </form>
      </div>
    </div>
  );
};
