import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <h1 className="text-2xl font-bold text-teal-300">Memory Wall</h1>
          </Link>

          {/* Navigation Links */}
          <div className="hidden sm:flex sm:space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 text-base font-medium transition-colors duration-200 ${
                isActive("/")
                  ? "text-teal-100 bg-teal-700 rounded-md"
                  : "text-teal-300 hover:text-gray-300"
              }`}
            >
              Home
            </Link>
            <Link
              to="/gallery"
              className={`px-3 py-2 text-base font-medium transition-colors duration-200 ${
                isActive("/gallery")
                  ? "text-teal-100 bg-teal-700 rounded-md"
                  : "text-teal-300 hover:text-gray-300"
              }`}
            >
              Gallery
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 text-base font-medium transition-colors duration-200 ${
                isActive("/about")
                  ? "text-teal-100 bg-teal-700 rounded-md"
                  : "text-teal-300 hover:text-gray-300"
              }`}
            >
              About
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-teal-300 hover:text-gray-300 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {/* Menu Icon */}
              <svg
                className={isOpen ? "hidden" : "h-6 w-6"}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close Icon */}
              <svg
                className={isOpen ? "h-6 w-6" : "hidden"}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden ${isOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
              isActive("/")
                ? "text-teal-100 bg-teal-700 rounded-md"
                : "text-teal-300 hover:text-gray-300"
            }`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/gallery"
            className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
              isActive("/gallery")
                ? "text-teal-100 bg-teal-700 rounded-md"
                : "text-teal-300 hover:text-gray-300"
            }`}
            onClick={() => setIsOpen(false)}
          >
            Gallery
          </Link>
          <Link
            to="/about"
            className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
              isActive("/about")
                ? "text-teal-100 bg-teal-700 rounded-md"
                : "text-teal-300 hover:text-gray-300"
            }`}
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
