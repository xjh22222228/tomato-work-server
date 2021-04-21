'use strict'

const Service = require('egg').Service
const dayjs = require('dayjs')

class ReminderService extends Service {

  /**
   * 检索某个用户事项， 支持分页查询
   * @param {Number} uid
   * @param {Object} [where]
   * @param {Object} [options]
   * @return {Promise}
   */
  async findAllByUid(uid, where, options = {}) {
    const { ctx } = this
    uid = uid || ctx.user.uid
    where = ctx.helper.filterUndefindAndEmptyByObject(where)

    // 处理分页
    if (Number.isNaN(options.offset) || !options.limit) {
      delete options.offset
      delete options.limit
    } else {
      options.offset = options.offset * options.limit
    }

    return ctx.model.Reminder.findAndCountAll({
      where: {
        uid,
        ...where
      },
      raw: true,
      order: [['createdAt', 'DESC']],
      ...options
    })
  }

  /**
   * 新增事项
   * @param {Object} data
   * @return {Promise}
   */
  async create(data) {
    const { ctx } = this
    const uid = ctx.user.uid
    data.uid === undefined && (data.uid = uid)
    return ctx.model.Reminder.create(data)
  }

  /**
   * 删除事项
   * @param {Number} id
   * @return {Promise}
   */
  async deleteById(id) {
    const uid = this.ctx.user.uid
    const ids = String(id).split(',')
    return this.ctx.model.Reminder.destroy({
      where: {
        uid,
        id: { [this.ctx.Op.in]: ids }
      }
    })
  }

  /**
   * 根据条件查询所有数据
   * @param {Object} [where]
   * @return {Promise}
   */
  async findAll(where) {
    return this.ctx.model.Reminder.findAll({ where: { ...where } })
  }

  /**
   * 根据用户ID更新数据
   * @param {Number|Array} [uid]
   * @param {Object} updateFields
   * @param {Object} [where]
   * @return {Promise}
   */
  async updateByUid(uid, updateFields, where) {
    const { ctx } = this
    uid = (ctx.user && ctx.user.uid) || uid

    return ctx.model.Reminder.update(updateFields, {
      where: {
        uid: {
          [ctx.Op.in]: Array.isArray(uid) ? uid : [uid]
        },
        ...where
      }
    })
  }

  /**
   * 根据ID更新数据
   * @param {Number} [id]
   * @param {Object} updateFields
   * @param {Object} [where]
   * @return {Promise}
   */
  async updateById(id, updateFields, where) {
    const { ctx } = this
    const uid = ctx.user.uid
    return ctx.model.Reminder.update(updateFields, {
      where: {
        uid,
        id,
        ...where
      }
    })
  }

  /**
   * 根据id更新类型
   * @param {String|Array} id
   */
  async updateTypeById(id, type) {
    const { ctx } = this
    const ids = String(id).split(',')
    return ctx.model.Reminder.update({ type }, {
      where: {
        id: { [ctx.Op.in]: ids }
      }
    })
  }

  /**
   * 检索所有未提醒事项
   */
  async findAllNotSend() {
    const { ctx, app } = this
    const query = `
      SELECT
      r.content, r.id, u.email, c.server_chan_sckey AS sckey
      FROM reminders AS r, users AS u, user_configures as c
      WHERE r.type = 1 AND u.email != "" AND r.uid = u.uid AND c.uid = r.uid AND r.created_at <= ?
    `

    return ctx.model.query(query, {
      replacements: [dayjs().format('YYYY-MM-DD HH:mm:ss')],
      raw: true,
      type: app.Sequelize.QueryTypes.SELECT
    })
  }
}

module.exports = ReminderService
