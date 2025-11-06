import { memoryList } from "./data.js";
import { Link } from "react-router-dom";

function App() {
  // Take only the first 6 memories for the homepage
  const featuredMemories = memoryList.slice(0, 6);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16 relative py-20">
        <div className="absolute inset-0 bg-teal-800 opacity-30 rounded-3xl shadow-teal-900 shadow-lg"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Welcome to Our Memory Wall
          </h1>
          <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
            A space where our moments live forever — I try to capture every
            moments.
          </p>
          <Link
            to="/gallery"
            className="inline-block bg-teal-600 hover:bg-teal-700 text-teal-50 hover:text-teal-100 px-8 py-3 rounded-full font-medium shadow-gray-900 shadow-xs hover:shadow-md transition-all duration-200"
          >
            Explore Gallery
          </Link>
        </div>
      </section>

      {/* Featured Memories Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Featured Memories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredMemories.map((memories) => (
            <article
              key={memories.id}
              className="bg-gray-900 rounded-xl shadow-gray-900 shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={memories.gambar}
                  alt={memories.name}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  {memories.name}
                </h3>
                <p className="text-gray-200 mb-4">{memories.desk}</p>
                <div className="mt-4">
                  <p className="text-loose text-gray-400">
                    Uploaded by {memories.uploader} •{" "}
                    {new Date(memories.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4"></div>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/gallery"
            className="inline-block border-2 border-[#1e2939] text-gray-800 px-8 py-3 rounded-full font-medium hover:bg-gray-800 hover:text-gray-100 transition-colors duration-200"
          >
            View All Memories
          </Link>
        </div>
      </section>
    </main>
  );
}

export default App;
