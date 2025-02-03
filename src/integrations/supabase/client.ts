import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = 'https://hncnhxmusspfrqnksnwf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuY25oeG11c3NwZnJxbmtzbndmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0MDY4MDAsImV4cCI6MjA1Mzk4MjgwMH0.2VALng6SNucPoD88v4pq4BaZNLg54xBHk4QA1IW7ngo';

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    db: {
      schema: 'public'
    }
  }
);