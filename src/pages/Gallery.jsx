import { useEffect, useState } from "react";
import UploadForm from "../components/UploadForm";
import { memoryList } from "../data.js";
import { fetchMemories, updateMemory, deleteMemory } from "../lib/memoriesApi";

const Gallery = () => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMemories();
      console.debug("fetchMemories ->", data);
      // if remote DB is empty, fall back to local sample data so the UI shows something
      if (Array.isArray(data) && data.length > 0) {
        setMemories(data);
      } else {
        console.info("No remote memories found — using local sample data.");
        setMemories(memoryList);
      }
    } catch (err) {
      console.error("fetchMemories error ->", err);
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(memory) {
    const ok = window.confirm(
      "Hapus kenangan ini? Tindakan ini tidak dapat dibatalkan."
    );
    if (!ok) return;
    try {
      // optimis update UI
      setMemories((s) => s.filter((m) => m.id !== memory.id));
      await deleteMemory(
        memory.id,
        memory.image_path || memory.imagePath || memory.imagePath
      );
    } catch (err) {
      // jika error, reload list
      console.error(err);
      await load();
      alert("Gagal menghapus: " + (err.message || err));
    }
  }

  const [editingId, setEditingId] = useState(null);
  const [editCaption, setEditCaption] = useState("");
  const [editUploader, setEditUploader] = useState("");

  async function startEdit(memory) {
    setEditingId(memory.id);
    setEditCaption(memory.caption || memory.desk || "");
    setEditUploader(memory.uploader || "");
  }

  async function saveEdit(memory) {
    try {
      const updates = { caption: editCaption, uploader: editUploader };
      const updated = await updateMemory(memory.id, updates);
      setMemories((s) =>
        s.map((m) => (m.id === memory.id ? { ...m, ...updated } : m))
      );
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan perubahan: " + (err.message || err));
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Memory Gallery
      </h1>

      <section className="mb-10">
        <h2 className="text-lg font-medium text-gray-700 text-center mb-4">
          Upload a new memory
        </h2>
        <div className="max-w-2xl mx-auto">
          <UploadForm onUploaded={(m) => setMemories((s) => [m, ...s])} />
        </div>
      </section>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <p className="text-center text-teal-600 m-12 text-lg animate__animated animate__fadeInUp">
        Add new memories  ^_____^
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {memories.map((memory) => (
          <article
            key={memory.id}
            className="bg-gray-900 rounded-xl shadow-gray-900 shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="relative">
              <img
                src={memory.image_url || memory.gambar}
                alt={memory.nama || memory.caption || "Memory"}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-100 mb-2">
                    {memory.nama || memory.caption}
                  </h3>
                </div>
                <div className="ml-4 flex items-center gap-2">
                  {editingId === memory.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(memory)}
                        className="text-sm px-3 py-1 bg-teal-600 text-white rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-sm px-3 py-1 border border-gray-700 text-gray-100 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(memory)}
                        className="text-sm px-3 py-1 border border-gray-700 text-gray-100 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(memory)}
                        className="text-sm px-3 py-1 text-red-400 border border-transparent rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>

              {editingId === memory.id ? (
                <div className="mt-4 space-y-3">
                  <input
                    value={editCaption}
                    onChange={(e) => setEditCaption(e.target.value)}
                    className="w-full px-3 py-2 border rounded bg-gray-800 text-gray-100"
                  />
                  <input
                    value={editUploader}
                    onChange={(e) => setEditUploader(e.target.value)}
                    className="w-full px-3 py-2 border rounded bg-gray-800 text-gray-100"
                  />
                </div>
              ) : (
                <>
                  {memory.desk && (
                    <p className="text-gray-200 mb-4 leading-relaxed">
                      {memory.desk}
                    </p>
                  )}
                  {memory.caption && (
                    <p className="text-gray-200 mb-4 leading-relaxed">
                      {memory.caption}
                    </p>
                  )}
                  <div className="mt-4">
                    <p className="text-sm text-gray-400">
                      Uploaded by {memory.uploader || "Anonymous"} •{" "}
                      {memory.uploaded_at
                        ? new Date(memory.uploaded_at).toLocaleDateString()
                        : memory.date
                        ? new Date(memory.date).toLocaleDateString()
                        : ""}
                    </p>
                  </div>
                </>
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};

export default Gallery;
