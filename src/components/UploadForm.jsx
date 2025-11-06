import { useState } from "react";
import { uploadMemory } from "../lib/memoriesApi";

export default function UploadForm({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [uploader, setUploader] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) return setError("Pilih file dulu");
    setLoading(true);
    setError(null);
    try {
      const newMemory = await uploadMemory(file, {
        caption,
        uploader: uploader || "Anonymous",
      });
      setFile(null);
      setCaption("");
      setUploader("");
      onUploaded && onUploaded(newMemory);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-xl mx-auto">
      <label className="block">
        <span className="text-sm font-medium text-gray-700">Pilih Foto atau Gambar : </span>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mt-2"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Caption</span>
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Tulis caption singkat"
          className="w-full mt-2 px-3 py-2 border rounded"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">
          Nama pengunggah
        </span>
        <input
          value={uploader}
          onChange={(e) => setUploader(e.target.value)}
          placeholder="Nama kamu"
          className="w-full mt-2 px-3 py-2 border rounded"
        />
      </label>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md font-medium disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
