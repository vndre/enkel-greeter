<script>
  import { fly, fade } from 'svelte/transition'
  import { quadInOut } from 'svelte/easing'
  import Clock from './Clock.svelte'

  export let isIdle

  let userOptions = {
    hibernate: lightdm.can_hibernate,
    restart: lightdm.can_restart,
    shutdown: lightdm.can_shutdown,
    suspend: lightdm.can_suspend
  }

  function executeAction(option) {
    lightdm[option]()
  }
</script>

<style>
  div {
    display: flex;
    color: var(--c3);
    font-family: monospace;
    position: absolute;
    top: 0;
    right: 0;
    padding: 20px 20px 0 0;
    user-select: none;
    z-index: 100;
  }
  .action {
    cursor: pointer;
    opacity: 0.5;
    transition: all 300ms ease-in-out;
  }
  .action:hover {
    opacity: 1;
  }
  .divider {
    margin: 0 10px;
  }
</style>

{#if isIdle}
  <div
    in:fly={{ delay: 200, y: 20, easing: quadInOut }}
    out:fade
  >
    {#each Object.keys(userOptions) as option, index}
      {#if userOptions[option]}
        <span
          class='action'
          on:click={() => executeAction(Object.keys(userOptions)[index])}
        >
          {Object.keys(userOptions)[index]}
        </span>
        <span class='divider'>—</span>
      {/if}
    {/each}
    <Clock />
  </div>
{/if}