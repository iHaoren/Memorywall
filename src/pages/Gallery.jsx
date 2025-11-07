import { useEffect, useState } from "react";
import UploadForm from "../components/UploadForm";
import CommentSection from "../components/CommentSection";
import { fetchMemories, updateMemory, deleteMemory } from "../lib/memoriesApi";
import "animate.css";

const Gallery = () => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editCaption, setEditCaption] = useState("");
  const [editDesk, setEditDesk] = useState("");
  const [editUploader, setEditUploader] = useState("");
  const [showComments, setShowComments] = useState({});

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

  async function handleDelete(memory) {
    const ok = confirm(
      "Hapus kenangan ini? Tindakan ini tidak dapat dibatalkan."
    );
    if (!ok) return;
    try {
      setMemories((prev) => prev.filter((m) => m.id !== memory.id));
      await deleteMemory(memory.id, memory.image_path);
    } catch (err) {
      alert("Gagal menghapus: " + (err.message || err));
      load();
    }
  }

  function startEdit(memory) {
    setEditingId(memory.id);
    setEditCaption(memory.caption || "");
    setEditDesk(memory.desk || "");
    setEditUploader(memory.uploader || "");
  }

  async function saveEdit(memory) {
    try {
      const updates = {
        caption: editCaption,
        desk: editDesk,
        uploader: editUploader,
      };
      const updated = await updateMemory(memory.id, updates);
      setMemories((prev) =>
        prev.map((m) => (m.id === memory.id ? { ...m, ...updated } : m))
      );
      setEditingId(null);
    } catch (err) {
      alert("Gagal menyimpan: " + (err.message || err));
    }
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-teal-600 text-center mb-10 animate__animated animate__fadeInDown">
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
            className="bg-gray-900 rounded-2xl shadow-md shadow-gray-800 overflow-hidden flex flex-col animate__animated animate__fadeInUp"
          >
            <div className="relative">
              <img
                src={memory.image_url}
                alt={memory.caption || "Memory"}
                className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-5 flex flex-col flex-1">
              {editingId === memory.id ? (
                <div className="space-y-3 mb-4">
                  <input
                    value={editCaption}
                    onChange={(e) => setEditCaption(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700"
                    placeholder="Edit caption"
                  />
                  <textarea
                    value={editDesk}
                    onChange={(e) => setEditDesk(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700"
                    placeholder="Edit deskripsi"
                    rows="3"
                  />
                  <input
                    value={editUploader}
                    onChange={(e) => setEditUploader(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700"
                    placeholder="Edit uploader"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(memory)}
                      className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex-1 border border-gray-600 text-gray-300 py-2 rounded hover:bg-gray-800"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-gray-100 mb-2">
                    {memory.caption || "Tanpa Judul"}
                  </h3>
                  {memory.desk && (
                    <p className="text-gray-200 mb-4 text-sm md:text-base">
                      {memory.desk}
                    </p>
                  )}
                  <p className="text-sm text-gray-400 mb-4 mt-auto">
                    Uploaded by{" "}
                    <span className="text-gray-300">
                      {memory.uploader || "Anonymous"}
                    </span>{" "}
                    •{" "}
                    {memory.uploaded_at
                      ? new Date(memory.uploaded_at).toLocaleDateString()
                      : ""}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => startEdit(memory)}
                      className="flex-1 border-2 border-gray-800 text-gray-300 py-2 rounded bg-teal-600 hover:bg-gray-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(memory)}
                      className="flex-1 text-red-400 py-2 rounded hover:bg-gray-800"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}

              <div className="mt-4">
                <button
                  onClick={() =>
                    setShowComments((prev) => ({
                      ...prev,
                      [memory.id]: !prev[memory.id],
                    }))
                  }
                  className="text-teal-400 hover:text-teal-300 text-sm font-medium"
                >
                  {showComments[memory.id] ? "Hide Comments" : "Show Comments"}
                </button>
                {showComments[memory.id] && (
                  <CommentSection memoryId={memory.id} />
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};

export default Gallery;
