<script>
  import { supabase } from '$lib/supabaseClient'
  import { onMount } from 'svelte'
  import Hero from '$lib/components/Hero.svelte'

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
      } else {
        products = data || []
      }
    } catch (err) {
      error = err.message
    } finally {
      loading = false
    }
  })

  function getFilteredProducts() {
    let filtered = products

    switch (sortBy) {
      case 'PRICE_LOW':
        return [...filtered].sort((a, b) => a.price - b.price)
      case 'PRICE_HIGH':
        return [...filtered].sort((a, b) => b.price - a.price)
      case 'NAME':
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name))
      default:
        return filtered
    }
  }
</script>

<Hero />
<main class="container">
  <nav class="breadcrumb">
    <a href="/">Home</a> > You are here!
  </nav>

  <div class="header">
    <h1>Our Erasers</h1>
    
    <div class="filters">      
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

  {#if loading}
    <div class="loading">
      <p>Loading...</p>
    </div>
  
  {:else if error}
    <div class="error-message">
      <p>Error loading products:</p>
      <p>{error}</p>
    </div>
  
  {:else if getFilteredProducts().length > 0}
    <div class="products-grid">
      {#each getFilteredProducts() as product}
        <a href="/products/{product.id}" class="product-card">
          <div class="product-image">
            <img 
              src={product.image_url || '/images/favicon.png'} 
              alt={product.name}
            />
          </div>
          <div class="product-info">
            <h3 class="product-name">{product.name}</h3>
            <p class="product-price">${product.price?.toFixed(2) || '0.00'}</p>
          </div>
        </a>
      {/each}
    </div>
  
  {:else}
    <div class="empty-state">
      <p>No products found.</p>
    </div>
  {/if}
</main>

<style>
  :global(body) {
    background-color: #FAFAFA;
    margin: 0;
    padding: 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .breadcrumb {
    font-size: 14px;
    color: #333;
    margin-bottom: 29px;
  }

  .breadcrumb a {
    text-decoration: none;
    color: #333;
  }

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
    font-weight: 400;
    color: #333;
  }

  select {
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    font-weight: 400;
    color:#333;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  select:focus {
    outline: none;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .product-card {
    background: #FAFAFA;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    text-decoration: none;
    display: block;
  }

  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
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
    width: 80%;
    height: 80%;
    object-fit: fill;
    padding: 55px;
  }

  .product-info {
    padding: 12px;
  }

  .product-name {
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #333;
    margin: 0 0 0.5rem 0;
  }

  .product-price {
    font-family: 'Nunito', sans-serif;
    font-size: 18px;
    font-weight: 400;
    color: #333;
    margin: 0;
  }

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