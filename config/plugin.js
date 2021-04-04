'use strict'

/** @type Egg.EggPlugin */
module.exports = {
  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },
  passport: {
    enable: true,
    package: 'egg-passport',
  },
  passportGithub: {
    enable: true,
    package: 'egg-passport-github',
  },
  passportLocal: {
    enable: true,
    package: 'egg-passport-local',
  },
  mailer: {
    enable: true,
    package: 'egg-mailer',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  crypto: {
    enable: true,
    package: 'egg-crypto',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  }
}
