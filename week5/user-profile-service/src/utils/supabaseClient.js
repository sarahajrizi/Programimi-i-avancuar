const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://wxsktbfkltjzkkwzrucq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4c2t0YmZrbHRqemtrd3pydWNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyNzM0NzgsImV4cCI6MjA1OTg0OTQ3OH0.HT0dMhTjqe_LFAQhUDa-POPykLX02UyVwIy4HZ723sE';
const supabase = createClient(supabaseUrl, supabaseKey);
module.exports = supabase;
utmlvyxtgnozphpiunfy.supabase.co
