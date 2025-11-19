import { error } from '@sveltejs/kit'
import { supabase } from '$lib/supabaseClient'

export async function load({ params }) {
  const { id } = params

  const { data: product, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (productError || !product) {
    throw error(404, {
      message: 'Product not found'
    })
  }

  const { data: relatedProducts } = await supabase
    .from('products')
    .select('*')
    .eq('category', product.category)
    .neq('id', id)
    .limit(3)

  return {
    product,
    relatedProducts: relatedProducts || []
  }
}