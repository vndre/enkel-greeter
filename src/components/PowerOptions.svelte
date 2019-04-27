<script>
  import { onMount } from 'svelte'

  let userOptions = {
    hibernate: lightdm.can_hibernate,
    restart: lightdm.can_restart,
    shutdown: lightdm.can_shutdown,
    suspend: lightdm.can_suspend
  }

</script>

<div>
  <span>heloooo</span>
</div>
