import React, { useState, useEffect } from 'react'; // Import useEffect
import { useNavigate } from 'react-router-dom';

const CreatePostPage = ({ addPost }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(""); // Will be auto-filled
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  // NEW: useEffect hook to fetch location automatically when the page loads
  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        setIsFetchingLocation(true);
        setLocation("Fetching your location...");
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              // Using a free reverse geocoding API
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
              );
              const data = await response.json();
              setLocation(data.display_name || "Address not found.");
            } catch (error) {
              setLocation("Could not fetch address.");
              console.error("Error fetching address:", error);
            } finally {
              setIsFetchingLocation(false);
            }
          },
          (error) => {
            setIsFetchingLocation(false);
            setLocation("Location access denied.");
            alert(`Error: ${error.message}. Please enable location permissions in your browser to continue.`);
          }
        );
      } else {
        setLocation("Geolocation not supported.");
        alert("Geolocation is not supported by your browser.");
      }
    };

    fetchLocation();
  }, []); // The empty array [] ensures this runs only once on component mount

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFetchingLocation || !title || !description || !location || !imageFile || location.includes("Fetching") || location.includes("denied")) {
      alert("Please ensure all fields are filled and location has been successfully fetched.");
      return;
    }

    const newPost = {
      title,
      description,
      location,
      image: imagePreviewUrl,
      status: "Pending",
      upvotes: 0,
    };
    
    addPost(newPost);
    navigate('/posts');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 pt-24">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">Create a New Post</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., New Community Park" className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
          </div>
          <div>
            <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-2">Image</label>
            <input id="image-upload" type="file" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" accept="image/*" onChange={handleImageChange} required />
            {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" className="mt-4 rounded-lg w-full h-auto object-cover max-h-64" />}
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="4" placeholder="Describe the report or initiative..." className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500" required></textarea>
          </div>
          
          {/* CHANGED: Location input is now read-only and auto-filled */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location (autodetected)</label>
            <input 
              type="text" 
              id="location" 
              value={location} 
              readOnly 
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full text-white py-3 rounded-lg font-bold text-lg bg-green-500 hover:bg-green-600 shadow-md transition-colors disabled:bg-gray-400" disabled={isFetchingLocation}>
              {isFetchingLocation ? 'Getting Location...' : 'Submit Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;