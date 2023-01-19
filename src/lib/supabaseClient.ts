import { createClient } from '@supabase/auth-helpers-sveltekit';
// import { env } from '$env/dynamic/public';
// import type { Database } from './supabaseTypes';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL; // env.PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY; // env.PUBLIC_SUPABASE_ANON_KEY || '';

console.log('supabase url', SUPABASE_URL);

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
