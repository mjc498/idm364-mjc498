<script>
	import { page } from '$app/state';
	import LoginModal from '$lib/components/LoginModal.svelte';
	import SignupModal from '$lib/components/SignupModal.svelte';
	
	let showLoginModal = $state(false);
	let showSignupModal = $state(false);

	function openLoginModal() {
		showLoginModal = true;
		showSignupModal = false;
	}

	function openSignupModal() {
		showSignupModal = true;
		showLoginModal = false;
	}

	function closeModals() {
		showLoginModal = false;
		showSignupModal = false;
	}
</script>

<nav class="navbar">
	<div class="nav-container">
		<a href="/" class="logo">
			<img src="/images/favicon.png" alt="Company logo" width="55" height="35" />
		</a>
		
		<div class="nav-links">
			<a href="/" class:active={page.url.pathname === '/'}>Home</a>
			<a href="/faq" class:active={page.url.pathname === '/faq'}>FAQ</a>
		</div>
		
		<div class="nav-icons">
			<button class="icon-btn" aria-label="Search">
				<img src="/images/search.png" alt="" class="icon" />
			</button>
			
			<button class="icon-btn" aria-label="Profile" onclick={openLoginModal}>
				<img src="/images/profile.png" alt="" class="icon" />
			</button>
			
			<a href="/cart" class="icon-btn" aria-label="Cart">
				<img src="/images/cart.png" alt="" class="icon" />
			</a>
		</div>
	</div>
</nav>

{#if showLoginModal}
	<LoginModal onClose={closeModals} onSwitchToSignup={openSignupModal} />
{/if}

{#if showSignupModal}
	<SignupModal onClose={closeModals} onSwitchToLogin={openLoginModal} />
{/if}

<style>
	.navbar {
		background-color: #FFF1B8;
		position: sticky;
		top: 0;
		z-index: 100;
	}
	
	.nav-container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 1rem 2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.logo {
		display: flex;
		align-items: center;
		text-decoration: none;
		transition: opacity 0.2s;
	}
	
	.nav-links {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 50px;
	}
	
	.nav-links a {
		text-decoration: none;
		color: #333333;
		font-family: 'Nunito', sans-serif;
		font-size: 18px;
		font-weight: 700;
		position: relative;
		transition: opacity 0.2s;
	}
	
	.nav-links a:hover {
		opacity: 0.7;
	}
	
	.nav-links a.active {
		text-decoration: underline;
	}
	
	.nav-icons {
		display: flex;
		gap: 20px;
		align-items: center;
	}
	
	.icon-btn {
		background: none;
		border: none;
		padding: 0.5rem;
		cursor: pointer;
		color: #333333;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: opacity 0.2s;
		text-decoration: none;
	}

	.icon {
		width: 18px;
		height: 20px;
		display: block;
	}
	
	@media (max-width: 768px) {
		.nav-container {
			padding: 1rem;
		}
		
		.nav-links {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			gap: 1.5rem;
		}
		
		.nav-links a {
			font-size: 16px;
		}
		
		.nav-icons {
			gap: 1rem;
		}
	}
</style>