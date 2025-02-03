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
      detectSessionInUrl: true,
      storage: {
        getItem: (key) => {
          try {
            const storedSession = localStorage.getItem(key);
            console.log('Retrieved session:', key, storedSession ? 'exists' : 'not found');
            return storedSession;
          } catch (error) {
            console.error('Error accessing localStorage:', error);
            return null;
          }
        },
        setItem: (key, value) => {
          try {
            console.log('Storing session:', key);
            localStorage.setItem(key, value);
          } catch (error) {
            console.error('Error setting localStorage:', error);
          }
        },
        removeItem: (key) => {
          try {
            console.log('Removing session:', key);
            localStorage.removeItem(key);
          } catch (error) {
            console.error('Error removing from localStorage:', error);
          }
        },
      },
    },
    db: {
      schema: 'public'
    }
  }
);

// Add debug listener for session changes
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event, session ? 'Session exists' : 'No session');
});