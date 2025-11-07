import { supabase } from "./supabaseClient";

// Upload file to storage and insert metadata to DB
export async function uploadMemory(
  file,
  { caption = "", desk = "", uploader = "Anonymous" } = {}
) {
  const fileName = `${Date.now()}_${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from("memories")
    .upload(fileName, file, { cacheControl: "3600", upsert: false });

  if (uploadError) throw uploadError;

  const { data: publicData } = supabase.storage
    .from("memories")
    .getPublicUrl(fileName);
  const imageUrl = publicData.publicUrl;

  const { data, error } = await supabase
    .from("memories")
    .insert([
      { image_url: imageUrl, image_path: fileName, caption, desk, uploader },
    ])
    .select();

  if (error) throw error;
  return data[0];
}

export async function fetchMemories() {
  const { data, error } = await supabase
    .from("memories")
    .select("*")
    .order("uploaded_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateMemory(id, updates) {
  const { data, error } = await supabase
    .from("memories")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data[0];
}

export async function deleteMemory(id, imagePath) {
  // delete file from storage
  const { error: removeError } = await supabase.storage
    .from("memories")
    .remove([imagePath]);
  if (removeError) throw removeError;

  const { error } = await supabase.from("memories").delete().eq("id", id);
  if (error) throw error;
  return true;
}

// Comments API functions
export async function fetchComments(memoryId) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("memory_id", memoryId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}

export async function addComment(
  memoryId,
  commentText,
  commenter = "Anonymous"
) {
  const { data, error } = await supabase
    .from("comments")
    .insert([{ memory_id: memoryId, comment_text: commentText, commenter }])
    .select();

  if (error) throw error;
  return data[0];
}

export async function deleteComment(commentId) {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);
  if (error) throw error;
  return true;
}
