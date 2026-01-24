const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Read .env.local manually
const envPath = path.resolve(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');

const env = {};
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
        env[key.trim()] = value.trim().replace(/^['"]|['"]$/g, '');
    }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkConnection() {
    // Try to select from the 'messages' table
    const { data, error } = await supabase.from('messages').select('count', { count: 'exact', head: true });

    if (error) {
        console.error('Error connecting or querying table:', error);
        if (error.code === '42P01' || error.code === 'PGRST205') { // PostgreSQL error for undefined table
            console.log('Diagnosis: The table "messages" does not exist.');
            console.log('Resolution: Please run the SQL in supabase_schema.sql in your Supabase SQL Editor.');
        } else {
            console.log('Diagnosis: Connection failed or other error.');
        }
    } else {
        console.log('Connection successful! Table "messages" exists and is accessible.');
    }
}

checkConnection();
