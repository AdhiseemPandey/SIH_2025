import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';

const DashboardLayout = ({ posts, setPosts, handleDelete, handleUpdate }) => {
  const activeLinkStyle = {
    backgroundColor: '#f1f5f9',
    color: '#4f46e5',
    fontWeight: '600',
  };

  return (
    <div className="h-screen flex flex-col font-sans">
      <header className="fixed top-0 left-0 w-full bg-slate-800 text-white flex justify-between items-center px-6 py-4 shadow-lg z-50">
        <h1 className="text-2xl font-bold tracking-wide">Citizen Dashboard</h1>
        <Link to="/create-post" className="px-5 py-2 bg-white text-slate-800 font-semibold rounded-full shadow-md hover:bg-gray-200">
          Create Post
        </Link>
      </header>

      <div className="flex flex-1 pt-16">
        <aside className="fixed left-0 top-16 w-64 h-full bg-white border-r border-slate-200 shadow-sm">
          <nav className="p-6 space-y-2 text-slate-700 font-medium">
            <NavLink to="/posts" end style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100">
              <span className="text-xl">🏠</span> Dashboard Home
            </NavLink>
            <NavLink to="/posts/notifications" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100">
              <span className="text-xl">📢</span> Notifications
            </NavLink>
            <NavLink to="/posts/my-reports" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100">
              <span className="text-xl">📝</span> My Reports
            </NavLink>
            <NavLink to="/posts/settings" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100">
              <span className="text-xl">⚙️</span> Settings
            </NavLink>
          </nav>
        </aside>

        <main className="ml-64 flex-1 overflow-y-auto bg-slate-50">
          <Outlet context={{ posts, setPosts, handleDelete, handleUpdate }} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;