const validator = require('validator')

module.exports = class App {
  constructor(app) {
    this.app = app
  }

  passport() {
    const app = this.app
    const localHandler = async (ctx, { username, password }) => {
      const loginName = username
      try {
        if (!loginName || !password || !validator.isMD5(password)) {
          throw new Error()
        }
      } catch {
        ctx.print = { errorCode: 422 }
        return {}
      }
      const user = await ctx.service.user.findUserByLocal({
        loginName,
        password
      })
      if (!user) {
        ctx.print = {
          errorCode: 2,
          msg: '账号或密码错误'
        }
        return {}
      }
      ctx.print = { userInfo: user }
      return user
    }

    const githubHandler = async (ctx, user) => {
      user = Object.assign({}, user, { _profile: user.profile._json })
      const userInfo = {
        uid: Number(user.id),
        provider: user.provider,
        loginName: user.name,
        username: user.displayName,
        token: user.accessToken,
        avatarUrl: user._profile.avatar_url,
        location: user._profile.location,
        bio: user._profile.bio,
        email: user._profile.email,
        ipAddr: ctx.realIP,
        password: ctx.crypto.MD5('123456').toString()
      }

      // 过滤字段
      for (let k in userInfo) {
        if (!userInfo[k]) {
          delete userInfo[k]
        }
      }

      // 从数据库中查找用户信息
      const existsUser = await ctx.service.user.findUserByUid(userInfo.uid)
      if (existsUser) {
        // 更新用户信息
        delete userInfo.password
        await ctx.service.user.updateUser(userInfo.uid, userInfo)
        return await ctx.service.user.findUserByUid(userInfo.uid)
      }

      // 注册新用户
      const newUser = await ctx.service.user.register(userInfo)
      return newUser
    }

    app.passport.verify(async (ctx, user) => {
      const handler = user.provider === 'github' ? githubHandler : localHandler
      try {
        const existUser = await handler(ctx, user)
        return existUser
      } catch (err) {
        app.logger.error(err)
        return null
      }
    })

    // 将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段
    app.passport.serializeUser(async (ctx, user) => {
      return user
    })

    // 反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
    app.passport.deserializeUser(async (ctx, user) => {
      return user
    })
  }

  async willReady() {
    const app = this.app

    // 同步数据库
    await app.model.sync().then(() => {
      app.logger.info('Sync Tables...')
    }).catch(err => {
      app.logger.error(err)
    })

    // 执行授权
    this.passport()
  }
}
