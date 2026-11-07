import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mmnsovgpmojjeqajbcfo.supabase.co'
// A non-empty fallback stops createClient() from throwing (which white-screens the whole site)
// when VITE_SUPABASE_ANON_KEY is missing; real requests simply fail until the key is set.
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'missing-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
