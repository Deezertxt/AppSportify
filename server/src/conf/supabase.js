require('dotenv').config();// conf/supabase.js
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL; // Asegúrate de tener esto en tu archivo .env
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY; // También en tu archivo .env

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

module.exports = { supabase };
