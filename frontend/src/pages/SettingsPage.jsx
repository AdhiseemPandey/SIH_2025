import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

// --- (ProfileForm sub-component remains the same) ---
const ProfileForm = () => {
    const [profileData, setProfileData] = useState({
        firstName: "Adhiseem",
        lastName: "Pandey",
        emailId: "adhiseem.atwork@gmail.com",
        age: 20,
        aadharNumber: "123456789012",
        mobileNumber: "9876543210",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Saving profile data:", profileData);
        alert("Profile updated successfully!");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
             {/* All profile form fields */}
        </form>
    );
};

// --- (ComplaintRaiser sub-component remains the same) ---
const ComplaintRaiser = ({ onRaiseComplaintClick }) => {
    const { posts } = useOutletContext();
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Select a Post to Complain About</h2>
            {posts && posts.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                    {posts.map(post => (
                        <li key={post.id} className="py-4 flex justify-between items-center">
                            <div>
                                <p className="text-lg font-medium text-gray-900">{post.title}</p>
                                <p className="text-sm text-gray-500">{post.location}</p>
                            </div>
                            <button onClick={() => onRaiseComplaintClick(post)} className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 text-sm">
                                Raise Complaint
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (<p className="text-gray-500">You have no posts to complain about.</p>)}
        </div>
    );
};

// NEW: Sub-component to display registered complaints
const RegisteredComplaints = ({ complaints }) => {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Your Submitted Complaints</h2>
            {complaints.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                    {complaints.map(complaint => (
                        <li key={complaint.id} className="py-4">
                            <p className="text-lg font-semibold text-gray-900">
                                Complaint regarding: <span className="font-bold">{complaint.postTitle}</span>
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                Submitted on: {complaint.submittedAt}
                            </p>
                            <p className="mt-2 p-3 bg-gray-50 rounded-md text-gray-700 border">
                                {complaint.description}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">You have not registered any complaints yet.</p>
            )}
        </div>
    );
};


// --- Main SettingsPage Component ---
const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [complaintDescription, setComplaintDescription] = useState("");
  
  // NEW: State to store the list of submitted complaints
  const [complaints, setComplaints] = useState([]);

  const handleOpenComplaintModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    setComplaintDescription("");
  };

  const handleComplaintSubmit = (e) => {
    e.preventDefault();
    if (!complaintDescription.trim()) {
        alert("Please provide a description for your complaint.");
        return;
    }
    
    // NEW: Create a new complaint object and add it to the state
    const newComplaint = {
        id: Date.now(), // Unique ID for the complaint
        postTitle: selectedPost.title,
        postId: selectedPost.id,
        description: complaintDescription,
        submittedAt: new Date().toLocaleString()
    };
    setComplaints(prevComplaints => [newComplaint, ...prevComplaints]);

    alert(`Complaint for "${selectedPost.title}" has been submitted successfully!`);
    handleCloseModal();
  };

  const tabStyle = "px-6 py-3 font-semibold rounded-t-lg transition-colors cursor-pointer";
  const activeTabStyle = "bg-white text-indigo-700";
  const inactiveTabStyle = "bg-gray-200 text-gray-600 hover:bg-gray-300";

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-slate-800 mb-8">Settings</h1>
      
      <div className="w-full">
        <div className="flex border-b border-gray-300">
          <div onClick={() => setActiveTab('profile')} className={`${tabStyle} ${activeTab === 'profile' ? activeTabStyle : inactiveTabStyle}`}>
            My Profile
          </div>
          <div onClick={() => setActiveTab('complaint')} className={`${tabStyle} ${activeTab === 'complaint' ? activeTabStyle : inactiveTabStyle}`}>
            Raise Complaint
          </div>
          {/* NEW: Tab for viewing registered complaints */}
          <div onClick={() => setActiveTab('registered')} className={`${tabStyle} ${activeTab === 'registered' ? activeTabStyle : inactiveTabStyle}`}>
            Registered Complaints
          </div>
        </div>

        <div className="bg-white p-8 rounded-b-lg rounded-r-lg shadow-md min-h-[400px]">
          {activeTab === 'profile' && <ProfileForm />}
          {activeTab === 'complaint' && <ComplaintRaiser onRaiseComplaintClick={handleOpenComplaintModal} />}
          {activeTab === 'registered' && <RegisteredComplaints complaints={complaints} />}
        </div>
      </div>

      {/* Complaint Modal (remains the same) */}
      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Raise Complaint</h2>
            <p className="text-gray-600 mb-4">You are filing a complaint for the post: <span className="font-semibold text-gray-900">"{selectedPost.title}"</span></p>
            <form onSubmit={handleComplaintSubmit}>
              <div className="mb-6 p-4 bg-gray-50 border rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-1">Nearest Municipal Corporation:</h3>
                <p className="text-gray-600">Municipal Corporation of Delhi (MCD), Civic Centre, Minto Road, New Delhi, Delhi 110002</p>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Complaint Description</label>
                <textarea 
                  id="description" 
                  value={complaintDescription}
                  onChange={(e) => setComplaintDescription(e.target.value)}
                  rows="5"
                  className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-red-500 focus:ring-red-500"
                  placeholder="Please provide all necessary details about your complaint..."
                ></textarea>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button type="button" onClick={handleCloseModal} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700">Submit Complaint</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;