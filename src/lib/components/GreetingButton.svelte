<script lang="ts">
    interface Props {
      message: string;
      onclick?: (event: CustomEvent<string>) => void;
    }
    
    let { message, onclick }: Props = $props();
    
    function handle_click(e: MouseEvent) {
      const customEvent = new CustomEvent('click', { detail: message });
      onclick?.(customEvent);
    }
  </script>
  
  <button onclick={handle_click}>
    Send: "{message}"
  </button>