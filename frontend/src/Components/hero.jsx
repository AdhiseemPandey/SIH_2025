import React, { useState } from "react";

const carouselData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1579227114347-15d08fc37aa7?q=80&fm=jpg&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w1MjI3NzZ8MHwxfHNlYXJjaHwxfHx0cmFuc3BhcmVuY3l8ZW58MHx8fHwxNjk5MjQxMDcyfDA&ixlib=rb-4.0.3&w=1080",
    text: "Vyawastha is committed to empowering citizens with easy access to government services.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1543285198-ed1a384f889c?q=80&fm=jpg&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w1MjI3NzZ8MHwxfHxncm91cCBoYW5kc3xlbnwwfHx8fDE2OTkyNDEwNzJ8MA&ixlib=rb-4.0.3&w=1080",
    text: "We enhance transparency through real-time project updates and public reports.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1557426172-a7d519391e9e?q=80&fm=jpg&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w1MjI3NzZ8MHwxfHxkaWdpdGFsIGxpdGVyYWN5fGVufDB8fHx8MTY5OTI0MTA3M3ww&ixlib=rb-4.0.3&w=1080",
    text: "Our mission is to promote digital literacy and skill development initiatives nationwide.",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1540890415-32a265691079?q=80&fm=jpg&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w1MjI3NzZ8MHwxfHxjb21tdW5pY2F0aW9uJTIwY2hhbm5lbHxlbnwwfHx8fDE2OTkyNDEwNzZ8MA&ixlib=rb-4.0.3&w=1080",
    text: "We strive to create a seamless and efficient communication channel between citizens and the government.",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1502446212108-a400f40ac34f?q=80&fm=jpg&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w1MjI3NzZ8MHwxfHNlYXJjaHwxfHxidWlsZGluZyUyMGluZGlhfGVufDB8fHx8MTY5OTI0MTA3N3ww&ixlib=rb-4.0.3&w=1080",
    text: "Join us in building a more connected, accountable, and progressive India.",
  },
];

function Hero() {
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

    if (index === activeIndex) {
      return "transform scale-125 opacity-100 z-20 translate-x-0";
    } else if (index === leftIndex) {
      return "transform scale-75 opacity-70 z-10 -translate-x-40 md:-translate-x-60";
    } else if (index === rightIndex) {
      return "transform scale-75 opacity-70 z-10 translate-x-40 md:translate-x-60";
    } else {
      return "hidden"; // Hide other images
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50">
      {/* ===== Navigation Bar ===== */}
      <div className="nav fixed top-0 left-0 w-full bg-white shadow-md px-6 py-4 flex justify-between items-center z-50">
        {/* Left: Logo + Name */}
        <div className="flex items-center space-x-3 cursor-pointer">
          <img
            src="/your-logo.png"
            alt="Org Logo"
            className="h-10 w-10 object-contain hover:scale-105 transition-transform duration-300"
          />
          <span
            className="text-3xl md:text-4xl font-bold transition duration-300 hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600 hover:bg-clip-text hover:text-transparent"
            style={{ fontFamily: "Times New Roman, serif", color: "#15803d" }}
          >
            Vyawastha
          </span>
        </div>

        {/* Right: Sign In */}
        <div className="pr-4">
          <a
            href="/signin"
            className="px-6 py-2 rounded-full bg-green-600 text-white text-lg md:text-xl font-semibold transition duration-300 transform hover:bg-green-700 hover:shadow-lg hover:scale-105"
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            Sign In
          </a>
        </div>
      </div>

      {/* ===== Hero Section ===== */}
      <main className="flex-grow flex items-center justify-center px-8 md:px-16 pt-32 pb-16 md:pt-40 md:pb-24 min-h-[calc(100dvh-64px)]">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Side: Text */}
          <div>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-5 leading-tight"
              style={{
                fontFamily: "Times New Roman, serif",
                color: "#1e3a8a",
              }}
            >
              Vyawastha
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              fermentum, nunc sed placerat malesuada, lectus orci bibendum erat,
              at commodo augue nulla ac purus. Integer nec tristique velit.
              Fusce vel lorem ac odio gravida convallis in non magna.
            </p>
            <button className="px-12 py-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-lg md:text-xl lg:text-2xl font-semibold text-white shadow-md hover:from-green-600 hover:to-blue-600 hover:scale-105 transition">
              Start
            </button>
          </div>

          {/* Right Side: Image */}
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
            {/* Card 1 */}
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

            {/* Card 2 */}
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
            {/* Feature Card 1 */}
            <div className="p-8 bg-white rounded-3xl shadow-lg border-2 border-transparent transition-all duration-300 hover:border-blue-500 transform hover:scale-105">
              <div className="flex justify-center mb-4 text-blue-500">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800">
                Real-time Updates
              </h3>
              <p className="text-gray-700">
                Stay informed with live data streams and immediate notifications
                on all your projects.
              </p>
            </div>
            {/* Feature Card 2 */}
            <div className="p-8 bg-white rounded-3xl shadow-lg border-2 border-transparent transition-all duration-300 hover:border-green-500 transform hover:scale-105">
              <div className="flex justify-center mb-4 text-green-500">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800">
                Secure & Reliable
              </h3>
              <p className="text-gray-700">
                Your data is safe with us. We use advanced encryption to protect
                your information.
              </p>
            </div>
            {/* Feature Card 3 */}
            <div className="p-8 bg-white rounded-3xl shadow-lg border-2 border-transparent transition-all duration-300 hover:border-purple-500 transform hover:scale-105">
              <div className="flex justify-center mb-4 text-purple-500">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20v-2c-.356-.343-.809-.586-1.356-.664m-1.356.664a3 3 0 01-5.356 1.857M14 10a4 4 0 11-8 0 4 4 0 018 0zm-4 7a4 4 0 00-3.156-3.844M10 14a4 4 0 100-8 4 4 0 000 8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800">
                Seamless Collaboration
              </h3>
              <p className="text-gray-700">
                Work together effortlessly with our integrated tools for a
                smooth workflow.
              </p>
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
                  className={`absolute rounded-full transition-all duration-500 ease-in-out cursor-pointer ${getPositionClass(
                    index
                  )}`}
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-blue-800 text-white hover:bg-blue-700 transition-colors duration-300 focus:outline-none shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
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

      {/* ===== Footer ===== */}
      <footer className="bottom-0 left-0 w-full bg-blue-950 text-gray-200 px-10 py-6 shadow-inner">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Left: Brand */}
          <div>
            <h1
              className="text-3xl md:text-4xl font-bold hover:text-green-300 transition-colors duration-300 cursor-pointer"
              style={{
                fontFamily: "Times New Roman, serif",
                color: "#22c55e",
              }}
            >
              Vyawastha
            </h1>
            <hr className="mt-2 border-gray-400 w-16" />
            <ul className="mt-2 space-y-1 text-sm md:text-base">
              <li className="hover:text-green-400 cursor-pointer transition">
                WE ARE
              </li>
              <li className="hover:text-green-400 cursor-pointer transition">
                HERE IN
              </li>
              <li className="hover:text-green-400 cursor-pointer transition">
                THE
              </li>
            </ul>
          </div>

          {/* Middle: References */}
          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-green-400">
              References
            </h2>
            <ul className="space-y-1 text-sm md:text-base">
              <li>
                <a
                  href="#"
                  className="hover:text-green-300 hover:underline hover:scale-105 transition inline-block"
                >
                  Docs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-300 hover:underline hover:scale-105 transition inline-block"
                >
                  API
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-300 hover:underline hover:scale-105 transition inline-block"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Right: Contacts */}
          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-green-400">
              Contacts
            </h2>
            <ul className="space-y-1 text-sm md:text-base">
              <li className="hover:text-green-300 hover:underline transition cursor-pointer">
                Email: [support@vyawastha.com](mailto:support@vyawastha.com)
              </li>
              <li className="hover:text-green-300 hover:underline transition cursor-pointer">
                Phone: +91 98765 43210
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-6 border-t border-gray-700 pt-3 text-center text-xs md:text-sm text-gray-400">
          © {new Date().getFullYear()} Vyawastha. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Hero;
