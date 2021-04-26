'use strict'

module.exports = () => {
  // 验证用户是否登录
  return async function(ctx, next) {
    const { user } = ctx
    const token =
      ctx.headers.token ||
      ctx.headers.Authorization ||
      ctx.body?.token

    if (!user || !user.uid) {
      if (token) {
        const existsUser = await ctx.service.user.findUserByToken(token)
        if (existsUser) {
          ctx.login(existsUser)
          return await next()
        }
      }
      ctx.print = {
        errorCode: 401,
        msg: '登录失效，请重新登录'
      }
      return
    }

    await next()
  }
}
