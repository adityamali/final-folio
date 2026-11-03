-- ==============================================================================
-- Add Buy Me A Coffee URL column to Supabase & Update software_full View
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/bfpgqqmmjfivykmkselu/sql/new
-- ==============================================================================

-- 1. Add buymeacoffee_url column to the base "software" table
ALTER TABLE public.software 
ADD COLUMN IF NOT EXISTS buymeacoffee_url TEXT;

COMMENT ON COLUMN public.software.buymeacoffee_url IS 'Buy Me a Coffee or sponsor link for the software product';

-- 2. (Optional) Set the Kill9 Buy Me A Coffee URL
UPDATE public.software
SET buymeacoffee_url = 'https://buymeacoffee.com/theadityamali/e/594278'
WHERE name ILIKE 'kill9%' AND buymeacoffee_url IS NULL;

-- 3. Recreate the software_full view to include buymeacoffee_url
CREATE OR REPLACE VIEW public.software_full AS
SELECT
  s.id,
  s.name,
  s.tagline,
  s.description,
  s.icon,
  s.category,
  s.price,
  s.download_url,
  s.demo_url,
  s.github_url,
  s.buymeacoffee_url,
  s.version,
  s.release_date,
  s.color,
  s.featured,
  s.download_size,
  s.created_at,
  s.updated_at,
  COALESCE(
    (
      SELECT array_agg(si.image_url ORDER BY si.display_order)
      FROM public.software_images si
      WHERE si.software_id = s.id
    ),
    '{}'::text[]
  ) AS images,
  COALESCE(
    (
      SELECT array_agg(sf.feature ORDER BY sf.display_order)
      FROM public.software_features sf
      WHERE sf.software_id = s.id
    ),
    '{}'::text[]
  ) AS features,
  COALESCE(
    (
      SELECT array_agg(sp.platform)
      FROM public.software_platforms sp
      WHERE sp.software_id = s.id
    ),
    '{}'::text[]
  ) AS platforms,
  COALESCE(
    (
      SELECT array_agg(st.tag)
      FROM public.software_tags st
      WHERE st.software_id = s.id
    ),
    '{}'::text[]
  ) AS tags
FROM public.software s;

-- Ensure view is accessible via Data API
GRANT SELECT ON public.software_full TO anon, authenticated;

-- 4. Enable direct in-line editing of software_full in the Supabase Table Editor!
-- This trigger propagates any edits made in software_full down to the base software table.
CREATE OR REPLACE FUNCTION public.handle_software_full_update()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.software
  SET
    name = NEW.name,
    tagline = NEW.tagline,
    description = NEW.description,
    icon = NEW.icon,
    category = NEW.category,
    price = NEW.price,
    download_url = NEW.download_url,
    demo_url = NEW.demo_url,
    github_url = NEW.github_url,
    buymeacoffee_url = NEW.buymeacoffee_url,
    version = NEW.version,
    release_date = NEW.release_date,
    color = NEW.color,
    featured = NEW.featured,
    download_size = NEW.download_size,
    updated_at = NOW()
  WHERE id = OLD.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS tr_software_full_update ON public.software_full;
CREATE TRIGGER tr_software_full_update
INSTEAD OF UPDATE ON public.software_full
FOR EACH ROW
EXECUTE FUNCTION public.handle_software_full_update();

