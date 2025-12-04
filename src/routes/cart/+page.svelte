<script>
  import { cart } from '$lib/stores/cartStore'
  import { goto } from '$app/navigation'
  
  let cartItems = $state([])
  
  cart.subscribe(items => {
    cartItems = items
  })
  
  let subtotal = $derived(
    cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  )
  
  function updateQuantity(productId, newQuantity) {
    if (newQuantity > 0) {
      cart.updateQuantity(productId, newQuantity)
    }
  }
  
  function removeItem(productId) {
    cart.removeItem(productId)
  }

  function handleCheckout() {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before checking out.');
      return;
    }
    goto('/payment');
  }
</script>

<svelte:head>
  <title>Your Cart - Erase with Taste</title>
</svelte:head>

<main class="cart-container">
  <nav class="breadcrumb">
    <a href="/">Cart</a> > You are here!
  </nav>

  <h1 class="cart-title">Your Cart</h1>

  {#if cartItems.length > 0}
    <div class="cart-content">
      <div class="cart-header">
        <div class="header-item"></div>
        <div class="header-item header-price">Price</div>
        <div class="header-item header-quantity">Quantity</div>
        <div class="header-item header-total">Total</div>
      </div>

      {#each cartItems as item}
        <div class="cart-item">
          <div class="item-info">
            <div class="item-image">
              <img src={item.image_url || '/images/favicon.png'} alt={item.name} />
            </div>
            <div class="item-details">
              <h3 class="item-name">{item.name}</h3>
              <button class="remove-btn" onclick={() => removeItem(item.id)}>
                Remove
              </button>
            </div>
          </div>

          <div class="item-values-row">
            <div class="item-price">
              ${item.price.toFixed(2)}
            </div>

            <div class="item-quantity">
              <select 
                value={item.quantity}
                onchange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              >
                {#each Array(10) as _, i}
                  <option value={i + 1}>{i + 1}</option>
                {/each}
              </select>
            </div>

            <div class="item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        </div>
      {/each}

      <div class="cart-footer">
        <div class="subtotal-section">
          <p class="subtotal-label">Subtotal: ${subtotal.toFixed(2)}</p>
          <p class="subtotal-note">Shipping, taxes, and discounts will be calculated at checkout.</p>
        </div>

        <div class="cart-actions">
          <a href="/" class="keep-shopping-btn">Keep Shopping</a>
          <button class="checkout-btn" onclick={handleCheckout}>Checkout</button>
        </div>
      </div>
    </div>
  {:else}
    <div class="empty-cart">
      <p>Your cart is empty.</p>
      <a href="/" class="keep-shopping-btn">Start Shopping</a>
    </div>
  {/if}
</main>

<style>
  :global(body) {
    background-color: #FAFAFA;
    margin: 0;
    padding: 0;
    font-family: 'Nunito', sans-serif;
  }

  .cart-container {
    display: flex;
    min-height: 931px;
    padding: 52px;
    flex-direction: column;
    align-items: center;
    gap: 44px;
    align-self: stretch;
    background: #FAFAFA;
    max-width: 1360px;
    margin: 0 auto;
  }

  .breadcrumb {
    font-size: 16px;
    color: #333;
    align-self: flex-start;
  }

  .breadcrumb a {
    text-decoration: none;
    color: #333;
  }

  .cart-title {
    font-family: 'Fredoka One', sans-serif;
    font-size: 48px;
    font-weight: 400;
    color: #333;
    margin: 0;
    align-self: flex-start;
  }

  .cart-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .cart-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #FFB0B0;
  }

  .header-item {
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: 400;
    color: #333;
  }

  .header-price,
  .header-quantity,
  .header-total {
    text-align: center;
  }

  .cart-item {
    display: grid;
    grid-template-columns: 2fr 3fr;
    gap: 24px;
    align-items: start;
    padding: 24px 0;
    border-bottom: 1px solid #FFB0B0;
  }

  .item-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 7px;
    align-self: stretch;
  }

  .item-image {
    width: 310px;
    height: 300px;
    background-color: #FFF1B8;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px;
    flex-shrink: 0;
    padding: 34px 26px;
  }

  .item-image img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .item-details {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  .item-name {
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #333;
    margin: 0;
  }

  .remove-btn {
    background: none;
    border: none;
    color: #FFB0B0;
    font-family: 'Nunito', sans-serif;
    font-size: 18px;
    font-weight: 400;
    cursor: pointer;
    padding: 0;
    text-align: left;
    transition: color 0.3s;
  }

  .remove-btn:hover {
    color: #ff8080;
    text-decoration: underline;
  }

  .item-price,
  .item-total {
    font-family: 'Nunito', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #333;
    text-align: center;
  }

  .item-values-row {
    display: flex;
    justify-content: space-between;
    gap: 24px;
    padding-top: 0;
    margin-left: 83px;
    width: 600px;
    align-items: center;
  }

  .item-quantity {
    display: flex;
    justify-content: center;
  }

  .item-quantity select {
    border: none;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    background-color: #FAFAFA;
  }

  .cart-footer {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 24px;
    margin-top: 32px;
  }

  .subtotal-section {
    text-align: right;
  }

  .subtotal-label {
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #333;
    margin: 0;
  }

  .subtotal-note {
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    font-style: italic;
    color: #333;
    margin: 0;
  }

  .cart-actions {
    display: flex;
    gap: 16px;
  }

  .keep-shopping-btn {
    background-color: #FAFAFA;
    color: #8B4513;
    border: 1px solid #8B4513;
    padding: 12px 28px;
    border-radius: 6px;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    transition: all 0.3s;
  }

  .keep-shopping-btn:hover {
    background-color: #8B4513;
    color: #FAFAFA;
  }

  .checkout-btn {
    background-color: #8B4513;
    color: #FAFAFA;
    border: none;
    padding: 12px 28px;
    border-radius: 6px;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .checkout-btn:hover {
    background-color: #6d3410;
  }

  .empty-cart {
    text-align: center;
    padding: 64px;
  }

  .empty-cart p {
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    color: #666;
    margin-bottom: 24px;
  }

  @media (max-width: 768px) {
    .cart-container {
      padding: 24px;
    }

    .cart-title {
      font-size: 32px;
    }

    .cart-header {
      display: none;
    }

    .cart-item {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .item-info {
      flex-direction: column;
      text-align: center;
    }

    .item-price,
    .item-quantity,
    .item-total {
      justify-self: center;
    }

    .cart-actions {
      flex-direction: column;
      width: 100%;
    }

    .keep-shopping-btn,
    .checkout-btn {
      width: 100%;
    }
  }
</style>