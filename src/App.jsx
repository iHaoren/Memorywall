import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMemories } from "./lib/memoriesApi";
import CommentSection from "./components/CommentSection";

function App() {
  const [featuredMemories, setFeaturedMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState({});

  useEffect(() => {
    async function loadFeatured() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMemories();
        // Take only the first 6 memories for the homepage
        setFeaturedMemories(data.slice(0, 6));
      } catch (err) {
        console.error("fetchMemories error ->", err);
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16 relative py-20">
        <div className="absolute inset-0 bg-teal-600 opacity-25 rounded-3xl shadow-teal-900 shadow-lg"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Welcome to Our Memory Wall
          </h1>
          <p className="text-lg md:text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
            A space where our moments live forever — I try to capture every
            moments.
          </p>
          <Link
            to="/gallery"
            className="inline-block bg-teal-600 hover:bg-teal-700 active:bg-teal-700 text-teal-50 hover:text-teal-100 px-6 md:px-8 py-3 rounded-full font-medium shadow-gray-900 shadow-xs hover:shadow-md transition-all duration-200"
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
        {loading && (
          <p className="text-center text-gray-600">
            Loading featured memories...
          </p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredMemories.map((memories) => (
              <article
                key={memories.id}
                className="bg-gray-900 rounded-xl shadow-gray-900 shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full"
              >
                <div className="relative">
                  <img
                    src={memories.image_url || memories.gambar}
                    alt={memories.nama || memories.caption || "Memory"}
                    className="w-full h-48 md:h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 md:p-6 flex flex-col grow">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-100 mb-2">
                    {memories.nama || memories.caption}
                  </h3>
                  <p className="text-gray-200 mb-4 text-sm md:text-base grow">
                    {memories.desk || memories.caption}
                  </p>
                  <div className="mt-auto">
                    <p className="text-sm text-gray-400">
                      Uploaded by {memories.uploader || "Anonymous"} •{" "}
                      {memories.uploaded_at
                        ? new Date(memories.uploaded_at).toLocaleDateString()
                        : memories.date
                        ? new Date(memories.date).toLocaleDateString()
                        : ""}
                    </p>
                  </div>
                  <div className="mt-auto">
                    <button
                      onClick={() =>
                        setShowComments((prev) => ({
                          ...prev,
                          [memories.id]: !prev[memories.id],
                        }))
                      }
                      className="text-teal-400 hover:text-teal-300 text-sm font-medium"
                    >
                      {showComments[memories.id]
                        ? "Hide Comments"
                        : "Show Comments"}
                    </button>
                    {showComments[memories.id] && (
                      <CommentSection memoryId={memories.id} />
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        <div className="text-center mt-12">
          <Link
            to="/gallery"
            className="inline-block border-2 border-[#1e2939] text-gray-800 px-6 md:px-8 py-3 rounded-full font-medium hover:bg-gray-800 hover:text-gray-100 transition-colors duration-200"
          >
            View All Memories
          </Link>
        </div>
      </section>
    </main>
  );
}

export default App;
