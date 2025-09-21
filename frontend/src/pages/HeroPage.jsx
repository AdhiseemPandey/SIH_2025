import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import the frontpage illustration
import frontpageIllustration from '../assets/frontpage.svg';

// Import each carousel image individually
import image1 from '../assets/image_1.jpg';
import image2 from '../assets/image_2.jpg';
import image3 from '../assets/image_3.jpg';
import image4 from '../assets/image_4.jpg';
import image5 from '../assets/image_5.jpg';

const carouselData = [
  { id: 1, image: image1, stepTitle: "Step 1", text: "Log in and capture the problem around you." },
  { id: 2, image: image2, stepTitle: "Step 2", text: "Post it on Vyawastha with just one click." },
  { id: 3, image: image3, stepTitle: "Step 3", text: "Your concern instantly reaches the right department." },
  { id: 4, image: image4, stepTitle: "Step 4", text: "Authorities take swift action to resolve the issue." },
  { id: 5, image: image5, stepTitle: "Step 5", text: "Problem solved, community improved — together we win." },
];

function HeroPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = carouselData.length;

  // For text transition - now managing both title and description
  const [currentStepTitle, setCurrentStepTitle] = useState(carouselData[activeIndex].stepTitle);
  const [currentDescriptionText, setCurrentDescriptionText] = useState(carouselData[activeIndex].text);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    setIsFading(true);
    const fadeTimeout = setTimeout(() => {
      setCurrentStepTitle(carouselData[activeIndex].stepTitle);
      setCurrentDescriptionText(carouselData[activeIndex].text);
      setIsFading(false);
    }, 250); // Half of the image transition duration
    return () => clearTimeout(fadeTimeout);
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  const getPositionClass = (index) => {
    const active = activeIndex;
    const next = (activeIndex + 1) % totalItems;
    const prev = (activeIndex - 1 + totalItems) % totalItems;
    const nextToNext = (activeIndex + 2) % totalItems;
    const prevToPrev = (activeIndex - 2 + totalItems) % totalItems;
    let classes = "absolute rounded-full transition-all duration-500 ease-in-out cursor-pointer ";
    if (index === active) {
      classes += "transform scale-125 opacity-100 z-20 translate-x-0";
    } else if (index === next) {
      classes += "transform scale-90 opacity-80 z-10 translate-x-32 md:translate-x-48";
    } else if (index === prev) {
      classes += "transform scale-90 opacity-80 z-10 -translate-x-32 md:-translate-x-48";
    } else if (index === nextToNext && totalItems > 3) {
      classes += "transform scale-75 opacity-60 z-0 translate-x-64 md:translate-x-96";
    } else if (index === prevToPrev && totalItems > 3) {
      classes += "transform scale-75 opacity-60 z-0 -translate-x-64 md:-translate-x-96";
    } else {
      classes += "transform scale-0 opacity-0 pointer-events-none";
    }
    return classes;
  };

  return (
    <div className="relative w-full flex flex-col pt-20">
      {/* Global moving text background layers */}
      <div
        className="fixed inset-0 -z-50 vyawastha-light-bg dark:hidden"
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 -z-50 hidden vyawastha-dark-bg dark:block"
        aria-hidden="true"
      />

      {/* ===== Hero Section ===== */}
      <main className="flex-grow flex items-center justify-center px-8 md:px-16 pt-32 pb-16 md:pt-40 md:pb-24 min-h-[calc(100dvh-64px)]">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-3 leading-tight"
              style={{ fontFamily: "Times New Roman, serif", color: "#1e3a8a" }}
            >
              <Link
                to="/"
                className="inline-block border-b-2 border-dotted border-current hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-sm"
                aria-label="Vyawastha home"
              >
                Vyawastha
              </Link>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-green-700 font-bold mb-6 max-w-lg md:max-w-none">
              Report. Resolve. Reform — together for better governance.
            </p>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-10 leading-relaxed max-w-lg md:max-w-none">
              Vyawastha is a citizen-driven platform empowering you to connect with authorities. Easily report issues with images and location, ensuring your concerns reach the right department for swift, accountable, and transparent resolution.
            </p>
            <Link
              to="/register"
              className="px-12 py-4 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-xl md:text-2xl lg:text-3xl font-bold text-white shadow-xl hover:from-green-600 hover:to-blue-600 hover:scale-105 transition-all duration-300 ease-in-out inline-block transform"
            >
              Get Started
            </Link>
          </div>
          <div className="flex justify-center">
            <img
              src={frontpageIllustration}
              alt="Illustration showing abstract shapes and people connecting"
              className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
      </main>

      {/* Horizontal Line Separator */}
      <div className="px-8 md:px-16">
          <hr className="border-gray-300 dark:border-gray-700" />
      </div>

      {/* ===== About Us Section ===== */}
      <section className="bg-transparent px-8 md:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight"
            style={{ fontFamily: "Times New Roman, serif", color: "#1e3a8a" }}
          >
            About Us
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet magna non purus fermentum porttitor. Sed tristique suscipit diam, vel tincidunt purus.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            <div className="p-8 md:p-10 bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-2xl shadow-lg text-left">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-green-700 leading-snug">
                Our Vision
              </h3>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in elit vitae nunc varius euismod. Suspendisse potenti. Sed vel augue ut nisi fringilla euismod.
              </p>
            </div>
            <div className="p-8 md:p-10 bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-2xl shadow-lg text-left">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-green-700 leading-snug">
                Our Mission
              </h3>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras fermentum libero ac nunc hendrerit, eget porta odio mattis. Aenean laoreet libero eget ex volutpat posuere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Line Separator */}
      <div className="px-8 md:px-16">
          <hr className="border-gray-300 dark:border-gray-700" />
      </div>

      {/* ===== New Features Section ===== */}
      <section className="bg-transparent px-8 md:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight text-blue-800 dark:text-blue-300">
            Our Features
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover the core functionalities that make our platform the best choice for you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="p-8 bg-white/50 dark:bg-white/10 backdrop-blur-md rounded-3xl shadow-lg border-2 border-transparent transition-all duration-300 hover:border-blue-500 transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-300">Real-time Updates</h3>
              <p className="text-gray-700 dark:text-gray-200">Stay informed with live data streams and immediate notifications on all your projects.</p>
            </div>
            <div className="p-8 bg-white/50 dark:bg-white/10 backdrop-blur-md rounded-3xl shadow-lg border-2 border-transparent transition-all duration-300 hover:border-green-500 transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-300">Secure & Reliable</h3>
              <p className="text-gray-700 dark:text-gray-200">Your data is safe with us. We use advanced encryption to protect your information.</p>
            </div>
            <div className="p-8 bg-white/50 dark:bg-white/10 backdrop-blur-md rounded-3xl shadow-lg border-2 border-transparent transition-all duration-300 hover:border-purple-500 transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-300">Seamless Collaboration</h3>
              <p className="text-gray-700 dark:text-gray-200">Work together effortlessly with our integrated tools for a smooth workflow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Line Separator */}
      <div className="px-8 md:px-16">
          <hr className="border-gray-300 dark:border-gray-700" />
      </div>
      
      {/* ===== Circular Carousel Section ===== */}
      <section
        className="relative bg-transparent px-8 md:px-16 py-16 md:py-24"
        role="region"
        aria-label="Key Initiatives Carousel"
      >
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
                  aria-current={index === activeIndex ? "true" : undefined}
                  role="group"
                  aria-label={`Carousel item ${index + 1} of ${totalItems}`}
                  tabIndex={index === activeIndex ? 0 : -1}
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
                aria-label="Previous initiative"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-blue-800 text-white hover:bg-blue-700 transition-colors duration-300 focus:outline-none shadow-lg"
                aria-label="Next initiative"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
          <div className="mt-12 text-center" aria-live="polite">
            <h3 className={`text-2xl font-bold text-blue-700 mb-2 transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
              {currentStepTitle}
            </h3>
            <p className={`text-lg md:text-xl text-gray-700 max-w-2xl mx-auto min-h-[50px] transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
              {currentDescriptionText}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroPage;
