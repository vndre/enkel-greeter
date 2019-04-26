const debugMessage = message => console.log(`%c${message}`, `color:blue`)

window.lightdm = {
  is_authenticated: false,
  authentication_user: undefined,
  default_session: 'openbox',
  can_hibernate: true,
  can_restart: true,
  can_shutdown: true,
  can_suspend: true,
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
    debugMessage(`%clightdm.authenticate('${username}')`)
    lightdm.authentication_user = username
  },
  cancel_authentication: () => {
    debugMessage('%clightdm.cancel_authentication()')
  },
  respond: (value) => {
    debugMessage(`%clightdm.respond('${value}')`)
    if (password === 'testing') {
      lightdm.is_authenticated = true
    }
    authentication_complete()
  },
  login: (user, session) => debugMessage(`Logged in with: user = ${user}, session = ${session}`),
  shutdown: () => debugMessage('lightdm.shutdown()'),
  suspend: () => debugMessage('lightdm.suspend()'),
  restart: () => debugMessage('lightdm.restart()')
}
