<script>
  import { onMount } from 'svelte'
  import Clock from './Clock.svelte'

  let userOptions = {
    hibernate: lightdm.can_hibernate,
    restart: lightdm.can_restart,
    shutdown: lightdm.can_shutdown,
    suspend: lightdm.can_suspend
  }
</script>

<style>
  div {
    display: flex;
    color: white;
    font-family: monospace;
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0 20px 20px 0;
    user-select: none;
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

<div>
  {#each Object.keys(userOptions) as option, index}
    {#if userOptions[option]}
      <span class='action'>{Object.keys(userOptions)[index]}</span>
      <span class='divider'>—</span>
    {/if}
  {/each}
  <Clock />
</div>
