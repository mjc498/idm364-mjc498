<script>
	import { page } from '$app/stores';
	
	let { children } = $props();
  </script>
  
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
  <div class="app">
	<nav class="navbar">
	  <div class="nav-container">
		<a href="/" class="logo">
			<img src="/images/favicon.png" alt="Site Logo" width="55" height="35" />
		  </a>
		
		<div class="nav-links">
		  <a href="/" class:active={$page.url.pathname === '/'}>Home</a>
		  <a href="/faq" class:active={$page.url.pathname === '/faq'}>FAQ</a>
		</div>
		
		<div class="nav-icons">
		  <!-- Search -->
		  <button class="icon-btn" aria-label="Search">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			  <circle cx="11" cy="11" r="8"/>
			  <path d="m21 21-4.35-4.35"/>
			</svg>
		  </button>
		  
		  <!-- Account -->
		  <a href="/account" class="icon-btn" aria-label="Account">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
			  <circle cx="12" cy="7" r="4"/>
			</svg>
		  </a>
		  
		  <!-- Cart -->
		  <a href="/cart" class="icon-btn" aria-label="Cart">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			  <circle cx="9" cy="21" r="1"/>
			  <circle cx="20" cy="21" r="1"/>
			  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
			</svg>
		  </a>
		</div>
	  </div>
	</nav>
	
	<main>
	  {@render children()}
	</main>
</div>
  
<style>
/* navbar */
	:global(body) {
	  margin: 0;
	  padding: 0;
	  font-family: 'Nunito', sans-serif;
	}
	
	.app {
	  min-height: 100vh;
	  display: flex;
	  flex-direction: column;
	}
	
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
	  font-size: 18px;
	  font-weight: 700;
	  position: relative;
	  transition: opacity 0.2s;
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
	
	main {
	  flex: 1;
	}
	
	@media (max-width: 768px) {
	  .nav-container {
		padding: 1rem;
	  }
	  
	  .nav-links {
		position: static;
		transform: none;
		gap: 1.5rem;
	  }
	  
	  .nav-icons {
		gap: 1rem;
	  }
	}
</style>