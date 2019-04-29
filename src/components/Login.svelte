<script>
  import { setContext, getContext } from 'svelte'
  import Form from './Form.svelte'
  import PowerOptions from './PowerOptions.svelte'
  import Loading from './Loading.svelte'

  let status = ''
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
    background-image: url('../assets/background.jpg');
    background-size: cover;
  }
  :global(.container__active) {
    box-shadow: var(--shadow-h) !important;
  }
</style>

<Form {status} {update} />
<Loading {status} {update} />
<PowerOptions {status} {update} />
