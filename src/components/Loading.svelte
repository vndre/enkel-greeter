<script>
  import { beforeUpdate } from 'svelte'
  import { fade } from 'svelte/transition'
  import { quadInOut } from 'svelte/easing'
  import loadingBarSVG from '../assets/icons/loading-bar.svg'

  export let status
  export let update
  let message = ''

  beforeUpdate(() => {
    switch (status) {
      case 'hibernate':
        message = 'hibernating'
        break
      case 'restart':
        message = 'restarting'
        break
      case 'shutdown':
        message = 'shutting down'
        break
      case 'suspend':
        message = 'suspending'
        break
      default:
        message = 'signing in'
        break
    }
  })

</script>

<style>
  .loader {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
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

{#if status && status !== 'idle'}
  <div
    class='loader'
    transition:fade={{ easing: quadInOut }}
  >
    <img src={loadingBarSVG} alt='loading' />
    <span>{message}</span>
  </div>
{/if}
