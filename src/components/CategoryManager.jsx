import { useState } from 'react';
import api from '../api/axios';

// Create / list / delete categories from the admin dashboard.
export const CategoryManager = ({ categories, setCategories }) => {
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    const name = newName.trim();

    if (!name) {
      setError('Category name is required.');
      return;
    }
    if (categories.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
      setError('That category already exists.');
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      const { data } = await api.post('/categories', { name });
      setCategories((prev) => [...prev, data]);
      setNewName('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create category.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete category "${name}"? Any projects in it will keep a broken reference.`)) return;

    const previous = categories;
    setCategories((prev) => prev.filter((c) => c._id !== id)); // optimistic
    try {
      await api.delete(`/categories/${id}`);
    } catch (err) {
      console.error('Error deleting category:', err);
      setError('Failed to delete category. Please try again.');
      setCategories(previous); // roll back
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-5xl mb-4">Categories</h2>

      <form onSubmit={handleAdd} className="flex flex-wrap gap-3 items-center mb-3">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New category name"
          aria-label="New category name"
          className="p-3 rounded-md text-black w-72 max-w-full"
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-transparent text-2xl py-2 px-6 border border-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Adding...' : 'Add Category'}
        </button>
      </form>

      {error && <p className="text-red-500 mb-3" role="alert">{error}</p>}

      {categories.length === 0 ? (
        <p className="text-gray-300">No categories yet. Add one above.</p>
      ) : (
        <ul className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <li
              key={cat._id}
              className="flex items-center gap-3 border border-white border-opacity-30 rounded-md px-4 py-2"
            >
              <span className="text-xl">{cat.name}</span>
              <button
                onClick={() => handleDelete(cat._id, cat.name)}
                className="text-red-400 hover:text-red-600 font-bold text-2xl leading-none"
                aria-label={`Delete category ${cat.name}`}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
