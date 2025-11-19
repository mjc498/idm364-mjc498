<script>
    let { data } = $props()
    
    let quantity = $state(1)
    let activeTab = $state('reviews')
  
    const { product, relatedProducts } = data
  
    function addToCart() {
      // Cart functionality to be implemented
      alert(`Added ${quantity} x ${product.name} to cart!`)
    }
  
    function calculateTotalPrice() {
      if (!relatedProducts || relatedProducts.length === 0) return product.price
      return product.price + relatedProducts[0].price
    }
  </script>
  
  <svelte:head>
    <title>{product.name} - Maria-Louisa Ching</title>
  </svelte:head>
  
  <main class="container">
    <nav class="breadcrumb">
      <a href="/">Home</a> > <a href="/">Products</a> > {product.name}
    </nav>
  
    <div class="product-detail">
      <div class="product-image">
        <img 
          src={product.image_url || '/images/favicon.png'} 
          alt={product.name}
        />
      </div>
  
      <div class="product-content">
        <h1 class="product-title">{product.name}</h1>
        
        <div class="rating">
          <div class="stars">
            {'★'.repeat(5)}
          </div>
          <span class="review-count">({product.review_count || 2})</span>
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
  
        <button class="add-to-cart" onclick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  
    {#if relatedProducts && relatedProducts.length > 0}
      <section class="frequently-bought">
        <h2>Frequently Bought Together</h2>
        
        <div class="bundle-container">
          <div class="bundle-items">
            <div class="bundle-product">
              <img src={product.image_url} alt={product.name} />
              <p class="bundle-name">{product.name}</p>
              <p class="bundle-price">${product.price?.toFixed(2)}</p>
            </div>
  
            <div class="plus-icon">+</div>
  
            {#each relatedProducts.slice(0, 1) as related}
              <div class="bundle-product">
                <img src={related.image_url} alt={related.name} />
                <p class="bundle-name">{related.name}</p>
                <p class="bundle-price">${related.price?.toFixed(2)}</p>
              </div>
            {/each}
          </div>
  
          <div class="bundle-cta">
            <p class="total-price">Total Price: ${calculateTotalPrice().toFixed(2)}</p>
            <button class="add-to-cart">Add to Cart</button>
          </div>
        </div>
      </section>
    {/if}
  
    <section class="product-tabs">
      <div class="tabs-header">
        <button 
          class:active={activeTab === 'reviews'}
          onclick={() => activeTab = 'reviews'}
        >
          Reviews ({product.review_count || 2})
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
            
            <div class="review">
              <div class="review-header">
                <strong>Jane Doe</strong>
                <div class="stars">{'★'.repeat(5)}</div>
              </div>
              <p class="review-date">10/10/25</p>
              <p class="review-text">So cute. Love it!</p>
            </div>
          </div>
        {:else if activeTab === 'info'}
          <div class="info-section">
            <p><strong>Size:</strong> {product.size || 'Approximately 5 cm'}</p>
            <p><strong>Material:</strong> {product.material || 'Soft, non-toxic rubber'}</p>
            <p><strong>Model Number:</strong> {product.model_number || product.id}</p>
            <p><strong>Category:</strong> {product.category}</p>
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
  
    .breadcrumb {
      font-size: 14px;
      color: #333333;
      margin-bottom: 2rem;
    }
  
    .breadcrumb a {
      text-decoration: none;
      color: #333333;
    }
  
    .product-detail {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      margin-bottom: 4rem;
    }
  
    .product-image {
      background-color: #FFF1B8;
      border-radius: 10px;
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
  
    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  
    .product-content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  
    .product-title {
      font-size: 48px;
      font-weight: 700;
      color: #333333;
      margin: 0;
    }
  
    .rating {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  
    .stars {
      color: #FFB0B0;
      font-size: 20px;
    }
  
    .review-count {
      color: #666;
      font-size: 14px;
    }
  
    .price {
      font-size: 24px;
      font-weight: 400;
      color: #333333;
      margin: 0.5rem 0;
    }
  
    .quantity-selector {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 1rem 0;
    }
  
    .quantity-selector label {
      font-size: 16px;
      color: #333333;
    }
  
    .quantity-selector select {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
    }
  
    .description {
      color: #333333;
      line-height: 1.6;
    }
  
    .specs {
      color: #333333;
      line-height: 1.8;
    }
  
    .specs p {
      margin: 0.5rem 0;
    }
  
    .add-to-cart {
      background-color: #8B4513;
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 5px;
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 1rem;
      transition: background-color 0.3s;
    }
  
    .add-to-cart:hover {
      background-color: #6d3410;
    }
  
    .frequently-bought {
      margin: 4rem 0;
      padding: 2rem 0;
      border-top: 1px solid #ddd;
    }
  
    .frequently-bought h2 {
      font-size: 24px;
      font-weight: 700;
      color: #333333;
      margin-bottom: 2rem;
    }
  
    .bundle-container {
      display: flex;
      gap: 3rem;
      align-items: center;
    }
  
    .bundle-items {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
  
    .bundle-product {
      text-align: center;
    }
  
    .bundle-product img {
      width: 180px;
      height: 180px;
      background-color: #FFF1B8;
      border-radius: 10px;
      padding: 1rem;
      object-fit: contain;
    }
  
    .bundle-name {
      font-weight: 600;
      margin: 0.5rem 0;
      color: #333333;
    }
  
    .bundle-price {
      color: #666;
      margin: 0;
    }
  
    .plus-icon {
      font-size: 32px;
      color: #333333;
      font-weight: 300;
    }
  
    .bundle-cta {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  
    .total-price {
      font-size: 18px;
      font-weight: 600;
      color: #333333;
    }
  
    .product-tabs {
      margin: 4rem 0;
    }
  
    .tabs-header {
      display: flex;
      gap: 2rem;
      border-bottom: 2px solid #ddd;
    }
  
    .tabs-header button {
      background: none;
      border: none;
      padding: 1rem 0;
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
      color: #666;
      cursor: pointer;
      border-bottom: 3px solid transparent;
      transition: all 0.3s;
    }
  
    .tabs-header button.active {
      color: #333333;
      font-weight: 600;
      border-bottom-color: #333333;
    }
  
    .tabs-content {
      padding: 2rem 0;
    }
  
    .reviews-section h3 {
      font-size: 24px;
      font-weight: 700;
      color: #333333;
      margin-bottom: 1rem;
    }
  
    .write-review {
      background-color: white;
      border: 2px solid #333333;
      padding: 0.75rem 1.5rem;
      border-radius: 5px;
      font-family: 'Nunito', sans-serif;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      margin-bottom: 2rem;
      transition: all 0.3s;
    }
  
    .write-review:hover {
      background-color: #333333;
      color: white;
    }
  
    .review {
      margin: 1.5rem 0;
    }
  
    .review-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
  
    .review-date {
      color: #999;
      font-size: 14px;
      margin: 0.25rem 0;
    }
  
    .review-text {
      color: #333333;
      margin: 0.5rem 0;
    }
  
    .info-section,
    .questions-section {
      color: #333333;
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
  
      .bundle-container {
        flex-direction: column;
        gap: 2rem;
      }
  
      .bundle-items {
        flex-direction: column;
      }
  
      .tabs-header {
        gap: 1rem;
        overflow-x: auto;
      }
    }
  </style>