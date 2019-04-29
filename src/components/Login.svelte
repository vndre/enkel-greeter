<script>
  import { onMount } from 'svelte'
  import Form from './Form.svelte'
  import PowerOptions from './PowerOptions.svelte'
  import Loading from './Loading.svelte'
  require('../assets/background.jpg')

  let status = ''

  onMount(() => {
    fetch('../assets/background.jpg').then((response) => {
      if(response.ok) return response.blob()
      throw new Error('Couldn\'t fetch background')
    }).then(() => {
        const backDiv = document.querySelector('.background')
        backDiv.classList.add('imageReady')
    })
    .catch(function(error) {
      console.error(`Error on fetch(): ${error.message}`);
    })
  })

  function update(value) {
    status = value
  }
</script>

<style>
  :global(:root) {
    --c1: #af66fe;
    --c2: #63e2ff;
    --c3: #04030f;
    --c4: #515065;
    --shadow: 0 14px 28px rgba(4, 3, 15, 0.25),
      0 10px 10px rgba(4, 3, 15, 0.22);
    --shadow-h: 0 19px 38px rgba(4, 3, 15, 0.30),
      0 15px 12px rgba(4, 3, 15, 0.22);
  }
  :global(*) {
    box-sizing: border-box;
  }
  :global(html, body) {
    margin: 0;
    padding: 0;
    font-family: 'Agane Regular', Arial, Helvetica, sans-serif;
    font-size: 14px;
    overflow: hidden;
  }
  :global(main) {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  :global(.container__active) {
    box-shadow: var(--shadow-h) !important;
  }
  :global(.imageReady) {
    opacity: 1 !important;
  }
  .background {
    position: absolute;
    background-image: url('../assets/background.jpg');
    opacity: 0;
    background-size: cover;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: all 300ms ease-in;
  }
</style>

<div class='background' />
<Form {status} {update} />
<Loading {status} {update} />
<PowerOptions {status} {update} />
