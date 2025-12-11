<script>
    let { 
      children, 
      fullWidth = false,
      onclick = () => {},
      type = 'button',
      disabled = false,
      ...restProps
    } = $props();
</script>
  
<button
    {type}
    {disabled}
    onclick={onclick}
    class="btn"
    class:full-width={fullWidth}
    {...restProps}
  >
    {@render children()}
</button>
  
<style>
    .btn {
      font-family: 'Nunito', sans-serif;
      font-size: 20px;
      font-weight: 700;
      padding: 12px 28px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: opacity 0.2s ease;
      white-space: nowrap;
      background-color: #8B4513;
      color: #FAFAFA;
    }
  
    .btn:hover:not(:disabled) {
      opacity: 0.9;
    }
  
    .btn:active:not(:disabled) {
      opacity: 0.8;
    }
  
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  
    .full-width {
      width: 100%;
    }
</style>