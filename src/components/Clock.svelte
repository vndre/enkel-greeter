<script>
  import { onMount, onDestroy } from 'svelte'

  let time = new Date()
  let interval = undefined
  $: hours = time.getHours()
  $: minutes = (time.getMinutes() < 10)
    ? `0${time.getMinutes()}`
    : time.getMinutes()

  onMount(() => {
    interval = setInterval(() => {
      time = new Date()
    }, 3000)
  })

  onDestroy(() => clearInterval(interval))
</script>

<style>
  .clock {
    display: flex;
  }
</style>

<div class='clock'>
  <span>{hours}</span>
  <span>:</span>
  <span>{minutes}</span>
</div>
