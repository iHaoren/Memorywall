const Footer = () => {
  return (
    <footer className="k from-slate-800 to-slate-900 text-white mt-16 md:mt-32 py-8 border-t border-slate-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4">
          {/* Logo or Brand */}
          <div className="text-center">
            <h3 className="text-lg md:text-xl font-bold text-teal-400 mb-1">
              Memory Wall
            </h3>
            <p className="text-xs md:text-sm text-gray-300">
              Capturing moments, preserving memories
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://github.com/iHaoren/Memorywall"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-teal-400 transition-colors duration-200 text-xs md:text-sm font-medium"
            >
              GitHub
            </a>
          </div>

          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-slate-600"></div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-xs text-gray-400">
              © 2025 PBL 2 Smart Building • Built with ❤️ by{" "}
              <a
                href="https://www.instagram.com/ibnuhaoren"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:text-teal-300 font-medium transition-colors duration-200"
              >
                @ibnuhaoren
              </a>
            </p>
            <p className="text-xs text-gray-500 mt-1">All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
