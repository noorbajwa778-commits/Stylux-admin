import { createClient } from '@supabase/supabase-js';

const supabaseUrl ='https://dwxmcfcjvhxprdqvptds.supabase.co';
const supabaseKey = 'sb_publishable_WlETvCIMV3HKzMOppwBr0g__BvHf7Y4npm run dev
';

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);