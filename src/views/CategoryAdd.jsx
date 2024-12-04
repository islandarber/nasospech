import { useState } from 'react';
import axios from 'axios';

const CategoryAdd = () => {
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName) {
      setError('Category name is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Make POST request to backend to create category
      await axios.post('http://localhost:8000/categories', { name: categoryName });
      setCategoryName('');
      alert('Category created successfully');
    } catch (err) {
      setError('Error creating category');
      console.error('Error creating category: ', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create New Category</h2>
      
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder="Enter category name"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md ${loading ? 'bg-gray-500' : 'bg-blue-500'} text-white font-semibold`}
        >
          {loading ? 'Creating...' : 'Create Category'}
        </button>
      </form>
    </div>
  );
};

export default CategoryAdd;
