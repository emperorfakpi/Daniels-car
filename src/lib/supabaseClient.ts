// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fbdrbppyqqagfnzbksdh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiZHJicHB5cXFhZ2ZuemJrc2RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTY2NTUsImV4cCI6MjA2Njg3MjY1NX0.mP6Jdgktd8zk1U5YxNt3c-ILpxWhXdJrbMVkwB3A_3E';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
