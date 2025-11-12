<script lang="ts">
    interface Props {
      text: string;
      icon: string;
      onclick?: (event: MouseEvent) => void;
    }
    
    let { text, icon, onclick }: Props = $props();
  </script>
  
  <button {onclick}>
    <span class="icon">{icon}</span>
    <span class="text">{text}</span>
  </button>
  
  <style>
    button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      font-weight: 600;
      background: #10b981;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    button:hover {
      background: #059669;
      transform: translateY(-2px);
    }
    
    button:active {
      transform: translateY(0);
    }
    
    .icon {
      font-size: 1.25rem;
    }
  </style>