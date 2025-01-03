import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

export * from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const db = createClient<Database>(supabaseUrl, supabaseAnonKey);
