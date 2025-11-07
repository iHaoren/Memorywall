import { useState } from "react";
import { uploadMemory } from "../lib/memoriesApi";

export default function UploadForm({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [desk, setDesk] = useState("");
  const [uploader, setUploader] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const UPLOAD_PIN = import.meta.env.VITE_UPLOAD_PIN;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) return setError("Please select an image first.");
    if (pin !== UPLOAD_PIN) return setError("Invalid PIN. Access denied.");

    setLoading(true);
    setError(null);

    try {
      const newMemory = await uploadMemory(file, {
        caption,
        desk,
        uploader: uploader || "Anonymous",
      });

      setFile(null);
      setCaption("");
      setDesk("");
      setUploader("");
      setPin("");
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
        <span className="text-sm font-medium text-gray-700">Upload Photo</span>
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
          placeholder="Write a short caption..."
          className="w-full mt-2 px-3 py-2 border rounded"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Description</span>
        <textarea
          value={desk}
          onChange={(e) => setDesk(e.target.value)}
          placeholder="Add a description..."
          className="w-full mt-2 px-3 py-2 border rounded"
          rows="3"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Uploader Name</span>
        <input
          value={uploader}
          onChange={(e) => setUploader(e.target.value)}
          placeholder="Your name"
          className="w-full mt-2 px-3 py-2 border rounded"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Upload PIN</span>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Enter upload PIN"
          className="w-full mt-2 px-3 py-2 border rounded"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md font-medium disabled:opacity-60"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
