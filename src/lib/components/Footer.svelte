<script>
    const year = new Date().getFullYear();
  </script>
  
  <footer class="footer">
    <!-- Top navigation section -->
    <div class="footer-top">
      <img src="/images/favicon_pink.png" alt="Site Logo" class="footer-logo" />
      <nav class="footer-nav">
        <a href="#">Shipping</a>
        <a href="#">Returns</a>
        <a href="#">Sizing Guide</a>
        <a href="#">Privacy</a>
      </nav>
    </div>
  
    <hr class="footer-divider" />
  
    <!-- Bottom information section -->
    <div class="footer-bottom">
      <div class="footer-payments">
        <img src="/images/mastercard.png" alt="Mastercard" />
        <img src="/images/paypal.png" alt="PayPal" />
        <img src="/images/gpay.png" alt="GPay" />
        <img src="/images/visa.png" alt="Visa" />
        <img src="/images/applepay.png" alt="Apple Pay" />
      </div>
  
      <p class="footer-copy">© {year} Maria-Louisa Ching</p>
  
      <div class="footer-lang">
        <span>🇺🇸 English ▼</span>
        <span>USD ▼</span>
      </div>
    </div>
  </footer>
  
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');
  
    .footer {
      width: 100%;
      background-color: #8b4513;
      color: #ffffff;
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
      font-weight: 400;
      padding: 2rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }
  
    .footer-top {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.2rem;
    }
  
    .footer-logo {
      width: 40px;
      height: auto;
    }
  
    .footer-nav {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 2rem;
    }
  
    .footer-nav a {
      color: #ffffff;
      text-decoration: none;
      transition: opacity 0.2s ease;
    }
  
    .footer-nav a:hover {
      opacity: 0.8;
    }
  
    .footer-divider {
      width: 90%;
      border: none;
      border-top: 1px solid rgba(255, 255, 255, 0.6);
    }
  
    .footer-bottom {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
  
    .footer-payments {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  
    .footer-payments img {
      height: 24px;
      width: auto;
    }
  
    .footer-copy {
      text-align: center;
      flex: 1;
    }
  
    .footer-lang {
      display: flex;
      align-items: center;
      gap: 1rem;
      white-space: nowrap;
    }
  
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .footer-nav {
        gap: 1rem;
        font-size: 14px;
      }
  
      .footer-bottom {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }
  
      .footer-payments img {
        height: 20px;
      }
    }
  </style>
  