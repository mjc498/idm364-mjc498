<script>
  import { supabase } from '$lib/supabaseClient'
  import { onMount } from 'svelte'

  let products = $state([])
  let loading = $state(true)
  let error = $state(null)
  let browseBy = $state('ALL')
  let sortBy = $state('FEATURED')

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

<main class="container">
  <!-- Breadcrumb -->
  <nav class="breadcrumb">
    <a href="/">Home</a> > You are here!
  </nav>

  <!-- Header Section -->
  <div class="header">
    <h1>Our Erasers</h1>
    
    <div class="filters">
      <div class="filter-group">
        <label for="browse">Browse by:</label>
        <select id="browse" bind:value={browseBy}>
          <option value="ALL">ALL</option>
          <option value="FOOD">FOOD</option>
          <option value="DESSERTS">DESSERTS</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="sort">Sort by:</label>
        <select id="sort" bind:value={sortBy}>
          <option value="FEATURED">FEATURED</option>
          <option value="PRICE_LOW">PRICE: LOW TO HIGH</option>
          <option value="PRICE_HIGH">PRICE: HIGH TO LOW</option>
          <option value="NAME">NAME: A-Z</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  {#if loading}
    <div class="loading">
      <p>Loading products...</p>
    </div>
  
  <!-- Error State -->
  {:else if error}
    <div class="error-message">
      <p>⚠️ Error loading products:</p>
      <p>{error}</p>
    </div>
  
  <!-- Products Grid -->
  {:else if products.length > 0}
    <div class="products-grid">
      {#each products as product}
        <div class="product-card">
          <div class="product-image">
            <img 
              src={product.image_url || '/images/placeholder.png'} 
              alt={product.name}
            />
          </div>
          <div class="product-info">
            <h3 class="product-name">{product.name}</h3>
            <p class="product-price">${product.price?.toFixed(2) || '0.00'}</p>
          </div>
        </div>
      {/each}
    </div>
  
  <!-- Empty State -->
  {:else}
    <div class="empty-state">
      <p>No products found yet.</p>
      <p>Add some products to your Supabase table!</p>
    </div>
  {/if}
</main>

<style>
  :global(body) {
    background-color: #F5F5F5;
    margin: 0;
    padding: 0;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }

  /* Breadcrumb */
  .breadcrumb {
    font-size: 14px;
    color: #666;
    margin-bottom: 2rem;
  }

  .breadcrumb a {
    color: #666;
    text-decoration: none;
  }

  .breadcrumb a:hover {
    text-decoration: underline;
  }

  /* Header */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  h1 {
    font-family: 'Nunito', sans-serif;
    font-size: 48px;
    font-weight: 700;
    color: #333;
    margin: 0;
  }

  /* Filters */
  .filters {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .filter-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .filter-group label {
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }

  select {
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
  }

  select:focus {
    outline: none;
  }

  /* Products Grid */
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  /* Product Card */
  .product-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.2s ease;
    cursor: pointer;
  }

  .product-card:hover {
    transform: translateY(-4px);
  }

  .product-image {
    width: 100%;
    aspect-ratio: 1;
    background-color: #FFF1B8;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .product-info {
    padding: 1rem;
  }

  .product-name {
    font-family: 'Nunito', sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0 0 0.5rem 0;
  }

  .product-price {
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    font-weight: 400;
    color: #666;
    margin: 0;
  }

  /* States */
  .loading,
  .error-message,
  .empty-state {
    text-align: center;
    padding: 3rem;
    font-family: 'Nunito', sans-serif;
  }

  .error-message {
    color: #d32f2f;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    h1 {
      font-size: 32px;
    }

    .header {
      flex-direction: column;
      align-items: flex-start;
    }

    .filters {
      width: 100%;
      flex-direction: column;
      gap: 1rem;
    }

    .products-grid {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 1rem;
    }
  }
</style>