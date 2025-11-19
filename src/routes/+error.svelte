<script>
    import { page } from '$app/stores'
    import { goto } from '$app/navigation'
    import Button from '$lib/components/Button.svelte'
  </script>
  
  <svelte:head>
    <title>404 - Page Not Found</title>
  </svelte:head>
  
  <div class="error-page">
    <div class="error-icon">
      <img src="/images/emote.png" alt="Error" />
    </div>
  
    <h1 class="error-title">Uh oh... 404 error</h1>
    
    <p class="error-message">
      The page you are looking for is not available. Use the button below to go back home.
    </p>
  
    <a href="/">
      <Button>Go back home</Button>
    </a>
  </div>
  
  <style>
    :global(body) {
      background-color: #FAFAFA;
      margin: 0;
      padding: 0;
      font-family: 'Nunito', sans-serif;
    }
  
    .error-page {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 2rem;
      text-align: center;
    }
  
    .error-icon {
      margin-bottom: 2rem;
      animation: float 3s ease-in-out infinite;
      margin-top: -3.5rem;
    }
  
    .error-icon img {
      width: 120px;
      height: 120px;
      object-fit: contain;
    }
  
    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }
  
    .error-title {
      font-family: 'Fredoka', sans-serif;
      font-size: 90px;
      font-weight: 700;
      color: #333333;
      margin: 0 0 1rem 0;
      line-height: 1.2;
    }
  
    .error-message {
      font-family: 'Nunito', sans-serif;
      font-size: 18px;
      font-weight: 400;
      color: #666666;
      max-width: 900px;
      margin: 0 0 2rem 0;
      line-height: 1.6;
    }
  
    @media (max-width: 768px) {
      .error-title {
        font-size: 48px;
      }
  
      .error-message {
        font-size: 16px;
      }
    }
  </style>