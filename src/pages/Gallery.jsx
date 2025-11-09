import { useEffect, useState } from "react";
import UploadForm from "../components/UploadForm";
import CommentSection from "../components/CommentSection";
import { fetchMemories, deleteMemory } from "../lib/memoriesApi";
import "animate.css";

const Gallery = () => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMemory, setModalMemory] = useState(null);

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMemories();
      setMemories(data);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-teal-300 text-center mb-10 animate__animated animate__fadeInDown">
        Memory Gallery
      </h1>

      <section className="mb-10">
        <h2 className="text-lg font-medium text-gray-300 text-center mb-4">
          Upload a new memory
        </h2>
        <div className="max-w-2xl mx-auto">
          <UploadForm onUploaded={(m) => setMemories((s) => [m, ...s])} />
        </div>
      </section>

      {loading && <p className="text-center text-gray-400">Loading...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}

      {!loading && memories.length === 0 && (
        <p className="text-center text-gray-500 italic animate__animated animate__fadeInUp">
          Belum ada kenangan 😢
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {memories.map((memory) => (
          <article
            key={memory.id}
            className="bg-gray-900 rounded-2xl shadow-md shadow-gray-800 overflow-hidden flex flex-col animate__animated animate__fadeInUp cursor-pointer"
            onClick={() => {
              setModalMemory(memory);
              setModalOpen(true);
            }}
          >
            <div className="relative">
              <img
                src={memory.image_url}
                alt={memory.caption || "Memory"}
                className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </article>
        ))}
      </div>

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
                  src={modalMemory.image_url}
                  alt={modalMemory.caption || "Memory"}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6 overflow-y-auto max-h-96 md:max-h-none">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-100">
                    {modalMemory.caption || "Tanpa Judul"}
                  </h3>
                  <button
                    onClick={async () => {
                      if (
                        confirm(
                          "Yakin mau dihapus? Permanen lho..."
                        )
                      ) {
                        try {
                          await deleteMemory(
                            modalMemory.id,
                            modalMemory.image_path
                          );
                          setMemories((prev) =>
                            prev.filter((m) => m.id !== modalMemory.id)
                          );
                          setModalOpen(false);
                        } catch (err) {
                          alert("Gagal menghapus: " + (err.message || err));
                        }
                      }
                    }}
                    className="text-red-400 hover:text-red-300 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
                {modalMemory.desk && (
                  <p className="text-gray-200 mb-4 text-sm md:text-base">
                    {modalMemory.desk}
                  </p>
                )}
                <p className="text-sm text-gray-400 mb-6">
                  Uploaded by {modalMemory.uploader || "Anonymous"} •{" "}
                  {modalMemory.uploaded_at
                    ? new Date(modalMemory.uploaded_at).toLocaleDateString()
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
};

export default Gallery;
