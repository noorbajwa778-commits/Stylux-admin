import { createClient } from '@supabase/supabase-js'

const supabaseUrl ='https://cndlluwyuiykhiksnpeo.supabase.co';
const supabaseKey = 'sb_publishable_JZpa0pV2psG0AhMVE6BHvw_zIHL_5R3';

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);