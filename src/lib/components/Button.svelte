<script lang="ts">
  interface Props {
    text: string;
    onclick?: (event: MouseEvent) => void;
  }
  
  let { text, onclick }: Props = $props();
</script>

<button {onclick}>
  {text}
</button>

<style>
  button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    background: #0C8CE9;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  button:hover {
    background: #0C8CE9;
    transform: translateY(-2px);
  }
  
  button:active {
    transform: translateY(0);
    background: white;
    color: #0C8CE9;
    border: 2px solid #0C8CE9;
  }
</style>