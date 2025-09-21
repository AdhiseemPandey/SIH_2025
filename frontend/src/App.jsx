import React, { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

// Import Layouts
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import DashboardLayout from './Components/layout/DashboardLayout';

// Import All Page Components
import HeroPage from './pages/HeroPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import InstructionsPage from './pages/InstructionsPage';
import PostsPage from './pages/PostsPage';
import CreatePostPage from './pages/CreatePostPage';
import NotificationsPage from './pages/NotificationsPage';
import MyReportsPage from './pages/MyReportsPage';
import SettingsPage from './pages/SettingsPage';
import EditPostPage from './pages/EditPostPage';

// --- Initial Data for Demonstration ---
const initialPosts = [
    {id: 1, title: "Digital India Week", location: "Delhi, India", description: "Celebrating progress in e-governance and digital empowerment.", image: "https://via.placeholder.com/600x400", status: "Pending", upvotes: 12},
    {id: 2, title: "Clean City Drive", location: "Mumbai, India", description: "Awareness campaign for cleanliness and hygiene.", image: "https://via.placeholder.com/600x400", status: "Processing", upvotes: 25},
    {id: 3, title: "Scholarship Announcement", location: "Bangalore, India", description: "Scholarship applications for students are now open.", image: "https://via.placeholder.com/600x400", status: "Completed", upvotes: 40},
];

// --- Layout Components ---

// Main Site Layout (for homepage, etc.)
const AppLayout = ({ isLoggedIn, handleLogout }) => (
  <>
    <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
    <main className="min-h-screen">
      <Outlet />
    </main>
    <Footer />
  </>
);

// --- Main Application Component ---
function App() {
  // --- State Management ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState(initialPosts);
  const [complaints, setComplaints] = useState([]);

  // --- Handler Functions ---
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  const addPost = (newPost) => {
    const postWithId = { ...newPost, id: Date.now() }; // Use timestamp for unique ID
    setPosts(prevPosts => [postWithId, ...prevPosts]);
  };

  const handleDeletePost = (postIdToDelete) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postIdToDelete));
    }
  };

  const handleUpdatePost = (postIdToUpdate, updatedData) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postIdToUpdate ? { ...post, ...updatedData } : post
      )
    );
  };

  const addComplaint = (newComplaint) => {
    setComplaints(prevComplaints => [newComplaint, ...prevComplaints]);
  };
  
  // --- Routing Structure ---
  return (
    <Routes>
      {/* Routes with Main Header and Footer */}
      <Route path="/" element={<AppLayout isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}>
        <Route index element={<HeroPage />} />
        <Route path="create-post" element={<CreatePostPage addPost={addPost} />} />
      </Route>

      {/* Nested Dashboard Routes (Uses its own layout) */}
      <Route 
        path="/posts" 
        element={
          <DashboardLayout 
            posts={posts} 
            setPosts={setPosts} 
            handleDelete={handleDeletePost} 
            handleUpdate={handleUpdatePost}
            complaints={complaints}
            addComplaint={addComplaint}
          />
        }
      >
        <Route index element={<PostsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="my-reports" element={<MyReportsPage />} />
        <Route path="edit/:postId" element={<EditPostPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Standalone pages (No main layout) */}
      <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/instructions" element={<InstructionsPage />} />
    </Routes>
  );
}

export default App;




// import React, { useState } from 'react';
// import { Routes, Route, Outlet } from 'react-router-dom';

// // Import Layouts
// import Header from './components/layout/Header';
// import Footer from './components/layout/Footer';
// import DashboardLayout from './Components/layout/DashboardLayout';

// // Import Pages
// import HeroPage from './pages/HeroPage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import InstructionsPage from './pages/InstructionsPage';
// import PostsPage from './pages/PostsPage';
// import CreatePostPage from './pages/CreatePostPage';
// import NotificationsPage from './pages/NotificationsPage';
// import MyReportsPage from './pages/MyReportsPage';
// import SettingsPage from './pages/SettingsPage';
// import EditPostPage from './pages/EditPostPage';

// const initialPosts = [
//     {id: 1, title: "Digital India Week", location: "Delhi, India", description: "Celebrating progress in e-governance.", image: "https://via.placeholder.com/600x400", status: "Pending", upvotes: 12},
//     {id: 2, title: "Clean City Drive", location: "Mumbai, India", description: "Awareness campaign for cleanliness.", image: "https://via.placeholder.com/600x400", status: "Processing", upvotes: 25},
// ];

// const AppLayout = ({ isLoggedIn, handleLogout }) => (
//   <>
//     <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
//     <main className="min-h-screen"><Outlet /></main>
//     <Footer />
//   </>
// );

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [posts, setPosts] = useState(initialPosts);

//   const handleLogin = () => setIsLoggedIn(true);
//   const handleLogout = () => setIsLoggedIn(false);

//   const addPost = (newPost) => {
//     const postWithId = { ...newPost, id: Date.now() }; // Use timestamp for a more unique ID
//     setPosts([postWithId, ...posts]);
//   };

//   const handleDeletePost = (postIdToDelete) => {
//     if (window.confirm("Are you sure you want to delete this post?")) {
//       setPosts(posts.filter(post => post.id !== postIdToDelete));
//     }
//   };

//   const handleUpdatePost = (postIdToUpdate, updatedData) => {
//     setPosts(posts.map(post => 
//       post.id === postIdToUpdate ? { ...post, ...updatedData } : post
//     ));
//   };
  
//   return (
//     <Routes>
//       <Route path="/" element={<AppLayout isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}>
//         <Route index element={<HeroPage />} />
//         <Route path="create-post" element={<CreatePostPage addPost={addPost} />} />
//       </Route>

//       <Route 
//         path="/posts" 
//         element={<DashboardLayout posts={posts} setPosts={setPosts} handleDelete={handleDeletePost} handleUpdate={handleUpdatePost} />}
//       >
//         <Route index element={<PostsPage />} />
//         <Route path="notifications" element={<NotificationsPage />} />
//         <Route path="my-reports" element={<MyReportsPage />} />
//         <Route path="edit/:postId" element={<EditPostPage />} />
//         <Route path="settings" element={<SettingsPage />} />
//       </Route>

//       <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
//       <Route path="/register" element={<RegisterPage />} />
//       <Route path="/instructions" element={<InstructionsPage />} />
//     </Routes>
//   );
// }

// export default App;