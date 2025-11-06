const Footer = () => {
  return (
    <footer className="bg-gray-900 text-teal-300 mt-32 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4">
        {/* Created by Instagram */}
        <p className="text-sm text-center">
          Created by{' '}
          <a
            href="https://instagram.com/ibnuhaoren"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-300 hover:text-gray-300 font-medium transition-colors duration-200"
          >
            @ibnuhaoren
          </a>
        </p>

        {/* Copyright */}
        <p className="text-sm text-gray-300 text-center">
          © 2025 PBL 2 Smart Building
          <br /> All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;