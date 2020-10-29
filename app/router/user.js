'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware, config } = app
  const userRequired = middleware.userRequired()

  const localStrategy = app.passport.authenticate('local', {
    successReturnToOrRedirect: false,
    successRedirect: false,
  })
  const github = app.passport.authenticate('github', {
    successRedirect: config.passportGithub.successRedirect,
    failureRedirect: config.passportGithub.failureRedirect,
  })

  router.get('/api/passport/github/callback', github)
  router.get('/api/passport/github/success', controller.user.passportSuccessCallback)
  router.post('/api/passport/local', localStrategy)

  router.get('/api/user', userRequired, controller.user.getUser)
  router.get('/api/logout', userRequired, controller.user.logout)
  router.get('/api/accessToken', controller.user.accessToken)
  router.post('/api/user/update', userRequired, controller.user.updateUser)
}
