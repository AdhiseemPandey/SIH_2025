import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';

const EditPostPage = () => {
  const { posts, handleUpdate } = useOutletContext();
  const { postId } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ title: '', description: '', location: '' });

  useEffect(() => {
    const postToEdit = posts.find(p => p.id === parseInt(postId));
    if (postToEdit) {
      setFormData({
        title: postToEdit.title,
        description: postToEdit.description,
        location: postToEdit.location,
      });
    }
  }, [postId, posts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(parseInt(postId), formData);
    navigate('/posts/my-reports');
  };
  
  if (!formData.title && !formData.description) {
    return <div className="p-8 font-semibold text-lg">Loading post data...</div>;
  }

  return (
    <div className="p-8">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Edit Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={() => navigate('/posts/my-reports')} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostPage;