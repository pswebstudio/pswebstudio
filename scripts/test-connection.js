// scripts/test-connection.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

console.log('🔍 Testing Supabase connection...');
console.log('URL:', supabaseUrl);
console.log('Key length:', supabaseKey ? supabaseKey.length : 0);

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing credentials!');
    process.exit(1);
}

const cleanUrl = supabaseUrl.replace(/\/$/, '');
const supabase = createClient(cleanUrl, supabaseKey);

try {
    const { data, error } = await supabase
        .from('projects')
        .select('count', { count: 'exact' })
        .limit(1);
    
    if (error) {
        console.error('❌ Connection error:', error.message);
        console.error('   Check your URL and keys in .env file');
    } else {
        console.log('✅ Connection successful!');
        console.log('   Projects table exists and is accessible');
    }
} catch (error) {
    console.error('❌ Error:', error.message);
}