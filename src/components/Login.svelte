<script>
  import Form from './Form.svelte'
  import PowerOptions from './PowerOptions.svelte'


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
  :global(*) {
    box-sizing: border-box;
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
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  :global(.container__active) {
    box-shadow: var(--shadow-h) !important;
  }

</style>

<Form />
<PowerOptions/>
