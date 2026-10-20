// scripts/test-login.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testLogin() {
    console.log('🔐 Testing login...');
    console.log('📡 URL:', supabaseUrl);
    
    const email = 'admin@pswebstudio.com';
    const password = 'Admin@2026!';
    
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        if (error) {
            console.error('❌ Login failed:', error.message);
            return;
        }
        
        console.log('✅ Login successful!');
        console.log('👤 User:', data.user.email);
        console.log('🆔 User ID:', data.user.id);
        console.log('✅ Email confirmed:', data.user.confirmed_at ? 'Yes' : 'No');
        console.log('🔑 Session:', data.session ? 'Active' : 'None');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

testLogin();