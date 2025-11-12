<script lang="ts">
  import type { Action } from 'svelte/action';

  interface LongPressParams {
    on_long_press: () => void;
    duration?: number;
  }

  function long_press(node: HTMLElement, { on_long_press, duration = 1000 }: LongPressParams) {
    let timer: ReturnType<typeof setTimeout>;

    function handle_mousedown() {
      timer = setTimeout(() => {
        on_long_press();
      }, duration);
      }

      function handle_mouseup() {
        clearTimeout(timer);
      }

      function handle_mouseleave() {
        clearTimeout(timer);
      }

      node.addEventListener('mousedown', handle_mousedown);
      node.addEventListener('mouseup', handle_mouseup);
      node.addEventListener('mouseleave', handle_mouseleave);

      return {
        update(params: LongPressParams) {
          on_long_press = params.on_long_press;
          duration = params.duration ?? 1000;
        },
        destroy() {
          clearTimeout(timer);
          node.removeEventListener('mousedown', handle_mousedown);
          node.removeEventListener('mouseup', handle_mouseup);
          node.removeEventListener('mouseleave', handle_mouseleave);
        }
      };
    }

    function handleQuickAction() {
      messages.push('⚡️ Quick action (default 1s)!');
      messages = messages;
      quickCount++;
    }

    function handleSlowAction() {
      messages.push('🐌 Slow action (3s)!');
      messages = messages;
      slowCount++;
    }

    function saveFile() {
      messages.push('💾 File saved!');
      messages = messages;
    }

    function deleteItem() {
      if (confirm('Delete this item?')) {
        messages.push('🗑️ Item deleted!');
        messages = messages;
      }
    }

    let messages = $state<string[]>([]);
    let quickCount = $state(0);
    let slowCount = $state(0);
    let customDuration = $state(2000);
</script>

<div class="container">
  <h1>Long Press with Default Duration</h1>

  <div class="info-box">
    <strong>💡 How it works:</strong>
    <p>The action uses destructured parameters with a default duration of 1000ms (1 second). If you don't specify a duration, it automatically uses 1s.</p>
  </div>

  {#if messages.length > 0}
    <div class="messages">
      <div class="messages-header">
        <strong>Activity Log</strong>
        <button
          class="clear-btn"
          onclick={() => messages = []}
        >
          Clear 
        </button>
      </div>
      {#each messages as message}
        <div class="message">{message}</div>
      {/each}
    </div>
  {/if}

  <section>
    <h2>1. Default Duration (1 second)</h2>
    <p class="note">Duration not specified, uses default 1000ms</p>
    <button use:long_press={{
      on_long_press: handleQuickAction
    }}>
      Hold for 1s (default)
      <br><small>Count: {quickCount}</small>
    </button>

    <button use:long_press={{
      on_long_press: () => messages.push('✨ Another 1s action!')
    }}>
      Another 1s button 
    </button>
  </section>

  <section>
    <h2>2. Custom Duration Override</h2>
    <p class="note">Explicitly set duration to override the default</p>
    <div class="button-row">
        <button use:long_press={{
          on_long_press: () => messages.push('⚡️ 500ms!'),
          duration: 500
        }}
          class="quick-button"
        >
          0.5 seconds
        </button>

        <button use:long_press={{
          on_long_press: () => messages.push('⏱️ 2s!'),
          duration: 2000
        }} 
          class="medium-button"
        >
          2 seconds
        </button>

        <button use:long_press={{
          on_long_press: handleSlowAction,
          duration: 3000
        }}
          class="slow-button"
        >
          3 seconds
          <br><small>Count: {slowCount}</small>
        </button>
    </div>
  </section>

  <section>
    <h2>3. Mixed Usage</h2>
    <div class="action-grid">
      <button use:long_press={{
        on_long_press: saveFile
      }}
        class="save-button"
      >
        💾 Save
        <br><small>(default 1s)</small>
      </button>

      <button use:long_press={{
        on_long_press: deleteItem,
        duration: 2000
      }}
        class="delete-button"
      >
        🗑️ Delete
        <br><small>(custom 2s)</small>
      </button>

      <button use:long_press={{
        on_long_press: () => messages.push('📥 Exported!')
      }}
        class="export-button"
      >
        📤 Export
        <br><small>(default 1s)</small>
      </button>
    </div>
  </section>

  <section>
    <h2>4. Dynamic Duration Control</h2>
    <div class="controls">
      <label>
        <strong>Duration: {customDuration}ms ({customDuration / 1000}s)</strong>
        <input
          type="range"
          bind:value={customDuration}
          min="500"
          max="5000"
          step="100"
        />
      </label>
      <p class="note">
        {#if customDuration === 1000}
          Currently using the default duration ✅
        {/if}
      </p>
    </div>
    <button use:long_press={{
      on_long_press: () => messages.push(`⏲️ Held for ${customDuration}ms!`),
      duration: customDuration
    }}
      class="dynamic-button"
    >
      Hold for {customDuration / 1000}s
    </button>
  </section>

  <section>
    <h2>5. Side-by-Side Comparison</h2>
    <div class="comparison">
      <div class="comparison-item">
        <h3>Default (1s)</h3>
        <button use:long_press={{
          on_long_press: () => messages.push('Default timing!')
        }}
          class="comparison-button default"
        >
          Hold me
        </button> 
        <p>No duration specified</p>
      </div>

      <div class="comparison-item">
        <h3>Custom (2.5s)</h3>
        <button use:long_press={{
          on_long_press: () => messages.push('Custom timing!'),
          duration: 2500
        }}
          class="comparison-button custom"
        >
          Hold me longer 
        </button> 
        <p>Duration: 2500ms</p>
      </div>
    </div>
  </section>

  <section>
    <h2>6. Real-World Examples</h2>
    <div class="scenarios">
      <div class="scenario">
        <h3>📱 Quick Actions</h3>
        <p>Use default 1s for common actions</p>
        <button use:long_press={{
          on_long_press: () => messages.push('👍 Liked!')
        }}
          class="scenario-button like"
        > 
          👍 Like
        </button>
        <button use:long_press={{
          on_long_press: () => messages.push('🔖 Bookmarked!')
        }}
          class="scenario-button bookmark"
        >
          🔖 Bookmark
        </button>
      </div>

      <div class="scenario">
        <h3>🔒 Critical Actions</h3>
        <p>Use longer duration for safety</p>
        <button use:long_press={{
          on_long_press: () => alert('Reset compelted'),
          duration: 3000
        }}
          class="scenario-button danger"
        >
          🔄 Hold 3s to Reset
        </button>
      </div>
    </div>
  </section>

  <section>
    <h2>7. Minimal Usage</h2>
    <p class="note">Only <code>on_long_press</code> is required, <code>duration</code> is optional</p>
    <div class="minimal-buttons">
      {#each ['Action 1', 'Action 2', 'Action 3', 'Action 4'] as action}
        <button use:long_press={{
          on_long_press: () => messages.push(`${action} executed!`)
        }}>
          {action}
        </button>
      {/each}
    </div>
    <p class="note">All use default 1s duration</p>
  </section>
</div>

<style>
  .container {
    max-width: 900px;
    margin: 2rem auto;
    padding: 1rem;
    font-family: system-ui, sans-serif;
  }

  h1 {
    color: #333;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: #333;
  }

  section {
    margin: 2rem 0;
    padding: 1.5rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fafafa;
  }

  .info-box {
    padding: 1.5rem;
    background: #e3f2fd;
    border-left: 4px solid #2196f3;
    border-radius: 4px;
    margin-bottom: 2rem;
  }

  .info-box strong {
    display: block;
    margin-bottom: 0.5rem; 
    color: #1876d2;
  }

  .info-box p {
    margin: 0;
    color: #424242;
    line-height: 1.6;
  }

  .messages {
    position: sticky;
    top: 1rem;
    margin-bottom: 2rem;
    padding: 1rem;
    background: white;
    border: 2px solid #667eea;
    border-radius: 8px;
    max-height: 250px;
    overflow-y: auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }

  .messages-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #ddd;
  }

  .clear-btn {
    padding: 0.25rem 0.75rem;
    font-size: 0.85rem;
    background: #f44336;
    margin: 0;
  }

  .message {
    padding: 0.75rem;
    margin: 0.5rem 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 6px;
    animation: slideIn 0.3s ease;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20)px;
    }
    to {
      opacity: 2;
      transform: translateX(0);
    }
  }

  button {
    padding: 1rem 1.5rem;
    font-size: 1rem;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 0.5rem;
    user-select: none;
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  button:active {
    transform: scale(0.98);
  }

  small {
    font-size: 0.8rem;
    opacity: 0.9;
  }

  code {
    background: rgba(0, 0, 0, 0.1);
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
  }

  .note {
    margin: 0.5rem 0;
    color: #666;
    font-size: 0.9rem;
    font-style: italic;
  }

  .button-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .quick-button {
    background: #4caf50;
  }

  .medium-button {
    background: #ff9800;
  }

  .slow-button {
    background: #9c27b0;
  }

  .action-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }

  .save-button {
    background: #4caf50;
  }

  .delete-button {
    background: #f44336;
  }

  .export-button {
    background: #2196f3;
  }

  .controls {
    margin-bottom: 1fem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input[type="range"] {
    width: 100%;
    margin-top: 0.5rem;
  }

  .dynamic-button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    width: 100%;
    padding: 1.5rem;
  }

  .comparison {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }

  .comparison-item {
    text-align: center;
  }

  .comparison-item p {
    margin-top: 0.5rem;
    color: #666;
    font-size: 0.9rem;
  }

  .comparison-button {
    width: 100%;
    padding: 2rem 1rem;
  }

  .comparison-button.default {
    background: #6078db;
  }

  .comparison-button.custom {
    background: #795548;
  }

  .scenarios {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .scenario {
    padding: 1rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .scenario p {
    margin: 0.5rem 0 1rem 0;
    color: #666;
    font-size: 0.9rem;
  }

  .scenario-button {
    width: 100%;
    margin: 0.25rem 0;
  }

  .scenario-button.like {
    background: #e91e63;
  }

  .scenario-button.bookmark {
    background: #ff9800;
  }

  .scenario-button.danger {
    background: #d34f2f;
  }

  .minimal-buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.5rem;
  }

  .minimal-buttons button {
    margin: 0;
  }
</style>