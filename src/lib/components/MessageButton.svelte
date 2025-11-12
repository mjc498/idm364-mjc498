<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    interface Props {
        message: string;
    }

    let { message }: Props = $props();

    const dispatch = createEventDispatcher<{ click: string }>();

    function handle_click() {
        dispatch('click', message);
    }
</script>

<button onclick={handle_click}>
    Send: "{message}"
</button>

<style>
    button {
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
</style>