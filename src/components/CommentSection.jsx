import { useEffect, useState, useCallback } from "react";
import { fetchComments, addComment, deleteComment } from "../lib/memoriesApi";

const CommentSection = ({ memoryId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [commenter, setCommenter] = useState("");

  const loadComments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchComments(memoryId);
      setComments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchComments error ->", err);
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }, [memoryId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  async function handleAddComment(e) {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const addedComment = await addComment(
        memoryId,
        newComment.trim(),
        commenter
      );
      setComments((prev) => [...prev, addedComment]);
      setNewComment("");
    } catch (err) {
      console.error(err);
      alert("Gagal menambah komentar: " + (err.message || err));
    }
  }

  async function handleDeleteComment(commentId) {
    const ok = window.confirm("Hapus komentar ini?");
    if (!ok) return;
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus komentar: " + (err.message || err));
    }
  }

  return (
    <div className="mt-6 border-t border-gray-700 pt-4">
      <h4 className="text-lg font-semibold text-gray-100 mb-4">Comments</h4>

      {loading && <p className="text-gray-400">Loading comments...</p>}
      {error && <p className="text-red-400">{error}</p>}

      <div className="space-y-4 mb-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-800 p-3 rounded-lg">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-gray-200">{comment.comment_text}</p>
                <p className="text-sm text-gray-400 mt-1">
                  By {comment.commenter} •{" "}
                  {new Date(comment.created_at).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDeleteComment(comment.id)}
                className="text-red-400 hover:text-red-300 text-sm ml-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleAddComment} className="space-y-3">
        <input
          type="text"
          value={commenter}
          onChange={(e) => setCommenter(e.target.value)}
          placeholder="Your name (optional)"
          className="w-full px-3 py-2 border rounded bg-gray-800 text-gray-100 border-gray-600"
        />
        <div className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 px-3 py-2 border rounded bg-gray-800 text-gray-100 border-gray-600"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentSection;
