-- Database schema for Memory Wall app using Supabase

-- Memories table (assuming it already exists, but included for completeness)
CREATE TABLE IF NOT EXISTS memories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  image_path TEXT NOT NULL,
  caption TEXT,
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

-- Enable Row Level Security (RLS) if needed
-- ALTER TABLE memories ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Policies for public access (adjust as needed for your app)
-- CREATE POLICY "Allow all operations on memories" ON memories FOR ALL USING (true);
-- CREATE POLICY "Allow all operations on comments" ON comments FOR ALL USING (true);
