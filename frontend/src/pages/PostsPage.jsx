import React from 'react';
import { useOutletContext } from 'react-router-dom';

export default function PostsPage() {
  const { posts, setPosts } = useOutletContext();

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending": return "bg-amber-100 text-amber-800";
      case "Processing": return "bg-cyan-100 text-cyan-800";
      case "Completed": return "bg-emerald-100 text-emerald-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleUpvote = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, upvotes: post.upvotes + 1 } : post
      )
    );
  };

  return (
    <div className="p-8">
      <section className="bg-gradient-to-r from-teal-600 to-indigo-600 text-white text-center py-12 rounded-lg shadow-xl mb-8">
        <h2 className="text-4xl font-extrabold">Community Reports & Initiatives</h2>
        <p className="mt-3 text-xl opacity-90">Browse, upvote, and track the status of public reports.</p>
      </section>

      <div className="flex flex-col gap-8">
        {posts && posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden border">
            <div className="relative">
              <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full ${getStatusStyle(post.status)}`}>
                {post.status}
              </span>
              <img src={post.image} alt={post.title} className="w-full h-80 object-cover" />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{post.title}</h2>
              <p className="text-md text-slate-600 mb-3 flex items-center">
                <span className="mr-2">📍</span>{post.location}
              </p>
              <p className="text-slate-700">{post.description}</p>
              <div className="flex items-center justify-between mt-4 border-t pt-4">
                <button onClick={() => handleUpvote(post.id)} className="flex items-center px-4 py-2 bg-rose-50 text-rose-700 rounded-full font-medium hover:bg-rose-100">
                  <span className="mr-2 text-lg">↑</span> Upvote ({post.upvotes})
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}