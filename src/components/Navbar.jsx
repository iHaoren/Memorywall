import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-teal-300">Memory Wall</h1>
          </Link>

          {/* Navigation Links */}
          <div className="hidden sm:flex sm:space-x-8">
            <Link
              to="/"
              className="text-teal-300 hover:text-gray-300 px-3 py-2 text-base font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/gallery"
              className="text-teal-300 hover:text-gray-300 px-3 py-2 text-base font-medium transition-colors duration-200"
            >
              Gallery
            </Link>
            <Link
              to="/about"
              className="text-teal-300 hover:text-gray-300 px-3 py-2 text-base font-medium transition-colors duration-200"
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
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Menu Icon */}
              <svg
                className="h-6 w-6"
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
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="text-teal-300 hover:text-gray-300 block px-3 py-2 text-base font-medium"
          >
            Home
          </Link>
          <Link
            to="/gallery"
            className="text-teal-300 hover:text-gray-300 block px-3 py-2 text-base font-medium"
          >
            Gallery
          </Link>
          <Link
            to="/about"
            className="text-teal-300 hover:text-gray-300 block px-3 py-2 text-base font-medium"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
