import Login from './components/Login.svelte'

const app = new Login({
  target: document.querySelector('main'),
  data: {
    quotes: []
  },
})
