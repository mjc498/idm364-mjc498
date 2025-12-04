<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { cart } from '$lib/stores/cartStore';

	let cartItems = $state([]);
	let shipping = $state(2.25);

	let subtotal = $derived(
		cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
	);
	let total = $derived(subtotal + shipping);

	let cardNumber = $state('');
	let expirationDate = $state('');
	let cvc = $state('');
	let country = $state('');
	let postalCode = $state('');

	cart.subscribe(items => {
		cartItems = items;
	});

	onMount(() => {
		if (cartItems.length === 0) {
			goto('/cart');
		}
	});

	function formatCardNumber(value) {
		const digits = value.replace(/\D/g, '');
		return digits.replace(/(\d{4})/g, '$1 ').trim();
	}

	function handleCardNumberInput(e) {
		const formatted = formatCardNumber(e.target.value);
		cardNumber = formatted;
	}

	function formatExpirationDate(value) {
		const digits = value.replace(/\D/g, '');
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
		if (!cardNumber || !expirationDate || !cvc || !country || !postalCode) {
			alert('Please fill in all fields');
			return;
		}

		alert('Payment processed successfully!');
		cart.clearCart();
		goto('/');
	}
</script>

<svelte:head>
	<title>Payment - Erase with Taste</title>
</svelte:head>

<main class="payment-container">
	<nav class="breadcrumb">
		<a href="/cart">Cart</a> > You are here!
	</nav>

	<h1 class="title">Payment</h1>

	<div class="content-wrapper">
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

		<div class="divider"></div>

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
		font-size: 18px;
		font-weight: 700;
		color: #333;
	}

	input {
		width: 100%;
		padding: 10px 12px;
		font-size: 16px;
		border: 2px solid #CACACA80;
		border-radius: 6px;
		font-family: 'Nunito', sans-serif;
		transition: border-color 0.2s;
		box-sizing: border-box;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.07);
		margin-bottom: 20px;
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
		top: 35%;
		transform: translateY(-50%);
		display: flex;
		gap: 4px;
		align-items: flex-start;
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
		padding: 12px 28px;
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
		gap: 36px;
		width: 100%;
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
		font-size: 14px;
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
		gap: 15px;
	}

	.summary-row {
		display: flex;
		justify-content: space-between;
		font-family: 'Nunito', sans-serif;
		font-size: 20px;
		color: #333;
	}

	.total-row {
		font-weight: 700;
		font-size: 20px;
		padding-top: 16px;
		border-top: 1px solid #FFB0B0;
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
</style>