const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_SERVICE_ROLE_KEY);

async function verify() {
    console.log('🔍 Checking Supabase for public.projects table...');
    const { data, error, count } = await supabase
        .from('projects')
        .select('id, title, slug, status, display_order', { count: 'exact' })
        .order('display_order', { ascending: true });

    if (error) {
        console.error('❌ Table not accessible yet:', error.message);
        console.log('👉 Please run scripts/complete_projects_setup.sql in your Supabase SQL Editor.');
        return false;
    }

    console.log(`✅ Success! Found ${count} projects in public.projects:`);
    data.forEach((p, i) => {
        console.log(`  ${i + 1}. [${p.display_order}] ${p.title} (${p.slug}) - ${p.status}`);
    });
    return true;
}

verify();

