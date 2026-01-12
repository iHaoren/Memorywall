-- Database schema for Memory Wall app using Supabase

-- Memories table (assuming it already exists, but included for completeness)
CREATE TABLE IF NOT EXISTS memories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  image_path TEXT NOT NULL,
  caption TEXT,
  desk TEXT,
  uploader TEXT DEFAULT 'Your nickname',
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Comments table for comments on memories
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  memory_id UUID NOT NULL REFERENCES memories(id) ON DELETE CASCADE,
  comment_text TEXT NOT NULL,
  commenter TEXT DEFAULT '.....',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries on memory_id
CREATE INDEX IF NOT EXISTS idx_comments_memory_id ON comments(memory_id);