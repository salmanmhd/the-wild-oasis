import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://ygamlapcbmurhtlezqnf.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnYW1sYXBjYm11cmh0bGV6cW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxODM5NjUsImV4cCI6MjA1NDc1OTk2NX0.feiZN-bkvaSaszFJMpYNyxTiLDMAW33bNHbW4DFvmTs';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
