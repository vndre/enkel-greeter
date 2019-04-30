const debugMessage = message => console.log(`%c${message}`, 'background: #222; color: #bada55')

window.lightdm = {
  is_authenticated: false,
  authentication_user: undefined,
  default_session: 'i3wm',
  can_hibernate: false,
  can_restart: true,
  can_shutdown: true,
  can_suspend: true,
  hostname: 'Arch',
  sessions: [
    {
        name: 'KDE 5',
        key: 'plasma-shell'
    },
    {
        name: 'Gnome 3',
        key: 'gnome-shell'
    },
    {
        name: 'XFCE 4',
        key: 'xfce'
    },
    {
        name: 'Cinnamon',
        key: 'cinnamon'
    },
    {
        name: 'i3wm',
        key: 'i3'
    }
  ],
  users: [
    {
      display_name: 'Any Rita',
      username: 'annri'
    },
    {
      display_name: 'John Cena',
      username: 'JCyeaah'
    }
  ],
  languages: [
    {
      name: 'American English',
      code: 'en_US.utf8'
    },
    {
      name: 'Français',
      code: 'fr_FR.utf8'
    }
  ],
  language: 'American English',
  authenticate: (username) => {
    debugMessage(`lightdm.authenticate('${username}')`)
    lightdm.authentication_user = username
    show_prompt('Password: ', 'password')
  },
  cancel_authentication: () => {
    debugMessage('lightdm.cancel_authentication()')
  },
  respond: (value) => {
    debugMessage(`lightdm.respond('${value}')`)
    if (value === 'testing') {
      lightdm.is_authenticated = true
    }
    setTimeout(() => authentication_complete(), 2000)
  },
  start_session: (session) => {
    debugMessage(`lightdm.start_session('${session}')`)
  },
  login: (user, session) => debugMessage(`Logged in with: user = ${user}, session = ${session}`),
  shutdown: () => debugMessage('lightdm.shutdown()'),
  suspend: () => debugMessage('lightdm.suspend()'),
  restart: () => debugMessage('lightdm.restart()')
}
