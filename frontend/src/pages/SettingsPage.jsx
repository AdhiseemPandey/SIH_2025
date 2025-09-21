import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

// Mock user data based on your schema for the profile form
const mockUserData = {
    firstName: "Adhiseem",
    lastName: "Pandey",
    emailId: "adhiseem.atwork@gmail.com",
    age: 20,
    aadharNumber: "123456789012",
    mobileNumber: "9876543210",
    password: "", // Not pre-filled for security
};

// --- Sub-component for the Profile Form ---
const ProfileForm = () => {
    const [profileData, setProfileData] = useState(mockUserData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (profileData.password && profileData.password.length < 8) {
            alert("New password must be at least 8 characters long.");
            return;
        }
        console.log("Saving profile data:", profileData);
        alert("Profile updated successfully! (Check console for data)");
    };

    return (
        // FIX: The form fields were missing. They have been added below.
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input type="text" id="firstName" name="firstName" value={profileData.firstName} onChange={handleChange} required minLength="2" maxLength="20" className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input type="text" id="lastName" name="lastName" value={profileData.lastName} onChange={handleChange} required minLength="2" maxLength="20" className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
            </div>
            <div>
                <label htmlFor="emailId" className="block text-sm font-medium text-gray-700">Email Address (cannot be changed)</label>
                <input type="email" id="emailId" name="emailId" value={profileData.emailId} readOnly className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm bg-gray-100 cursor-not-allowed" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                    <input type="number" id="age" name="age" value={profileData.age} onChange={handleChange} required min="15" max="120" className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div>
                    <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                    <input type="tel" id="mobileNumber" name="mobileNumber" value={profileData.mobileNumber} onChange={handleChange} required className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
            </div>
            <div>
                <label htmlFor="aadharNumber" className="block text-sm font-medium text-gray-700">Aadhaar Number (cannot be changed)</label>
                <input type="text" id="aadharNumber" name="aadharNumber" value={profileData.aadharNumber} readOnly className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm bg-gray-100 cursor-not-allowed" />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password (min. 8 characters)</label>
                <input type="password" id="password" name="password" value={profileData.password} onChange={handleChange} minLength="8" placeholder="Leave blank to keep current password" className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            </div>
            <div className="flex justify-end pt-4">
                <button type="submit" className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                    Save Changes
                </button>
            </div>
        </form>
    );
};

// --- Sub-component for listing posts and triggering the complaint modal ---
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

// --- Sub-component to display registered complaints ---
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
    const newComplaint = {
        id: Date.now(),
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