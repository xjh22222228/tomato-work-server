'use strict'

const Service = require('egg').Service
const { messageType } = require('../constants')

class UserService extends Service {

  /**
   * 注册用户 - 启用事务
   * @param {Object} - user
   * @return {Promise}
   */
  async register(user) {
    const { ctx, service } = this
    const result = await ctx.model.transaction(async t => {
      const [userRes] = await Promise.all([
        ctx.model.User.create(user, { transaction: t }),
        service.userConfigure.create({ uid: user.uid }, { transaction: t }),
        service.innerMessage.create(user.uid, messageType.system.welcome, { transaction: t })
      ])

      return userRes
    })

    service.mail.register(user.loginName)

    return result
  }

  /**
   * 账号密码登录
   * @param {Object} - data
   * @return {Promise}
   */
  async findUserByLocal(data) {
    const { ctx } = this
    return ctx.model.User.findOne({
      exclude: ['password'],
      where: {
        loginName: data.loginName,
        password: data.password
      }
    })
  }

  /**
   * 通过用户ID查找用户
   * @param {Number} - uid
   * @return {Promise}
   */
  async findUserByUid(uid) {
    const { ctx } = this
    return ctx.model.User.findOne({
      exclude: ['password'],
      where: { uid }
    })
  }

  /**
   * 通过token查找用户
   * @param {String} - token
   * @return {Promise}
   */
  async findUserByToken(token) {
    const { ctx } = this
    return ctx.model.User.findOne({
      exclude: ['password'],
      where: { token }
    })
  }

  /**
   * 通过用户ID更新用户信息
   * @param {Number} - uid
   * @param {Object} - data
   * @return {Promise}
   */
  async updateUser(uid, data) {
    const { ctx } = this
    return ctx.model.User.update(data, {
      where: { uid }
    })
  }

  /**
   * 通过uid查找用户email
   * @param {Number|Array} - uid
   * @return {Promise}
   */
  async findEmailByUid(uid) {
    const { ctx } = this
    return ctx.model.User.findAll({
      attributes: ['email'],
      where: {
        uid: {
          [ctx.Op.in]: Array.isArray(uid) ? uid : [uid]
        }
      },
      raw: true
    })
  }
}

module.exports = UserService
