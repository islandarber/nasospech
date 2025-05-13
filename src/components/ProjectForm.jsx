import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export const ProjectForm = ({ project, closeModal, setProjects }) => {
  const [formData, setFormData] = useState({
    title: '',
    img: null,
    video: '',
    categories: [],
    roles: '',
    info: '',
    additionalMedia: '',
    tags: '',
    links: '',
    featured: false,
    priority: 1,
  });

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const api_url = import.meta.env.VITE_BACKEND_URL;

  
  // Refs for form fields for focus when errored
  const titleRef = useRef(null);
  const categoriesRef = useRef(null);
  const rolesRef = useRef(null);

  const refs = {
    title: titleRef,
    categories: categoriesRef,
    roles: rolesRef,
  };

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
        img: project.img || null,
        video: project.video,
        categories: Array.isArray(project.categories)
  ? project.categories.map(cat => cat._id || cat).filter(Boolean) // Filter out falsy values like empty strings
  : [project.category?._id || project.category].filter(Boolean), // Ensure only valid category ID is pushed

        roles: project.roles,
        info: project.info,
        additionalMedia: "",
        tags: '',
        links: '',
        featured: project.featured,
        priority: project.priority,
      });
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const validationErrors = {};
    if (!formData.title) validationErrors.title = 'Title is required';
    if (!formData.categories || formData.categories.length === 0) {
      validationErrors.categories = 'Categories are required';
    }    
    if (!formData.roles) validationErrors.roles = 'Roles are required';

    setErrors(validationErrors);

    for (const [field, errorMessage] of Object.entries(validationErrors)) {
      if (errorMessage) {
        const ref = refs[field]?.current;
        if (ref) {
          ref.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        break;
      }
    }    
    
    const requestData = new FormData();
    requestData.append('title', formData.title);
    requestData.append('video', formData.video);
    formData.categories.forEach((cat) => {
      requestData.append('categories[]', cat);
    });    
    requestData.append('roles', formData.roles);
    requestData.append('info', formData.info);
    requestData.append('additionalMedia', JSON.stringify(formData.additionalMedia ? formData.additionalMedia.split(',').map(item => item.trim()) : []));
    requestData.append('tags', JSON.stringify(formData.tags ? formData.tags.split(',').map(item => item.trim()) : []));
    requestData.append('links', JSON.stringify(formData.links ? formData.links.split(',').map(item => item.trim()) : []));
    requestData.append('featured', formData.featured);
    requestData.append('priority', formData.priority);


    if (formData.img && formData.img instanceof File) {
      requestData.append('img', formData.img);
    }

    try {
      setLoading(true);
      // Send data to your existing /projects route
      console.log(formData);
      if (project) {
        await axios.put(`${api_url}/projects/${project._id}`, requestData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post(`${api_url}/projects`, requestData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      
      const response = await axios.get(`${api_url}/projects`);
    setProjects(response.data);
    console.log(response.data);
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
              ref={titleRef}
              className="mt-1 p-6 border border-gray-300 rounded-md w-full text-black"
            />
            {errors.title && <p className="text-red-500 text-xl">{errors.title}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-white">{project ? 'Upload another image' : 'Upload Image'}</label>
            <input
              name="img"
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
            {errors.video && <p className="text-red-500 text-lg">{errors.video}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-xl font-medium text-white">Categories</label>
            <div ref={categoriesRef}>
              {categories.map((cat) => (
                <label key={cat._id} className="block text-white">
                  <input
                    type="checkbox"
                    value={cat._id}
                    checked={formData.categories.includes(cat._id)}
                    onChange={(e) => {
                      const newCategories = e.target.checked
                        ? [...formData.categories, cat._id]
                        : formData.categories.filter((id) => id !== cat._id);
                      setFormData({ ...formData, categories: newCategories });
                    }}
                    className="mr-2"
                  />
                  {cat.name}
                </label>
              ))}
            </div>
            {errors.categories && <p className="text-red-500 text-lg">{errors.categories}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-xl font-medium text-white">Roles</label>
            <input
              type="text"
              value={formData.roles}
              onChange={(e) => setFormData({ ...formData, roles: e.target.value })}
              ref={rolesRef}
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
                setFormData({ ...formData, additionalMedia: e.target.value })
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
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="mt-1 p-6 text-black border border-gray-300 rounded-md w-full"
              placeholder="Comma separated tags"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xl font-medium text-white">Links</label>
            <input
              type="text"
              value={formData.links}
              onChange={(e) => setFormData({ ...formData, links: e.target.value })}
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
        </form>
      </div>
    </div>
  )
};
