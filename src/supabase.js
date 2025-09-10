import { createClient } from '@supabase/supabase-js';

// Your Supabase project credentials
const supabaseUrl = 'https://iwqdfnjywzfuxyjkyveb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3cWRmbmp5d3pmdXh5amt5dmViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNDExNjcsImV4cCI6MjA3MjkxNzE2N30.Bqoi-9hu2HPOeeL0oV86LkICkqNP6Zavz5i8I-qqq_U';

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL or Anon Key is missing");
  throw new Error("Please check your Supabase URL and Anon Key.");
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
