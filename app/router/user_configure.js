'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app
  const userRequired = middleware.userRequired()

  router.get('/api/userConfig', userRequired, controller.userConfigure.index)
  router.put('/api/userConfig', userRequired, controller.userConfigure.update)
}
