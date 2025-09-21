import React, { useState } from "react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreviewUrl("");
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setIsFetchingLocation(true);
      setLocation("Fetching location...");
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
            );
            const data = await response.json();
            setLocation(data.display_name || "Location not found");
          } catch (error) {
            setLocation("Error fetching address");
          } finally {
            setIsFetchingLocation(false);
          }
        },
        (error) => {
          setIsFetchingLocation(false);
          setLocation("Location access denied or unavailable.");
          // This line now uses the 'error' object to provide a more specific message.
          alert(
            `Could not retrieve location. Error Code: ${error.code}. Please check your browser settings or location services.`
          );
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLocation("Geolocation not supported.");
    }
  };

  const isFormValid =
    title.trim() !== "" &&
    description.trim() !== "" &&
    location.trim() !== "" &&
    imageFile !== null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      alert(
        "Please ensure all fields are filled, including an image and your location."
      );
      return;
    }

    const postData = {
      title,
      description,
      location,
      image: imageFile,
      status: "pending",
      upvotes: 1,
    };

    console.log("Submitting post data:", postData);
    alert("Post submitted! Check console for data.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 w-full max-w-3xl relative">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
            Create a New Post
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Share your green energy initiatives with the community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Green Energy Summit"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 placeholder-gray-400 transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
          </div>

          {/* Image Upload and Preview */}
          <div>
            <label
              htmlFor="image-upload"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Image
            </label>
            <label
              htmlFor="image-upload"
              className="w-full text-center block cursor-pointer bg-gray-50 text-gray-600 font-semibold py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
            >
              Choose an Image
              <input
                id="image-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
            <div className="flex justify-center mt-4">
              <div className="w-full rounded-lg overflow-hidden border border-gray-300">
                <img
                  src={
                    imagePreviewUrl ||
                    "https://via.placeholder.com/600x400?text=Image+Preview"
                  }
                  alt="Image Preview"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Description Textarea */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              placeholder="Describe your project, its goals, and impact..."
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 placeholder-gray-400 resize-none transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            ></textarea>
          </div>

          {/* Location Input and Geolocation Button */}
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter or get location"
              className="w-full rounded-xl p-4 border-2 border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="button"
              onClick={handleGetLocation}
              disabled={isFetchingLocation}
              className={`flex-shrink-0 bg-blue-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 ${
                isFetchingLocation
                  ? "bg-blue-300 cursor-not-allowed"
                  : "hover:bg-blue-600"
              }`}
            >
              {isFetchingLocation ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "📍"
              )}
            </button>
          </div>

          {/* Post Details (Status & Upvotes) */}
          <div className="flex items-center justify-between font-medium text-gray-600 border-t border-gray-200 pt-4">
            <div className="flex items-center space-x-2">
              <span className="text-red-500">●</span>
              <span>
                Status:{" "}
                <span className="text-gray-900 font-semibold">Pending</span>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">👍</span>
              <span>
                Upvotes: <span className="text-gray-900 font-semibold">1</span>
              </span>
            </div>
          </div>

          {/* Post Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full text-white py-3 rounded-lg font-bold text-lg transition-colors duration-200 shadow-md ${
                isFormValid
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
