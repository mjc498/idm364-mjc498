<script>
    import { supabase } from '$lib/supabaseClient'
    import { onMount } from 'svelte'
  
    let products = $state([])
    let loading = $state(true)
    let error = $state(null)
  
    onMount(async () => {
      try {
        const { data, error: supabaseError } = await supabase
          .from('products')
          .select('*')
        
        if (supabaseError) {
          error = supabaseError.message
          console.error('Error fetching products:', supabaseError)
        } else {
          products = data || []
        }
      } catch (err) {
        error = err.message
        console.error('Error:', err)
      } finally {
        loading = false
      }
    })
  </script>
  
  <main>
    <h1>🛍️ My E-Commerce Store</h1>
    
    {#if loading}
      <p>Loading products...</p>
    {:else if error}
      <div class="error">
        <p>⚠️ Error connecting to Supabase:</p>
        <p>{error}</p>
        <p>Check your .env file and make sure your Supabase credentials are correct.</p>
      </div>
    {:else if products.length > 0}
      <div class="success">
        <p>✅ Successfully connected to Supabase!</p>
        <p>Found {products.length} product{products.length === 1 ? '' : 's'}.</p>
      </div>
      <ul>
        {#each products as product}
          <li>{product.name || product.id}</li>
        {/each}
      </ul>
    {:else}
      <div class="info">
        <p>✅ Connected to Supabase successfully!</p>
        <p>📦 No products found yet. Your products table is empty.</p>
        <p>Next step: Add some products to your Supabase table!</p>
      </div>
    {/if}
  </main>
  
  <style>
    main {
      max-width: 800px;
      margin: 2rem auto;
      padding: 2rem;
      font-family: system-ui, -apple-system, sans-serif;
    }
  
    h1 {
      color: #333;
      margin-bottom: 2rem;
    }
  
    .success {
      background: #d4edda;
      border: 1px solid #c3e6cb;
      color: #155724;
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem 0;
    }
  
    .error {
      background: #f8d7da;
      border: 1px solid #f5c6cb;
      color: #721c24;
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem 0;
    }
  
    .info {
      background: #d1ecf1;
      border: 1px solid #bee5eb;
      color: #0c5460;
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem 0;
    }
  
    ul {
      list-style: none;
      padding: 0;
    }
  
    li {
      background: #f8f9fa;
      padding: 0.75rem;
      margin: 0.5rem 0;
      border-radius: 4px;
      border-left: 3px solid #007bff;
    }
  </style>