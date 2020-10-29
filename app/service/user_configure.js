'use strict'

const Service = require('egg').Service

class UserConfigureService extends Service {

  /**
   * 根据用户ID获取用户配置信息
   * @param {Number} [uid]
   * @return {Promise}
   */
  async findUserConfigByUid(uid) {
    const { ctx } = this
    uid = uid || ctx.user.uid
    return ctx.model.UserConfigure.findOne({
      attributes: { exclude: ['id', 'uid', 'createdAt', 'updatedAt'] },
      where: { uid }
    })
  }

  /**
   * 创建用户配置表
   * @param {Object} data
   * @param {Object} [options]
   * @return {Promise}
   */
  async create(data, options) {
    const { ctx } = this
    return ctx.model.UserConfigure.create(data, options)
  }

  /**
   * 更新用户配置表
   * @param {Number} uid
   * @param {Object} data
   * @return {Promise}
   */
  async update(uid, data) {
    const { ctx } = this
    uid = uid || ctx.user.uid
    return ctx.model.UserConfigure.update(data, {
      where: { uid }
    })
  }
}

module.exports = UserConfigureService
