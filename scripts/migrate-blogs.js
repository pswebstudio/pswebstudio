// scripts/migrate-blogs.js
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials. Please check your .env file.');
    process.exit(1);
}

const cleanUrl = supabaseUrl.replace(/\/$/, '');
console.log('📡 Connecting to Supabase:', cleanUrl);

const supabase = createClient(cleanUrl, supabaseKey, {
    auth: {
        persistSession: false
    }
});

async function migrateBlogs() {
    console.log('🚀 Starting blog migration...');
    
    try {
        const blogsPath = path.join(__dirname, '..', 'data', 'blogs.json');
        
        if (!fs.existsSync(blogsPath)) {
            console.error('❌ blogs.json not found at:', blogsPath);
            process.exit(1);
        }
        
        const blogsData = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));
        const blogs = blogsData.blogs || blogsData;
        
        console.log(`📦 Found ${blogs.length} blogs to migrate`);
        
        let successCount = 0;
        let errorCount = 0;
        
        for (const blog of blogs) {
            try {
                const blogData = {
                    slug: blog.slug,
                    title: blog.title,
                    category: blog.category || 'General',
                    author: blog.author || 'PS Web Studio',
                    date: blog.date || new Date().toISOString().split('T')[0],
                    comments: blog.comments || 0,
                    image: `assets/img/blog/blog-${blog.id}.jpg`,
                    excerpt: blog.excerpt || '',
                    content: blog.content || '',
                    tags: blog.tags || [],
                    is_enabled: true,
                    display_order: blogs.indexOf(blog),
                    updated_at: new Date().toISOString()
                };
                
                // Check if blog exists
                const { data: existing, error: checkError } = await supabase
                    .from('blogs')
                    .select('id')
                    .eq('slug', blog.slug)
                    .maybeSingle();
                
                if (checkError && checkError.code !== 'PGRST116') {
                    console.error(`⚠️ Check error for ${blog.title}:`, checkError.message);
                }
                
                if (existing && existing.id) {
                    // Update existing
                    const { error } = await supabase
                        .from('blogs')
                        .update(blogData)
                        .eq('id', existing.id);
                    
                    if (error) throw error;
                    console.log(`✅ Updated: ${blog.title}`);
                } else {
                    // Insert new
                    const { error } = await supabase
                        .from('blogs')
                        .insert([{
                            ...blogData,
                            created_at: new Date().toISOString()
                        }]);
                    
                    if (error) throw error;
                    console.log(`✅ Inserted: ${blog.title}`);
                }
                
                successCount++;
                
            } catch (error) {
                errorCount++;
                console.error(`❌ Error migrating blog "${blog.title}":`, error.message);
            }
        }
        
        console.log(`\n📊 Migration Summary:`);
        console.log(`   ✅ Success: ${successCount} blogs`);
        console.log(`   ❌ Errors: ${errorCount} blogs`);
        console.log('🎉 Blog migration completed!');
        
    } catch (error) {
        console.error('❌ Fatal Error:', error.message);
        process.exit(1);
    }
}

migrateBlogs();