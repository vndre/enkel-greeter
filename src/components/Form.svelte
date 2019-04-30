<script>
  import { onMount } from 'svelte'
  import { fly, fade } from 'svelte/transition'
  import { quadInOut } from 'svelte/easing'
  import rightArrowSVG from '../assets/icons/right-arrow.svg'

  export let isIdle
  export let toggleIdle
  export let logIn
  let error
  let selectedSession

  const lightdm = window.lightdm || {}

  onMount(() => {
    toggleIdle()
    if (lightdm.default_session !== 'default') {
      lightdm.sessions.find(s => s.name === lightdm.default_session)
    } else {
      selectedSession = lightdm.sessions[0]
    }
  })

  function focusContainer() {
    document.querySelector('.container')
      .classList
      .toggle('container__active')
  }

  function clearError() {
    error = undefined
  }

  function handleLogin() {
    document.querySelector('#login-btn').blur()
    const { value: user } = document.querySelector('#user-name')
    const { value: secret } = document.querySelector('#user-secret')
    
    if (!user || !secret) {
      if (!user && !secret) error = 'missing username and password'
      else if (!user) error = 'missing username'
      else error = 'missing password'
      return
    }
    lightdm.authenticate(user)
    toggleIdle()
  }

  window.show_prompt = (text, type) => {
    const { value: secret } = document.querySelector('#user-secret')
    if (type === 'password') {
      lightdm.respond(secret)
    }
  }

  window.authentication_complete = () => {
      if (lightdm.is_authenticated) {
        lightdm.login(lightdm.authentication_user, selectedSession.name.toLowerCase())
        logIn()
      }
      else {
        toggleIdle()
        error = 'Invalid username/password'
      }
  }

  window.show_message = (text) => {
    error = text
  }
</script>

<style>
  ::placeholder {
    color: var(--c4);
  }
  .container {
    background: var(--c3);
    width: 100%;
    max-width: 400px;
    min-width: 300px;
    max-height: 500px;
    margin: 50px;
    padding: 40px;
    border-radius: 8px;
    box-shadow: var(--shadow);
    transition: all 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
    user-select: none;
    z-index: 100;
  }
  h1 {
    color: white;
    letter-spacing: 2px;
    margin: 0 0 20px 0;
  }
  input {
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    color: white;
    padding: 8px;
    width: 100%;
    z-index: 100;
    position: relative;
  }
  form {
    display: flex;
    flex-direction: column;
    margin: 0;
  }
  .form-group {
    position: relative;
    margin-bottom: 20px;
  }
  .form-group > span {
    position: absolute;
    width: 100%;
    border-radius: 6px;
    top: 95%;
    bottom: 0;
    left: 0;
    background: var(--c1);
    background: linear-gradient(45deg, var(--c1) 0%, var(--c2) 100%);
    transition: all 300ms cubic-bezier(0.785, 0.135, 0.15, 0.86);
    z-index: 1;
  }
  .form-group > input:focus + span {
    top: 0;
  }
  .error-group {
    text-align: center;
    color: #74F8F8;
    font-style: italic;
    position: relative;
    overflow: hidden;
    transition: all 300ms ease-in-out;
  }
  .error-group p {
    margin: 10px 0;
    position: absolute;
    left: 0;
    right: 0;
  }
  button {
    border-radius: 50%;
    background: var(--c1);
    background: linear-gradient(45deg, var(--c1) 0%, var(--c2) 100%);
    border: none;
    width: 40px;
    height: 40px;
    box-shadow: 0 10px 20px rgba(175, 102, 254, 0.19),
      0 6px 6px rgba(175, 102, 254, 0.23);
    cursor: pointer;
    padding: 10px;
    margin-left: auto;
    color: white;
    transition: all 300ms cubic-bezier(0.39, 0.575, 0.565, 1);
  }
  button:hover, button:focus {
    box-shadow: 0 3px 6px rgba(175, 102, 254, 0.16),
      0 3px 6px rgba(175, 102, 254, 0.23);
  }
  .bottom {
    display: flex;
    margin-top: 20px;
  }
  .session {
    display: flex;
    align-items: flex-end;
  }
  .session > span {
    color: var(--c4);
    margin-right: 2px;
  }
  .session-list {
    color: var(--c4);
    box-sizing: border-box;
    margin: 0;
    padding-left: 15px;
    border: none;
    -webkit-appearance: none;
    background-color: transparent;
    background-image: url('../assets/icons/dropdown-arrow.svg');
    background-repeat: no-repeat;
    background-position: left;
    background-size: contain;
    cursor: pointer;
  }
  .session-list option {
    background: var(--c3);
    font-size: 1em;
  }
</style>

{#if isIdle}
  <div
    class='container'
    on:focusin={focusContainer}
    on:focusout={focusContainer}
    in:fly={{ y: 40, easing: quadInOut }}
    out:fade
  >
    <h1>{lightdm.hostname || `welcome`}</h1>
    <form
      on:submit|preventDefault={handleLogin}
      autocomplete='off'
    >
      <div class='form-group'>
        <input
          id='user-name'
          type=text
          placeholder='username'
          on:focus={clearError}
        />
        <span />
      </div>
      <div class='form-group'>
        <input
          id='user-secret'
          type=password
          placeholder='password'
          on:focus={clearError}
        />
        <span />
      </div>
      <div
        id='error-message'
        class="error-group {error ? 'show-error' : 'hide-error'}"
      >
        <p>{error || ''}</p>
      </div>
      <div class='bottom'>
        <div class='session'>
          <span>session:</span>
          <select
            class='session-list'
            bind:value={selectedSession}
          >
            {#each lightdm.sessions as session}
              <option value={session}>{session.name}</option>
            {/each}
          </select>
        </div>
        <button id='login-btn'>
          <img src={rightArrowSVG} alt='login' />
        </button>
      </div>
    </form>
  </div>
{/if}
