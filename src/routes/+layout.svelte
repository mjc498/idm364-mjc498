<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	
	let { children } = $props();
  </script>
  
  <div class="app">
	<Header />
	
	<main>
	  {@render children()}
	</main>
	
	<Footer />
  </div>
  
  <style>
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
	
	main {
	  flex: 1;
	}
  </style>