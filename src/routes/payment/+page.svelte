<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { cart } from '$lib/stores/cartStore';

	let cartItems = $state([]);
	let shipping = $state(2.25);

	// Use $derived for calculated values
	let subtotal = $derived(
		cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
	);
	let total = $derived(subtotal + shipping);

	let cardNumber = $state('');
	let expirationDate = $state('');
	let cvc = $state('');
	let country = $state('');
	let postalCode = $state('');
	let showModal = $state(false);

	// Subscribe to cart store
	cart.subscribe(items => {
		cartItems = items;
	});

	onMount(() => {
		// If no cart items, redirect to cart page
		if (cartItems.length === 0) {
			goto('/cart');
		}
	});

	function formatCardNumber(value) {
		// Remove all non-digits
		const digits = value.replace(/\D/g, '');
		// Add space every 4 digits
		return digits.replace(/(\d{4})/g, '$1 ').trim();
	}

	function handleCardNumberInput(e) {
		const formatted = formatCardNumber(e.target.value);
		cardNumber = formatted;
	}

	function formatExpirationDate(value) {
		// Remove all non-digits
		const digits = value.replace(/\D/g, '');
		// Add slash after 2 digits
		if (digits.length >= 2) {
			return digits.slice(0, 2) + '/' + digits.slice(2, 4);
		}
		return digits;
	}

	function handleExpirationInput(e) {
		const formatted = formatExpirationDate(e.target.value);
		expirationDate = formatted;
	}

	function handlePayment() {
		// Validate all fields
		if (!cardNumber || !expirationDate || !cvc || !country || !postalCode) {
			alert('Please fill in all fields');
			return;
		}

		// Show the modal
		showModal = true;
	}

	function closeModal() {
		showModal = false;
		// Clear cart using the store method
		cart.clearCart();
		goto('/');
	}
</script>

<svelte:head>
	<title>Payment - Erase with Taste</title>
</svelte:head>

<main class="payment-container">
	<!-- Header -->
	<nav class="breadcrumb">
		<a href="/cart">Cart</a> > You are here!
	</nav>

	<h1 class="title">Payment</h1>

	<!-- Main Content -->
	<div class="content-wrapper">
		<!-- Left Section: Payment Form -->
		<div class="payment-form">
			<div class="form-group">
				<label for="cardNumber">Card Number</label>
				<div class="card-input-wrapper">
					<input
						type="text"
						id="cardNumber"
						placeholder="1234 1234 1234 1234"
						bind:value={cardNumber}
						oninput={handleCardNumberInput}
						maxlength="19"
					/>
					<div class="card-logos">
						<img src="/images/logo-visa.svg" alt="Visa" />
						<img src="/images/logo-mastercard.svg" alt="Mastercard" />
						<img src="/images/logo-amex.svg" alt="American Express" />
						<img src="/images/logo-discover.svg" alt="Discover" />
					</div>
				</div>
			</div>

			<div class="form-row">
				<div class="form-group">
					<label for="expirationDate">Expiration Date</label>
					<input
						type="text"
						id="expirationDate"
						placeholder="MM/YY"
						bind:value={expirationDate}
						oninput={handleExpirationInput}
						maxlength="5"
					/>
				</div>

				<div class="form-group">
					<label for="cvc">CVC</label>
					<input
						type="text"
						id="cvc"
						placeholder="123"
						bind:value={cvc}
						maxlength="4"
					/>
				</div>
			</div>

			<div class="form-row">
				<div class="form-group">
					<label for="country">Country</label>
					<input
						type="text"
						id="country"
						placeholder="United States"
						bind:value={country}
					/>
				</div>

				<div class="form-group">
					<label for="postalCode">Postal Code</label>
					<input
						type="text"
						id="postalCode"
						placeholder="12345"
						bind:value={postalCode}
					/>
				</div>
			</div>

			<button class="pay-button" onclick={handlePayment}>
				Pay Now
			</button>
		</div>

		<!-- Pink Divider -->
		<div class="divider"></div>

		<!-- Right Section: Order Summary -->
		<div class="order-summary">
			{#each cartItems as item}
				<div class="product-item">
					<div class="product-image-wrapper">
						<div class="product-image-container">
							<img src={item.image_url || '/images/favicon.png'} alt={item.name} class="product-image" />
						</div>
						<span class="quantity-badge">{item.quantity}</span>
					</div>
					<div class="product-details">
						<h3 class="product-name">{item.name}</h3>
						<p class="product-price">${item.price.toFixed(2)}</p>
					</div>
				</div>
			{/each}

			<div class="summary-details">
				<div class="summary-row">
					<span>Subtotal</span>
					<span>${subtotal.toFixed(2)}</span>
				</div>
				<div class="summary-row">
					<span>Shipping</span>
					<span>${shipping.toFixed(2)}</span>
				</div>
				<div class="summary-row total-row">
					<span>Total</span>
					<span>${total.toFixed(2)}</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal Overlay and Modal -->
	{#if showModal}
		<div 
			class="modal-overlay" 
			onclick={closeModal}
			onkeydown={(e) => e.key === 'Escape' && closeModal()}
			role="button"
			tabindex="0"
			aria-label="Close modal"
		></div>
		<div class="modal">
			<img src="/images/minions.gif" alt="Success" class="modal-image" />
			<h2 class="modal-title">Your order has been placed!</h2>
			<p class="modal-message">Thank you!</p>
			<button class="modal-button" onclick={closeModal}>Go Home</button>
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

	.payment-container {
		display: flex;
		min-height: 931px;
		padding: 52px;
		flex-direction: column;
		align-items: center;
		gap: 44px;
		background: #FAFAFA;
		max-width: 1360px;
		margin: 0 auto;
	}

	.breadcrumb {
		font-size: 16px;
		color: #333;
		align-self: flex-start;
		width: 100%;
	}

	.breadcrumb a {
		text-decoration: none;
		color: #333;
	}

	.title {
		font-family: 'Fredoka One', sans-serif;
		font-size: 48px;
		font-weight: 400;
		color: #333;
		margin: 0;
		align-self: flex-start;
		width: 100%;
	}

	.content-wrapper {
		display: inline-flex;
		align-items: flex-start;
		gap: 52px;
		width: 100%;
		justify-content: center;
	}

	.payment-form {
		display: flex;
		width: 582px;
		flex-direction: column;
		align-items: flex-start;
		gap: 10px;
	}

	.form-group {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	label {
		font-family: 'Nunito', sans-serif;
		font-size: 14px;
		font-weight: 500;
		color: #333;
	}

	input {
		width: 100%;
		padding: 12px 16px;
		font-size: 14px;
		border: 1px solid #d1d5db;
		border-radius: 8px;
		font-family: 'Nunito', sans-serif;
		transition: border-color 0.2s;
		box-sizing: border-box;
	}

	input:focus {
		outline: none;
		border-color: #8B4513;
	}

	.card-input-wrapper {
		position: relative;
		width: 100%;
	}

	.card-input-wrapper input {
		padding-right: 120px;
	}

	.card-logos {
		position: absolute;
		right: 12px;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		gap: 6px;
		align-items: center;
	}

	.card-logos img {
		height: 20px;
		width: auto;
	}

	.form-row {
		display: flex;
		gap: 16px;
		width: 100%;
	}

	.form-row .form-group {
		flex: 1;
	}

	.pay-button {
		width: 100%;
		padding: 14px 24px;
		background-color: #8B4513;
		color: #FAFAFA;
		border: none;
		border-radius: 6px;
		font-family: 'Nunito', sans-serif;
		font-size: 20px;
		font-weight: 700;
		cursor: pointer;
		transition: background-color 0.3s;
		margin-top: 10px;
	}

	.pay-button:hover {
		background-color: #6d3410;
	}

	.divider {
		width: 1px;
		height: 646px;
		background: #FFB0B0;
		flex-shrink: 0;
	}

	.order-summary {
		display: flex;
		width: 574px;
		flex-direction: column;
		align-items: flex-start;
		gap: 40px;
	}

	.product-item {
		display: flex;
		align-items: flex-start;
		gap: 20px;
		width: 100%;
		padding: 20px;
	}

	.product-image-wrapper {
		position: relative;
		flex-shrink: 0;
	}

	.product-image-container {
		width: 165px;
		height: 165px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #FFF1B8;
		border-radius: 10px;
		box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
		padding: 27px 26px;
	}

	.product-image {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}

	.quantity-badge {
		position: absolute;
		top: -8px;
		right: -8px;
		background: #8B4513;
		color: #FAFAFA;
		width: 40px;
		height: 40px;
		border-radius: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'Nunito', sans-serif;
		font-size: 20px;
		font-weight: 700;
	}

	.product-details {
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-family: 'Nunito', sans-serif;
		align-self: stretch;
	}

	.product-name {
		font-family: 'Fredoka One', sans-serif;
		font-size: 48px;
		font-weight: 400;
		color: #333;
		margin: 0;
	}

	.product-price {
		font-family: 'Nunito', sans-serif;
		font-size: 18px;
		font-weight: 700;
		color: #333;
		margin: 0;
	}

	.summary-details {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.summary-row {
		display: flex;
		justify-content: space-between;
		font-family: 'Nunito', sans-serif;
		font-size: 18px;
		color: #333;
	}

	.total-row {
		font-weight: 700;
		font-size: 20px;
		padding-top: 16px;
		border-top: 1px solid #FFB0B0;
	}

	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #CACACA80;
		backdrop-filter: blur(4px);
		z-index: 999;
		cursor: pointer;
	}

	.modal {
		display: flex;
		width: 500px;
		padding-bottom: 24px;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		border-radius: 12px;
		background: #FAFAFA;
		z-index: 1000;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
	}

	.modal-image {
		width: 500px;
		height: 260px;
		border-radius: 12px 12px 0 0;
	}

	.modal-title {
		font-family: 'Fredoka One', sans-serif;
		font-size: 32px;
		font-weight: 400;
		color: #333;
		margin: 0;
		text-align: center;
	}

	.modal-message {
		font-family: 'Nunito', sans-serif;
		font-size: 18px;
		color: #666;
		text-align: center;
		margin: 0;
		padding: 0 20px;
	}

	.modal-button {
		background-color: #8B4513;
		color: #FAFAFA;
		border: none;
		padding: 9px 24px;
		border-radius: 6px;
		font-family: 'Nunito', sans-serif;
		font-size: 20px;
		font-weight: 700;
		cursor: pointer;
		transition: background-color 0.3s;
		margin-top: 8px;
		width: 420px;
	}

	.modal-button:hover {
		background-color: #6d3410;
	}

	@media (max-width: 1280px) {
		.content-wrapper {
			flex-direction: column;
			gap: 40px;
			align-items: center;
		}

		.payment-form,
		.order-summary {
			width: 100%;
			max-width: 600px;
		}

		.divider {
			width: 100%;
			height: 1px;
		}
	}

	@media (max-width: 768px) {
		.payment-container {
			padding: 24px;
		}

		.title {
			font-size: 32px;
		}

		.payment-form,
		.order-summary {
			max-width: 100%;
		}
	}

	@media (max-width: 600px) {
		.modal {
			width: 90%;
			max-width: 400px;
		}

		.modal-image {
			width: 150px;
		}

		.modal-title {
			font-size: 24px;
		}

		.modal-message {
			font-size: 16px;
		}
	}
</style>