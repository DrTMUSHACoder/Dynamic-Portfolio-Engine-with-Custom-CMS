const { Pool } = require('pg');
require('dotenv').config();

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
    console.error('❌ DATABASE_URL environment variable is not set!');
    process.exit(1);
}

// Enable SSL for any cloud database (Render, Neon, Supabase, etc.)
// Disable SSL only for local development (localhost / 127.0.0.1)
const isLocal = dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1');

const pool = new Pool({
    connectionString: dbUrl,
    ssl: isLocal ? false : { rejectUnauthorized: false }
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
