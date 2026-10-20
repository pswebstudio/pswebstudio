// scripts/migrate-projects.js
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Supabase configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials. Please check your .env file.');
    console.error('   VITE_SUPABASE_URL and VITE_SUPABASE_SERVICE_ROLE_KEY are required.');
    process.exit(1);
}

// Ensure URL doesn't have trailing slash
const cleanUrl = supabaseUrl.replace(/\/$/, '');
console.log('📡 Connecting to Supabase:', cleanUrl);

const supabase = createClient(cleanUrl, supabaseKey, {
    auth: {
        persistSession: false
    }
});

async function migrateProjects() {
    console.log('🚀 Starting project migration...');
    
    try {
        // Read projects.json
        const projectsPath = path.join(__dirname, '..', 'data', 'projects.json');
        
        if (!fs.existsSync(projectsPath)) {
            console.error('❌ projects.json not found at:', projectsPath);
            process.exit(1);
        }
        
        const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
        const projects = projectsData.projects;
        const projectKeys = Object.keys(projects);
        
        console.log(`📦 Found ${projectKeys.length} projects to migrate`);
        
        let successCount = 0;
        let errorCount = 0;
        
        for (const key of projectKeys) {
            const project = projects[key];
            
            try {
                const slug = key;
                
                const projectData = {
                    title: project.title,
                    description: project.description || '',
                    client: project.client || '',
                    industry: project.industry || '',
                    type: project.type || 'Custom Web Development',
                    timeline: project.timeline || '',
                    team: project.team || '',
                    status: project.status || 'Live',
                    year: project.year || '2026',
                    features: project.features || [],
                    tech_stack: project.techStack || {},
                    images: project.images || [],
                    scope: project.scope || {},
                    testimonial: project.testimonial || '',
                    testimonial_author: project.testimonialAuthor || '',
                    live_url: project.liveUrl || '',
                    slug: slug,
                    is_featured: false,
                    is_enabled: true,
                    display_order: projectKeys.indexOf(key),
                    updated_at: new Date().toISOString()
                };
                
                // Try to find existing project by slug
                const { data: existing, error: checkError } = await supabase
                    .from('projects')
                    .select('id')
                    .eq('slug', slug)
                    .maybeSingle();
                
                if (checkError && checkError.code !== 'PGRST116') {
                    console.error(`⚠️ Check error for ${project.title}:`, checkError.message);
                    // Continue anyway - try insert
                }
                
                let result;
                if (existing && existing.id) {
                    // Update existing project
                    const { data, error } = await supabase
                        .from('projects')
                        .update(projectData)
                        .eq('id', existing.id)
                        .select();
                    
                    if (error) throw error;
                    result = data;
                    console.log(`✅ Updated: ${project.title}`);
                } else {
                    // Insert new project
                    const { data, error } = await supabase
                        .from('projects')
                        .insert([{
                            ...projectData,
                            created_at: new Date().toISOString()
                        }])
                        .select();
                    
                    if (error) throw error;
                    result = data;
                    console.log(`✅ Inserted: ${project.title}`);
                }
                
                successCount++;
                
            } catch (error) {
                errorCount++;
                console.error(`❌ Error migrating "${project.title}":`, error.message);
                if (error.message.includes('Invalid path')) {
                    console.error('   💡 Check your VITE_SUPABASE_URL in .env file');
                }
            }
        }
        
        console.log(`\n📊 Migration Summary:`);
        console.log(`   ✅ Success: ${successCount} projects`);
        console.log(`   ❌ Errors: ${errorCount} projects`);
        
    } catch (error) {
        console.error('❌ Fatal Error:', error.message);
        process.exit(1);
    }
}

migrateProjects();