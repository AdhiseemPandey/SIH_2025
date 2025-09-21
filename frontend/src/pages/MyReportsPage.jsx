import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';

const MyReportsPage = () => {
  const { posts, handleDelete } = useOutletContext();
  const userPosts = posts;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-slate-800 mb-8">My Reports</h1>
      
      {userPosts.length === 0 ? (
        <p className="text-lg text-slate-600">You have not created any reports yet.</p>
      ) : (
        <div className="space-y-6">
          {userPosts.map(post => (
            <div key={post.id} className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center transition-shadow hover:shadow-lg">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{post.title}</h2>
                <p className="text-md text-slate-600 mt-1">📍 {post.location}</p>
                <p className="text-slate-700 mt-2 max-w-xl">{post.description}</p>
              </div>
              <div className="flex flex-shrink-0 gap-4 ml-4">
                <Link 
                  to={`/posts/edit/${post.id}`}
                  className="px-5 py-2 bg-yellow-400 text-yellow-900 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                >
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(post.id)}
                  className="px-5 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReportsPage;