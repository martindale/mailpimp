module.exports = {
  service: {
    name: 'MailPimp',
    icon: 'mail',
    namespace: 'mailpimp',
    mission: 'Self-hosted mailing lists.',
    description: 'Don\'t trust a third company to manage your mailing lists?  Suspect them analyzing your data without giving you a cut?',
    source: 'https://github.com/martindale/maki',
    points: [
      {
        header: 'Secure mailer.',
        description: 'No more need to trust some third party with your emails.  Roll it on your own.'
      },
      {
        header: 'Simple is beautiful.',
        description: 'Rethought, cleaned, and very direct.  No cruft from supporting legacy crap.'
      },
      {
        header: 'Already registered?',
        description: 'Go on then.  Get logged in.  You\'re _groovy_.',
        action: {
          text: 'Log In &raquo;',
          link: '/sessions'
        }
      }
    ],
  },
  database: {
    name: 'mailpimp'
  },
  mail: {
    host: 'localhost',
    user: 'username',
    pass: 'password',
    ssl: true
  }
}
