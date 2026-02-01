import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://yagaeuoepdoblpboioeb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhZ2FldW9lcGRvYmxwYm9pb2ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTc4MTAsImV4cCI6MjA4NDU3MzgxMH0.lSJyZpSt8JkyjduGQtuL_2gGqD3nNfKzDOO9wmq_yx0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});
