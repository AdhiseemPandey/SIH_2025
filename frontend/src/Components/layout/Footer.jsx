import React from 'react';

function Footer() {
  return (
    <footer className="w-full bg-blue-950 text-gray-200 px-10 py-6 shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Left: Brand */}
        <div>
          <h1
            className="text-3xl md:text-4xl font-bold hover:text-green-300 transition-colors duration-300 cursor-pointer"
            style={{ fontFamily: 'Times New Roman, serif', color: '#22c55e' }}
          >
            Vyawastha
          </h1>
          <hr className="mt-2 border-gray-400 w-16" />
          <ul className="mt-2 space-y-1 text-sm md:text-base">
            <li className="hover:text-green-400 cursor-pointer transition">About Us</li>
            <li className="hover:text-green-400 cursor-pointer transition">Our Mission</li>
            <li className="hover:text-green-400 cursor-pointer transition">Contact</li>
          </ul>
        </div>

        {/* Middle: References */}
        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-2 text-green-400">
            References
          </h2>
          <ul className="space-y-1 text-sm md:text-base">
            <li><a href="#" className="hover:text-green-300 hover:underline">Docs</a></li>
            <li><a href="#" className="hover:text-green-300 hover:underline">API</a></li>
            <li><a href="#" className="hover:text-green-300 hover:underline">Community</a></li>
          </ul>
        </div>

        {/* Right: Contacts */}
        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-2 text-green-400">
            Contacts
          </h2>
          <ul className="space-y-1 text-sm md:text-base">
            <li className="hover:text-green-300 hover:underline transition cursor-pointer">
              Email: support@vyawastha.com
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
  );
}

export default Footer;