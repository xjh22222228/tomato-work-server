'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  async getUser() {
    const { ctx } = this
    ctx.print = { userInfo: ctx.user }
  }

  async logout() {
    const { ctx } = this
    ctx.logout && ctx.logout()
    ctx.print = { msg: '已登出' }
  }

  // 授权成功回调方法
  async passportSuccessCallback() {
    const { ctx, config } = this
    const user = ctx.user || {}
    const url = config.passportGithub.redirectURL || '/'
    ctx.redirect(`${url}?token=${user.token}`)
  }

  // 通过token登录
  async accessToken() {
    const { ctx } = this
    const token = ctx.query.token
    if (!token) {
      ctx.print = { errorCode: 400, msg: 'token不能为空' }
      return
    }
    const user = await ctx.service.user.findUserByToken(token)
    if (!user) {
      ctx.print = { errorCode: 2, msg: 'token失效' }
      return
    }
    ctx.print = { userInfo: user }
  }

  // 更新用户信息
  async updateUser() {
    const { ctx } = this
    const { password } = ctx.request.body
    const uid = ctx.user.uid
    if (!password) {
      ctx.print = { errorCode: 400 }
      return
    }
    try {
      const userInfo = await ctx.service.user.updateUser(uid, { password })
      ctx.print = { msg: '更新成功', userInfo: userInfo }
    } catch {
      ctx.print = { errorCode: 3, msg: '更新失败' }
    }
  }
}

module.exports = UserController
