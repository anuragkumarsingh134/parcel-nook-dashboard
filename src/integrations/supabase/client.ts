import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = 'https://hncnhxmusspfrqnksnwf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuY25oeG11c3NwZnJxbmtzbndmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2MzM2MTAsImV4cCI6MjAyNTIwOTYxMH0.vxjjXPxDp1xOYVk0YZpqQw8eSiQ-kZhBMGHXvJYHrVo';

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