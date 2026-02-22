-- Category Enum
CREATE TYPE post_category AS ENUM ('game_tech', 'ai_tech', 'dev_diary', 'daily_life', 'hobbies');

-- Posts Table
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  category post_category NOT NULL,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to posts
CREATE POLICY "Allow public read-only access." ON posts
  FOR SELECT USING (true);
