<script lang="ts">
    interface Props {
      onclick?: (event: CustomEvent<{ title: string; timestamp: string }>) => void;
    }
    
    let { onclick }: Props = $props();
    
    function handle_click(e: MouseEvent) {
      const data = {
        title: 'Button Clicked',
        timestamp: new Date().toLocaleTimeString()
      };
      const customEvent = new CustomEvent('click', { detail: data });
      onclick?.(customEvent);
    }
  </script>
  
  <button onclick={handle_click}>
    Send Data Object
  </button>