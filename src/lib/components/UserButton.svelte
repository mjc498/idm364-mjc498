<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher<{ click: { name: string; email: string } }>();

    function handle_click() {
        const userData = {
            name: 'Jane Doe',
            email: 'john@example.com'
        };
        dispatch('click', userData);
    }
</script>

<button onclick={handle_click}>
    Send User Data
</button>

<style>
    button {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        font-weight: 600;
        background: #f59e0b;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
    }

    button:hover {
        background: #d97706;
        transform: translateY(-2px);
    }

    button:active {
        transform: translateY(0);
    }
</style>