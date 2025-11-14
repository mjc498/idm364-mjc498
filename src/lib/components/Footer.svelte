<script>
  const year = new Date().getFullYear();
</script>

<footer class="footer">
  <div class="footer-container">
    <div class="footer-top">
      <img src="/images/favicon_pink.png" alt="pink footer logo" class="footer-logo" />
      <nav class="footer-nav">
        <p>Shipping</p>
        <p>Returns</p>
        <p>Sizing Guide</p>
        <p>Privacy</p>
      </nav>
    </div>

    <hr class="footer-divider" />

    <div class="footer-bottom">
      <div class="footer-payments">
        <img src="/images/mastercard.png" alt="mastercard logo"/>
        <img src="/images/paypal.png" alt="paypal logo"/>
        <img src="/images/googlepay.png" alt="google pay logo"/>
        <img src="/images/visa.png" alt="visa logo"/>
        <img src="/images/applepay.png" alt="apple pay logo"/>
      </div>

      <p class="footer-copy">© {year} Maria-Louisa Ching</p>

      <div class="footer-lang">
        <span><img src="/images/usa.png" alt="usa flag" class="flag-icon" /> English</span>      
        <span>USD</span>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer {
    width: 100%;
    background-color: #8B4513;
    color: #FAFAFA;
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    font-weight: 400;
    padding: 2rem 0;
  }

  .footer-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .footer-top {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 31px;
  }

  .footer-logo {
    width: 36px;
    height: auto;
  }

  .footer-nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 32px;
  }

  .footer-divider {
    width: 100%;
    border: none;
    border-top: 1px solid #FAFAFA;
  }

  .footer-bottom {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 32px;
  }

  .footer-payments {
    display: flex;
    align-items: center;
    gap: 23px;
    flex: 1;
    min-width: 0;
  }

  .footer-payments img {
    height: 14px;
    width: auto;
    flex-shrink: 0;
  }

  .footer-copy {
    text-align: center;
    flex: 1;
    margin: 0;
    min-width: 0;
  }

  .footer-lang {
    display: flex;
    align-items: center;
    gap: 1rem;
    white-space: nowrap;
    flex: 1;
    justify-content: flex-end;
    min-width: 0;
  }

  .footer-lang span {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .flag-icon {
    height: 16px;
    width: auto;
    vertical-align: middle;
  }

  @media (max-width: 768px) {
    .footer-container {
      padding: 0 1rem;
    }

    .footer-nav {
      gap: 1rem;
      font-size: 16px;
    }

    .footer-bottom {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .footer-payments {
      gap: 15px;
    }

    .footer-payments img {
      height: 14px;
    }
    
    .footer-lang {
      justify-content: center;
    }
  }
</style>