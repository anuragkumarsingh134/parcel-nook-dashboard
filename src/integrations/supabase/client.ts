import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Update these with your local PostgreSQL connection details
const SUPABASE_URL = "http://localhost:54321";  // Default Supabase local development port
const SUPABASE_ANON_KEY = "your-local-anon-key"; // You'll need to generate this

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  }
});