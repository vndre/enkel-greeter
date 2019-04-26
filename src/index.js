import Login from './components/Login.svelte'
import './fonts.css'

if (process.env.NODE_ENV === 'development') {
  require('./utils/lightDM.dev')
}

const app = new Login({
  target: document.querySelector('main')
})
