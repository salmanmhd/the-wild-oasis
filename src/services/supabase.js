import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://hlqztmmlfoypxtwkczrd.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhscXp0bW1sZm95cHh0d2tjenJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk4NjkwMzgsImV4cCI6MjA0NTQ0NTAzOH0.Mvqv_Grk1C08c60LPfYD_HWHjttbD2i1m0c1FTiP8Ok';
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
