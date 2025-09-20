import { useState } from "react";

export default function HomePage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Digital India Week",
      location: "Delhi, India",
      description:
        "Celebrating progress in e-governance and digital empowerment.",
      image: "https://via.placeholder.com/600x400",
      status: "Pending",
      upvotes: 12,
    },
    {
      id: 2,
      title: "Clean City Drive",
      location: "Mumbai, India",
      description: "Awareness campaign for cleanliness and hygiene.",
      image: "https://via.placeholder.com/600x400",
      status: "Processing",
      upvotes: 25,
    },
    {
      id: 3,
      title: "Scholarship Announcement",
      location: "Bangalore, India",
      description: "Scholarship applications for students are now open.",
      image: "https://via.placeholder.com/600x400",
      status: "Completed",
      upvotes: 40,
    },
    {
      id: 4,
      title: "Health Camp",
      location: "Chennai, India",
      description: "Free health check-up camp organized by the govt.",
      image: "https://via.placeholder.com/600x400",
      status: "Pending",
      upvotes: 8,
    },
    {
      id: 5,
      title: "Cultural Festival",
      location: "Kolkata, India",
      description: "Celebrating heritage and traditions.",
      image: "https://via.placeholder.com/600x400",
      status: "Processing",
      upvotes: 18,
    },
    {
      id: 6,
      title: "Employment Fair",
      location: "Jaipur, India",
      description: "Skill training and job opportunities.",
      image: "https://via.placeholder.com/600x400",
      status: "Completed",
      upvotes: 33,
    },
    {
      id: 7,
      title: "Tourism Promotion",
      location: "Agra, India",
      description: "New initiatives to promote tourism.",
      image: "https://via.placeholder.com/600x400",
      status: "Pending",
      upvotes: 15,
    },
    {
      id: 8,
      title: "Green Energy Summit",
      location: "Goa, India",
      description: "Encouraging renewable energy adoption.",
      image: "https://via.placeholder.com/600x400",
      status: "Processing",
      upvotes: 29,
    },
  ]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-800";
      case "Processing":
        return "bg-cyan-100 text-cyan-800";
      case "Completed":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
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
    <div className="h-screen flex flex-col bg-slate-50 font-sans">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full bg-slate-800 text-white flex justify-between items-center px-6 py-4 shadow-lg z-50">
        <div className="flex items-center gap-3">
          <img
            src="https://via.placeholder.com/50"
            alt="logo"
            className="w-12 h-12 rounded-full border-2 border-white"
          />
          <h1 className="text-2xl font-bold tracking-wide">Vyawastha</h1>
        </div>
        <button className="px-5 py-2 bg-white text-slate-800 font-semibold rounded-full shadow-md hover:bg-gray-200 transition-colors duration-300">
          Create Post
        </button>
      </header>

      <div className="flex flex-1 pt-20">
        {/* Sidebar */}
        <aside className="fixed left-0 top-20 w-64 h-full bg-white border-r border-slate-200 shadow-sm flex flex-col justify-between">
          <nav className="p-6 space-y-4 text-slate-700 font-medium">
            <a
              href="#"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 hover:text-indigo-700 transition-colors duration-200"
            >
              <span className="text-xl">🏠</span> Home
            </a>
            <a
              href="#"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 hover:text-indigo-700 transition-colors duration-200"
            >
              <span className="text-xl">🔥</span> Trending
            </a>
            <a
              href="#"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 hover:text-indigo-700 transition-colors duration-200"
            >
              <span className="text-xl">📢</span> Notifications
            </a>
            <a
              href="#"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 hover:text-indigo-700 transition-colors duration-200"
            >
              <span className="text-xl">📑</span> Tenders
            </a>
            <a
              href="#"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 hover:text-indigo-700 transition-colors duration-200"
            >
              <span className="text-xl">📝</span> RTI
            </a>
            <a
              href="#"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 hover:text-indigo-700 transition-colors duration-200"
            >
              <span className="text-xl">⚙️</span> Services
            </a>
          </nav>
          <div className="p-6">
            <img
              src="https://via.placeholder.com/150x100"
              alt="Govt Seal"
              className="shadow-md rounded-lg"
            />
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 overflow-y-auto bg-slate-50 p-8">
          {/* Hero Banner */}
          <section className="bg-gradient-to-r from-teal-600 to-indigo-600 text-white text-center py-12 rounded-lg shadow-xl mb-8">
            <h2 className="text-4xl font-extrabold tracking-tight">
              Government of India – Citizen Services Portal
            </h2>
            <p className="mt-3 text-xl opacity-90">
              Empowering Citizens with Transparency & Efficiency
            </p>
            <div className="w-48 h-1 bg-gradient-to-r from-orange-400 via-white to-green-500 mx-auto mt-6 rounded-full"></div>
          </section>

          {/* Services Section with colored backgrounds */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
            <div className="bg-orange-50 rounded-lg shadow-md p-5 text-center cursor-pointer hover:shadow-xl hover:bg-orange-100 transition-all duration-300 transform hover:-translate-y-1">
              <span className="text-4xl text-orange-600">🏛️</span>
              <p className="mt-3 font-semibold text-slate-800">Apply Online</p>
            </div>
            <div className="bg-green-50 rounded-lg shadow-md p-5 text-center cursor-pointer hover:shadow-xl hover:bg-green-100 transition-all duration-300 transform hover:-translate-y-1">
              <span className="text-4xl text-green-600">📄</span>
              <p className="mt-3 font-semibold text-slate-800">Downloads</p>
            </div>
            <div className="bg-rose-50 rounded-lg shadow-md p-5 text-center cursor-pointer hover:shadow-xl hover:bg-rose-100 transition-all duration-300 transform hover:-translate-y-1">
              <span className="text-4xl text-rose-600">💳</span>
              <p className="mt-3 font-semibold text-slate-800">Pay Bills</p>
            </div>
            <div className="bg-fuchsia-50 rounded-lg shadow-md p-5 text-center cursor-pointer hover:shadow-xl hover:bg-fuchsia-100 transition-all duration-300 transform hover:-translate-y-1">
              <span className="text-4xl text-fuchsia-600">🎓</span>
              <p className="mt-3 font-semibold text-slate-800">Schemes</p>
            </div>
            <div className="bg-sky-50 rounded-lg shadow-md p-5 text-center cursor-pointer hover:shadow-xl hover:bg-sky-100 transition-all duration-300 transform hover:-translate-y-1">
              <span className="text-4xl text-sky-600">🔍</span>
              <p className="mt-3 font-semibold text-slate-800">Track Status</p>
            </div>
          </section>

          {/* Posts - Full-width feed */}
          <div className="flex flex-col gap-8">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative">
                  <span
                    className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full ${getStatusStyle(
                      post.status
                    )}`}
                  >
                    {post.status}
                  </span>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-80 object-cover object-center"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-md text-slate-600 mb-3 flex items-center">
                    <span className="mr-2">📍</span>
                    {post.location}
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between mt-4 border-t pt-4 border-slate-100">
                    <button
                      onClick={() => handleUpvote(post.id)}
                      className="flex items-center px-4 py-2 bg-rose-50 text-rose-700 rounded-full font-medium hover:bg-rose-100 transition-colors duration-200"
                    >
                      <span className="mr-2 text-lg">↑</span> Upvote (
                      {post.upvotes})
                    </button>
                    {/* View Details link removed as per request */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <footer className="bg-slate-800 text-white text-center py-8 mt-12 rounded-lg shadow-lg">
            <p className="text-lg font-medium">
              © 2025 Government of India – All Rights Reserved
            </p>
            <p className="text-sm mt-2 opacity-80">
              Helpline: 1800-123-456 | Email: support@gov.in
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
