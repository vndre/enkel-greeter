<script>
  import { beforeUpdate } from 'svelte'
  import { fade } from 'svelte/transition'
  import { quadInOut } from 'svelte/easing'
  import loadingBarSVG from '../assets/icons/loading-bar.svg'

  export let isIdle
  let message = 'signing in'

  $: console.log('isIdle', isIdle)
</script>

<style>
  .loader {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 100;
  }
  .loader img {
    width: 75px;
  }
  .loader span {
    font-size: 1.6em;
    font-style: italic;
    color: var(--c3);
  }
</style>

{#if isIdle === false}
  <div
    class='loader'
    transition:fade={{ easing: quadInOut }}
  >
    <img src={loadingBarSVG} alt='loading' />
    <span>{message}</span>
  </div>
{/if}
