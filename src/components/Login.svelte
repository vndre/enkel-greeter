<script>
  import { onMount } from 'svelte'
  import rightArrowSVG from '../assets/icons/right-arrow.svg'

  let error = undefined
  let userSessions = []

  onMount(() => {
    userSessions = lightdm.sessions
    console.log('userSessions', userSessions)
  })

  function handleLogin() {
    document.getElementById('l').blur()
    const { value: user } = document.getElementById('u-n')
    const { value: secret } = document.getElementById('u-s')

    if (user === '' || secret === '') {
      if (user === '' && secret === '') error = 'missing username/password'
      else if (user === '') error = 'missing username'
      else error = 'missing password'
      return
    }
  }

  function focusContainer() {
    error = error && undefined
    document.querySelector('.login-container').classList.toggle('login-container__active')
  }


let password;
let errorCB;
let completeCB;

/*
window.lightdm_login = (username, pass, cb, errCB) => {
    completeCB = cb;
    errorCB = errCB;
    password = pass;

    lightdm.start_authentication(username);
};

window.lightdm_start = (desktop) => {
    lightdm.login(lightdm.authentication_user, desktop);
};

window.show_prompt = (text, type) => {
    if (text === "Password: ")
    {
        lightdm.respond(password);
    }
};

window.authentication_complete = () => {
    if (lightdm.is_authenticated) {
        completeCB();
    } else {
        lightdm.cancel_authentication();
        errorCB('Invalid username/password');
    }
};

window.show_message = (text, type) => {
    errorCB(text);
};
*/

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
  :global(html, body) {
    margin: 0;
    padding: 0;
    background: #363946;
    font-family: 'Agane Regular', Arial, Helvetica, sans-serif;
    font-size: 14px;
  }
  :global(main) {
    height: 100%;
    display: flex;
  }
  :global(.login-container__active) {
    box-shadow: var(--shadow-h) !important;
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
  ::placeholder {
    color: var(--c4);
  }
  .login-container {
    background: var(--c3);
    max-width: 700px;
    min-width: 300px;
    max-height: 500px;
    margin: auto;
    padding: 40px;
    border-radius: 8px;
    box-shadow: var(--shadow);
    transition: all 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
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
  }
  h1 {
    color: white;
    letter-spacing: 2px;
    margin: 0 0 20px 0;
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
    align-self: flex-end;
    color: white;
    font-size: 2em;
    margin-top: 20px;
    transition: all 300ms cubic-bezier(0.39, 0.575, 0.565, 1);
  }
  button:hover, button:focus {
    box-shadow: 0 3px 6px rgba(175, 102, 254, 0.16),
      0 3px 6px rgba(175, 102, 254, 0.23);
  }
  .bottom {
    display: flex;
  }
  .bottom > button {
    margin-left: auto;
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
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjNTE1MDY1IiBkPSJNOC43MSAxMS43MWwyLjU5IDIuNTljLjM5LjM5IDEuMDIuMzkgMS40MSAwbDIuNTktMi41OWMuNjMtLjYzLjE4LTEuNzEtLjcxLTEuNzFIOS40MWMtLjg5IDAtMS4zMyAxLjA4LS43IDEuNzF6Ii8+PC9zdmc+);
    background-repeat: no-repeat, repeat;
    background-position: left;
    background-size: contain;
  }
  .session-list option {
    background: var(--c3);
    font-size: 1em;
  }
</style>

<div
  class='login-container'
  on:focusin={focusContainer}
  on:focusout={focusContainer}
>
  <h1>Welcome</h1>
  <form 
    on:submit|preventDefault={handleLogin}
    autocomplete='off'
  >
    <div class='form-group'>
      <input
        id='u-n'
        type=text
        placeholder='username'
      />
      <span />
    </div>
    <div class='form-group'>
      <input
        id='u-s'
        type=password
        placeholder='password'
      />
      <span />
    </div>
    {#if error !== undefined}
      <div class='error-group'>
        <p>{error}</p>
      </div>
    {/if}
    <div class='bottom'>
      <div class='session'>
        <span>session:</span>
        <select class='session-list'>
          {#each userSessions as session}
            <option>{session.name}</option>
          {/each}
        </select>
      </div>
      <button id='l'>
        <img src={rightArrowSVG} alt='login' />
      </button>
    </div>
  </form>
</div>
