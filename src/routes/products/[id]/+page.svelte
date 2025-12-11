<script>
  import { cart } from '$lib/stores/cartStore'

  let { data } = $props()
  let quantity = $state(1)
  let activeTab = $state('reviews')
  let product = $derived(data.product)
  let relatedProducts = $derived(data.relatedProducts)

  function addToCart() {
    cart.addItem(product, quantity)
    alert(`Added ${quantity} "${product.name}" to cart!`)
  }

  function getStarDisplay(rating) {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push({ type: 'full' })
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push({ type: 'half' })
      } else {
        stars.push({ type: 'empty' })
      }
    }
    
    return stars
  }
</script>

<svelte:head>
<title>{product.name} - Erase with Taste</title>
</svelte:head>
  
<main class="container">  
  <div class="product-detail">
    <div class="product-left">
      <div class="product-image">
        <img 
          src={product.image_url || '/images/favicon.png'} 
          alt={product.name}
        />
      </div>
      <button class="add-to-cart" onclick={addToCart}>
        Add to Cart
      </button>
    </div>
    
    <div class="product-content">
      <h1 class="product-title">{product.name}</h1>
      
      <div class="rating">
        <div class="stars">
          {#each getStarDisplay(product.average_rating || 5) as star}
            {#if star.type === 'full'}
              <span class="star-full">★</span>
            {:else if star.type === 'half'}
              <span class="star-half">★</span>
            {:else}
              <span class="star-empty">☆</span>
            {/if}
          {/each}
        </div>
        <span class="review-count">({product.review_count || 0})</span>
      </div>
    
      <p class="price">${product.price?.toFixed(2)}</p>
    
      <div class="quantity-selector">
        <label for="quantity">Quantity:</label>
        <select id="quantity" bind:value={quantity}>
          {#each Array(10) as _, i}
            <option value={i + 1}>{i + 1}</option>
          {/each}
        </select>
      </div>
    
      <div class="description">
        <p>✨ {product.description || 'Brighten up your pencil case with this adorable eraser! Its soft, realistic design makes cleaning up pencil marks surprisingly fun — and totally irresistible. Whether you\'re doodling, studying, or just collecting cute stationery, this little item is sure to make you smile.'}</p>
        <p>Perfect for students, artists, or anyone who loves quirky desk accessories! Add a little fun to your workspace today.</p>
      </div>
    
      <div class="specs">
        <p><strong>Size:</strong> {product.size || 'Approximately 5 cm'}</p>
        <p><strong>Material:</strong> {product.material || 'Soft, non-toxic rubber'}</p>
        <p><strong>Model Number:</strong> {product.model_number || product.id}</p>
      </div>
    </div>
  </div>

  <section class="product-tabs">
    <div class="tabs-header">
      <button 
        class:active={activeTab === 'reviews'}
        onclick={() => activeTab = 'reviews'}
      >
        Reviews ({product.review_count || 0})
      </button>
      <button 
        class:active={activeTab === 'info'}
        onclick={() => activeTab = 'info'}
      >
        Additional Info
      </button>
      <button 
        class:active={activeTab === 'questions'}
        onclick={() => activeTab = 'questions'}
      >
        Questions
      </button>
    </div>

    <div class="tabs-content">
      {#if activeTab === 'reviews'}
        <div class="reviews-section">
          <h3>Customer reviews</h3>
          <button class="write-review">Write Review</button>
          
          {#if product.sample_review_name && product.sample_review_comment}
            <div class="review">
              <div class="review-header">
                <strong>{product.sample_review_name}</strong>
                <div class="stars">
                  {#each getStarDisplay(product.sample_review_rating || 5) as star}
                    {#if star.type === 'full'}
                      <span class="star-full">★</span>
                    {:else if star.type === 'half'}
                      <span class="star-half">★</span>
                    {:else}
                      <span class="star-empty">☆</span>
                    {/if}
                  {/each}
                </div>
              </div>
              <p class="review-date">{product.sample_review_date || '10/10/25'}</p>
              <p class="review-text">{product.sample_review_comment}</p>
            </div>
          {:else}
            <p class="no-reviews">No reviews yet. Be the first to review this product!</p>
          {/if}
        </div>
      {:else if activeTab === 'info'}
        <div class="info-section">
          <p><strong>Size:</strong> {product.size || 'Approximately 5 cm'}</p>
          <p><strong>Material:</strong> {product.material || 'Soft, non-toxic rubber'}</p>
          <p><strong>Model Number:</strong> {product.model_number || product.id}</p>
        </div>
      {:else if activeTab === 'questions'}
        <div class="questions-section">
          <p>No questions yet. Be the first to ask!</p>
        </div>
      {/if}
    </div>
  </section>
</main>
  
<style>
  :global(body) {
    background-color: #FAFAFA;
    margin: 0;
    padding: 0;
    font-family: 'Nunito', sans-serif;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .product-detail {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    margin-bottom: 4rem;
  }

  .product-left {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .product-image {
    display: flex;
    width: auto;
    height: 350px;
    padding: 60px 32px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #FFF1B8;
  }

  .product-image img {
    height: 315px;
    align-self: fit;
    aspect-ratio: 170/159;
  }

  .product-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .product-title {
    font-family: 'Fredoka One', sans-serif;
    font-size: 48px;
    font-weight: 400;
    color: #333;
    margin: 0;
  }

  .rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .stars {
    display: flex;
    gap: 2px;
    font-size: 27px;
  }

  .star-full {
    color: #FFB0B0;
  }

  .star-half {
    color: #FFB0B0;
    opacity: 0.6;
  }

  .star-empty {
    color: #E0E0E0;
  }

  .review-count {
    color: #333;
    font-size: 14px;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: 400;
    line-height: 28px;
  }

  .price {
    font-size: 20px;
    font-weight: 700;
    color: #333;
    margin: 0;
  }

  .quantity-selector {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
  }

  .quantity-selector label {
    font-size: 16px;
    color: #333;
    font-family: 'Nunito', sans-serif;
    line-height: 22.4px;
  }

  .quantity-selector select {
    padding: 0.5rem;
    background-color: #FAFAFA;
    border: none;
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
  }

  .description {
    color: #333;
    line-height: 1.6;
    font-size: 16px;
    line-height: 22.4px;
  }

  .specs {
    color: #333;
    line-height: 1.8;
  }

  .specs p {
    margin: 0;
  }

  .add-to-cart {
    background-color: #8B4513;
    color: #FAFAFA;
    border: none;
    padding: 1rem 2rem;
    border-radius: 5px;
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .add-to-cart:hover {
    background-color: #6d3410;
  }

  .product-tabs {
    margin: 94px 0;
  }

  .tabs-header {
    display: flex;
    gap: 80px;
    border-bottom: 2px solid #FFB0B0;
  }

  .tabs-header button {
    background: none;
    border: none;
    padding: 1rem 0;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    color: #333;
    cursor: pointer;
    border-bottom: 3px solid transparent;
  }

  .tabs-header button.active {
    color: #333;
    font-weight: 700;
  }

  .tabs-content {
    padding: 2rem 0;
  }

  .reviews-section h3 {
    font-family: 'Fredoka One', sans-serif;
    font-size: 24px;
    font-weight: 400;
    color: #333;
    margin: 32px 0 24px;
  }

  .write-review {
    background-color: #FAFAFA;
    border: 2px solid #8B4513;
    padding: 9px 24px;
    border-radius: 6px;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: 700;
    line-height: 28px;
    cursor: pointer;
    margin-bottom: 2rem;
    transition: all 0.3s;
  }

  .write-review:hover {
    background-color: #8B4513;
    color: #FAFAFA;
  }

  .review-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    font-family: 'Nunito', sans-serif !important;
    font-size: 18px;
    line-height: 25.2px;
  }

  .review-date {
    color: #333;
    font-size: 14px;
    margin: 0.25rem 0;
    font-weight: 400;
    line-height: 19.6px;
  }

  .review-text {
    color: #333;
    margin: 0.5rem 0;
    font-size: 16px;
  }

  .no-reviews {
    color: #666;
    font-style: italic;
    margin: 2rem 0;
  }

  .info-section,
  .questions-section {
    color: #333;
    line-height: 1.8;
  }

  @media (max-width: 768px) {
    .product-detail {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .product-title {
      font-size: 32px;
    }

    .tabs-header {
      gap: 1rem;
      overflow-x: auto;
    }
  }
</style>