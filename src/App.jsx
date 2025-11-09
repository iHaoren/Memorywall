import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMemories } from "./lib/memoriesApi";
import CommentSection from "./components/CommentSection";

function App() {
  const [featuredMemories, setFeaturedMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMemory, setModalMemory] = useState(null);

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
        <div className="absolute inset-0 bg-slate-700 opacity-30 rounded-3xl shadow-slate-900 shadow-lg"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Welcome to Our Memory Wall
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
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
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Featured Memories
        </h2>
        {loading && (
          <p className="text-center text-gray-300">
            Loading featured memories...
          </p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredMemories.map((memories) => (
              <article
                key={memories.id}
                className="bg-gray-900 rounded-xl shadow-gray-900 shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full cursor-pointer"
                onClick={() => {
                  setModalMemory(memories);
                  setModalOpen(true);
                }}
              >
                <div className="relative">
                  <img
                    src={memories.image_url || memories.gambar}
                    alt={memories.nama || memories.caption || "Memory"}
                    className="w-full h-48 md:h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </article>
            ))}
          </div>
        )}
        <div className="text-center mt-12">
          <Link
            to="/gallery"
            className="inline-block border-2 border-[#96f7e4] text-teal-200 px-6 md:px-8 py-3 rounded-full font-medium hover:bg-gray-800 hover:text-gray-100 transition-colors duration-200"
          >
            View All Memories
          </Link>
        </div>
      </section>

      {/* Modal */}
      {modalOpen && modalMemory && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
            >
              ×
            </button>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <img
                  src={modalMemory.image_url || modalMemory.gambar}
                  alt={modalMemory.nama || modalMemory.caption || "Memory"}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6 overflow-y-auto max-h-96 md:max-h-none">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-100 mb-4">
                  {modalMemory.nama || modalMemory.caption}
                </h3>
                {modalMemory.desk && (
                  <p className="text-gray-200 mb-4 text-sm md:text-base">
                    {modalMemory.desk}
                  </p>
                )}
                <p className="text-sm text-gray-400 mb-6">
                  Uploaded by {modalMemory.uploader || "Anonymous"} •{" "}
                  {modalMemory.uploaded_at
                    ? new Date(modalMemory.uploaded_at).toLocaleDateString()
                    : modalMemory.date
                    ? new Date(modalMemory.date).toLocaleDateString()
                    : ""}
                </p>
                <CommentSection memoryId={modalMemory.id} />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
