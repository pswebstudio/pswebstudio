// scripts/test-auth.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAuth() {
    console.log('🔐 Testing authentication...');
    
    const email = 'admin@pswebstudio.com';
    const password = 'Admin@2026!';
    
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        if (error) {
            console.error('❌ Login failed:', error.message);
            console.log('💡 Make sure:');
            console.log('   1. User exists in Authentication → Users');
            console.log('   2. Email is confirmed');
            console.log('   3. Password is correct');
            return;
        }
        
        console.log('✅ Login successful!');
        console.log('👤 User:', data.user.email);
        console.log('🔑 Session:', data.session ? 'Active' : 'None');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

testAuth();