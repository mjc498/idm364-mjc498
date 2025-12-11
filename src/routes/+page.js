import { supabase } from '$lib/supabaseClient'

export async function load() {
  const { data, error } = await supabase.from('products').select('*')

  return {
    products: data ?? [],
    error: error?.message ?? null
  }
}