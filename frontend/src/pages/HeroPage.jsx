import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const carouselData = [
    {id: 1, image: "https://images.unsplash.com/photo-1579227114347-15d08fc37aa7?q=80&w=1080", text: "Vyawastha is committed to empowering citizens with easy access to government services."},
    {id: 2, image: "https://images.unsplash.com/photo-1543285198-ed1a384f889c?q=80&w=1080", text: "We enhance transparency through real-time project updates and public reports."},
    {id: 3, image: "https://images.unsplash.com/photo-1557426172-a7d519391e9e?q=80&w=1080", text: "Our mission is to promote digital literacy and skill development initiatives nationwide."},
    {id: 4, image: "https://images.unsplash.com/photo-1540890415-32a265691079?q=80&w=1080", text: "We strive to create a seamless and efficient communication channel between citizens and the government."},
    {id: 5, image: "https://images.unsplash.com/photo-1502446212108-a400f40ac34f?q=80&w=1080", text: "Join us in building a more connected, accountable, and progressive India."},
];

function HeroPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = carouselData.length;

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  const getPositionClass = (index) => {
    const leftIndex = (activeIndex - 1 + totalItems) % totalItems;
    const rightIndex = (activeIndex + 1) % totalItems;
    if (index === activeIndex) return "transform scale-125 opacity-100 z-20 translate-x-0";
    if (index === leftIndex) return "transform scale-75 opacity-70 z-10 -translate-x-40 md:-translate-x-60";
    if (index === rightIndex) return "transform scale-75 opacity-70 z-10 translate-x-40 md:translate-x-60";
    return "hidden";
  };

  return (
    <div className="w-full flex flex-col bg-gray-50 pt-20">
      {/* ===== Hero Section ===== */}
      <main className="flex-grow flex items-center justify-center px-8 md:px-16 pt-32 pb-16 md:pt-40 md:pb-24 min-h-[calc(100dvh-64px)]">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-5 leading-tight" style={{ fontFamily: "Times New Roman, serif", color: "#1e3a8a" }}>
              Vyawastha
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              fermentum, nunc sed placerat malesuada, lectus orci bibendum erat,
              at commodo augue nulla ac purus. Integer nec tristique velit.
            </p>
            <Link
              to="/register"
              className="px-12 py-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-lg md:text-xl lg:text-2xl font-semibold text-white shadow-md hover:from-green-600 hover:to-blue-600 hover:scale-105 transition inline-block"
            >
              Start
            </Link>
          </div>
          <div className="flex justify-center">
            <img
              src="/your-image.png"
              alt="Illustration"
              className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
      </main>
      
      {/* ===== About Us Section ===== */}
      <section className="bg-white px-8 md:px-16 py-16 md:py-24 min-h-[80vh]">
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight"
            style={{ fontFamily: "Times New Roman, serif", color: "#1e3a8a" }}
          >
            About Us
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit
            amet magna non purus fermentum porttitor. Sed tristique suscipit
            diam, vel tincidunt purus.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            <div className="p-8 md:p-10 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl shadow-lg text-left">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-green-700 leading-snug">
                Our Vision
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in
                elit vitae nunc varius euismod. Suspendisse potenti. Sed vel
                augue ut nisi fringilla euismod.
              </p>
            </div>
            <div className="p-8 md:p-10 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl shadow-lg text-left">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-green-700 leading-snug">
                Our Mission
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                fermentum libero ac nunc hendrerit, eget porta odio mattis.
                Aenean laoreet libero eget ex volutpat posuere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== New Features Section ===== */}
      <section className="bg-gray-100 px-8 md:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight text-blue-800">
            Our Features
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover the core functionalities that make our platform the best
            choice for you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="p-8 bg-white rounded-3xl shadow-lg border-2 border-transparent transition-all duration-300 hover:border-blue-500 transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2 text-blue-800">Real-time Updates</h3>
              <p className="text-gray-700">Stay informed with live data streams and immediate notifications on all your projects.</p>
            </div>
            <div className="p-8 bg-white rounded-3xl shadow-lg border-2 border-transparent transition-all duration-300 hover:border-green-500 transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2 text-blue-800">Secure & Reliable</h3>
              <p className="text-gray-700">Your data is safe with us. We use advanced encryption to protect your information.</p>
            </div>
            <div className="p-8 bg-white rounded-3xl shadow-lg border-2 border-transparent transition-all duration-300 hover:border-purple-500 transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2 text-blue-800">Seamless Collaboration</h3>
              <p className="text-gray-700">Work together effortlessly with our integrated tools for a smooth workflow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Circular Carousel Section ===== */}
      <section className="relative bg-white px-8 md:px-16 py-16 md:py-24">
        <div className="relative max-w-6xl mx-auto text-center z-10">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 leading-tight text-blue-800"
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            Key Initiatives
          </h2>
          <div className="relative flex items-center justify-center h-96 w-full">
            <div className="relative h-full w-full max-w-lg flex items-center justify-center">
              {carouselData.map((item, index) => (
                <div
                  key={item.id}
                  className={`absolute rounded-full transition-all duration-500 ease-in-out cursor-pointer ${getPositionClass(index)}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <img
                    src={item.image}
                    alt={item.text}
                    className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-xl"
                  />
                </div>
              ))}
            </div>
            <div className="absolute top-1/2 left-0 w-full flex justify-between transform -translate-y-1/2 px-4 md:px-0">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-blue-800 text-white hover:bg-blue-700 transition-colors duration-300 focus:outline-none shadow-lg"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-blue-800 text-white hover:bg-blue-700 transition-colors duration-300 focus:outline-none shadow-lg"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto min-h-[50px] transition-opacity duration-300">
              {carouselData[activeIndex].text}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroPage;