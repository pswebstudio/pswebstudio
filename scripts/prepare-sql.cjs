const fs = require('fs');

const srcPath = 'C:/Users/sarda/.gemini/antigravity/brain/8147c555-4110-4377-b5c9-f63ef56d200b/.user_uploaded/media_1794149293891_0d9c0e04.sql';
const sqlInsert = fs.readFileSync(srcPath, 'utf8');

const tableDefinition = `-- ==============================================================================
-- PS Web Studio: projects table creation, RLS security policies, and indexes
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    client TEXT,
    industry TEXT,
    type TEXT,
    timeline TEXT,
    team TEXT,
    status TEXT DEFAULT 'Live',
    year TEXT,
    features TEXT[] DEFAULT '{}',
    tech_stack JSONB DEFAULT '{}'::jsonb,
    images TEXT[] DEFAULT '{}',
    scope JSONB DEFAULT '{}'::jsonb,
    testimonial TEXT,
    testimonial_author TEXT,
    live_url TEXT,
    slug TEXT UNIQUE,
    is_featured BOOLEAN DEFAULT false,
    is_enabled BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous read access (SELECT) so users can view projects on website
DROP POLICY IF EXISTS "Allow public read access to projects" ON public.projects;
CREATE POLICY "Allow public read access to projects" 
ON public.projects FOR SELECT 
USING (true);

-- Allow authenticated users and service role full CRUD access
DROP POLICY IF EXISTS "Allow full access to authenticated users" ON public.projects;
CREATE POLICY "Allow full access to authenticated users" 
ON public.projects FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Create performance indexes
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON public.projects(display_order);
CREATE INDEX IF NOT EXISTS idx_projects_is_enabled ON public.projects(is_enabled);
CREATE INDEX IF NOT EXISTS idx_projects_is_featured ON public.projects(is_featured);

`;

const completeSql = tableDefinition + '\n' + sqlInsert;

fs.writeFileSync('scripts/complete_projects_setup.sql', completeSql, 'utf8');
console.log('✅ Created scripts/complete_projects_setup.sql (' + completeSql.length + ' bytes)');

