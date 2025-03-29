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
    priority: 1,
  });

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      // Send data to your existing /projects route
      if (project) {
        await axios.put(`http://localhost:8000/projects/${project._id}`, requestData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post('http://localhost:8000/projects', requestData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      
      const response = await axios.get('http://localhost:8000/projects');
    setProjects(response.data);
    
      closeModal();
    } catch (error) {
      console.error('Error submitting project:', error);
      setErrors(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, img: file });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-black p-6 rounded-md w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-2xl"
        >
          &times;
        </button>

        <h2 className="text-4xl font-semibold mb-4">{project ? 'Edit Project' : 'Create Project'}</h2>

        <form onSubmit={handleSubmit}  className="p-6">
          <div className="mb-4">
            <label className="block text-xl font-medium text-white">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 p-6 border border-gray-300 rounded-md w-full text-black"
            />
            {errors.title && <p className="text-red-500 text-xl">{errors.title}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-white">Upload Image</label>
            <input
              name:img
              type="file"
              onChange={handleImageChange}
              className="mt-1 p-6 border border-gray-300 rounded-md w-full text-black"
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
            {errors.img && <p className="text-red-500 text-lg">{errors.img}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-xl font-medium text-white">Video Link</label>
            <input
              type="text"
              value={formData.video}
              onChange={(e) => setFormData({ ...formData, video: e.target.value })}
              className="mt-1 p-6 border border-gray-300 rounded-md w-full text-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xl font-medium text-white">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="mt-1 p-6 border text-black border-gray-300 rounded-md w-full"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-lg">{errors.category}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-xl font-medium text-white">Roles</label>
            <input
              type="text"
              value={formData.roles}
              onChange={(e) => setFormData({ ...formData, roles: e.target.value })}
              className="mt-1 p-6 text-black border border-gray-300 rounded-md w-full"
            />
            {errors.roles && <p className="text-red-500 text-lg">{errors.roles}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-xl font-medium text-white">Information</label>
            <textarea
              value={formData.info}
              onChange={(e) => setFormData({ ...formData, info: e.target.value })}
              className="mt-1 p-6 text-black border border-gray-300 rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xl font-medium text-white">Additional Media</label>
            <input
              type="text"
              value={formData.additionalMedia}
              onChange={(e) =>
                setFormData({ ...formData, additionalMedia: e.target.value.split(',') })
              }
              className="mt-1 p-6 text-black border border-gray-300 rounded-md w-full"
              placeholder="Comma separated media links"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xl font-medium text-white">Tags</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',') })}
              className="mt-1 p-6 text-black border border-gray-300 rounded-md w-full"
              placeholder="Comma separated tags"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xl font-medium text-white">Links</label>
            <input
              type="text"
              value={formData.links}
              onChange={(e) => setFormData({ ...formData, links: e.target.value.split(',') })}
              className="mt-1 p-6 text-black border border-gray-300 rounded-md w-full"
              placeholder="Comma separated links"
            />
          </div>

          <div className="mb-4 flex items-center">
          <label className="text-xl text-white">Featured</label>
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={() => setFormData({ ...formData, featured: !formData.featured })}
              className="ml-2 mt-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xl font-medium text-white">Priority (3 : low, 2: Medium, 1: High)</label>
            <input
              type="number"
              value={formData.priority}
              min="1"
              max="3"
              onChange={(e) => setFormData({ ...formData, priority: Math.max(1, parseInt(e.target.value, 10) || 1) })}
              className="mt-1 p-6 border text-black border-gray-300 rounded-md w-full"
            />
          </div>

          <button
            type="submit"
            className={`w-full p-6 rounded-md text-white ${
              loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={loading} // Disable the button while loading
          >
            {loading ? (project ? 'Saving...' : 'Creating...') : (project ? 'Save Project' : 'Create Project')}
          </button>
          {errors.title && <p className="text-red-500 text-lg">{errors.title}</p>}
        </form>
      </div>
    </div>
  )
};
