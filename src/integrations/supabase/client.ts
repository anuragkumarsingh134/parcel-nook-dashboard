import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

export const supabase = createClient<Database>(
  'https://hncnhxmusspfrqnksnwf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuY25oeG11c3NwZnJxbmtzbndmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2MzM2MTAsImV4cCI6MjAyNTIwOTYxMH0.vxjjXPxDp1xOYVk0YZpqQw8eSiQ-kZhBMGHXvJYHrVo',
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