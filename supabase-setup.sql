-- SQL script to create/update the Enquiry table in Supabase
-- Run this in your Supabase SQL Editor

-- Create the Enquiry table (if it doesn't exist) or add missing columns
CREATE TABLE IF NOT EXISTS "Enquiry" (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  services TEXT[] NOT NULL,
  message TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add columns if they don't exist (for existing tables)
DO $$ 
BEGIN
  -- Add name column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Enquiry' AND column_name='name') THEN
    ALTER TABLE "Enquiry" ADD COLUMN name TEXT NOT NULL DEFAULT '';
  END IF;
  
  -- Add email column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Enquiry' AND column_name='email') THEN
    ALTER TABLE "Enquiry" ADD COLUMN email TEXT NOT NULL DEFAULT '';
  END IF;
  
  -- Add services column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Enquiry' AND column_name='services') THEN
    ALTER TABLE "Enquiry" ADD COLUMN services TEXT[] NOT NULL DEFAULT '[]';
  END IF;
  
  -- Add message column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Enquiry' AND column_name='message') THEN
    ALTER TABLE "Enquiry" ADD COLUMN message TEXT;
  END IF;
  
  -- Add submitted_at column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Enquiry' AND column_name='submitted_at') THEN
    ALTER TABLE "Enquiry" ADD COLUMN submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
  END IF;
  
  -- Add created_at column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Enquiry' AND column_name='created_at') THEN
    ALTER TABLE "Enquiry" ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
  END IF;
  
  -- Add updated_at column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Enquiry' AND column_name='updated_at') THEN
    ALTER TABLE "Enquiry" ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
  END IF;
END $$;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_enquiry_email ON "Enquiry"(email);
CREATE INDEX IF NOT EXISTS idx_enquiry_submitted_at ON "Enquiry"(submitted_at);
CREATE INDEX IF NOT EXISTS idx_enquiry_created_at ON "Enquiry"(created_at);

-- Add Row Level Security (RLS) policies
ALTER TABLE "Enquiry" ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow enquiry submissions" ON "Enquiry";
DROP POLICY IF EXISTS "Allow reading enquiries" ON "Enquiry";

-- Policy to allow inserting new enquiries (for the form)
CREATE POLICY "Allow enquiry submissions" ON "Enquiry"
  FOR INSERT
  WITH CHECK (true);

-- Policy to allow reading enquiries (for admin/dashboard)
-- You might want to restrict this to authenticated users only
CREATE POLICY "Allow reading enquiries" ON "Enquiry"
  FOR SELECT
  USING (true);

-- Optional: Add a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_enquiry_updated_at ON "Enquiry";

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_enquiry_updated_at
  BEFORE UPDATE ON "Enquiry"
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add some comments for documentation
COMMENT ON TABLE "Enquiry" IS 'Stores enquiries from the registration/contact form';
COMMENT ON COLUMN "Enquiry".name IS 'Full name of the person submitting the enquiry';
COMMENT ON COLUMN "Enquiry".email IS 'Email address for contact';
COMMENT ON COLUMN "Enquiry".services IS 'Array of selected services';
COMMENT ON COLUMN "Enquiry".message IS 'Optional message/project description';
COMMENT ON COLUMN "Enquiry".submitted_at IS 'When the enquiry was submitted (user timezone)';
COMMENT ON COLUMN "Enquiry".created_at IS 'When the record was created in the database';
COMMENT ON COLUMN "Enquiry".updated_at IS 'When the record was last updated';

-- BLOG POSTS TABLE
CREATE TABLE IF NOT EXISTS "posts" (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  published BOOLEAN DEFAULT FALSE,
  tags TEXT[] DEFAULT '{}',
  cover_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for posts
ALTER TABLE "posts" ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published posts
CREATE POLICY "Allow public read access" ON "posts"
  FOR SELECT
  USING (published = true);

-- Allow authenticated (or anon for now if simple admin) insert/update
-- For a personal portfolio, we might want to restrict this. 
-- Assuming the user will use the Supabase dashboard or a protected route.
-- For now, allowing all operations for simplicity in development, 
-- BUT STRONGLY RECOMMEND locking this down in production.
CREATE POLICY "Allow full access for anon" ON "posts"
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Trigger for updated_at on posts
DROP TRIGGER IF EXISTS update_posts_updated_at ON "posts";
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON "posts"
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

