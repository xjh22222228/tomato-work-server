'use strict'

const Service = require('egg').Service
const dayjs = require('dayjs')

class TaskService extends Service {

  /**
   * 新增
   * @param {Number} uid
   * @param {Object} data
   * @return {Promise}
   */
  async create(uid, data) {
    const { ctx } = this
    uid = uid || ctx.user.uid
    return ctx.model.Task.create({ uid, ...data })
  }

  /**
   * 用户ID查询所有
   * @param {Object} where
   * @return {Promise}
   */
  async findAllByUid(where) {
    const { ctx } = this
    const uid = ctx.user.uid
    return ctx.model.Task.findAll({
      where: { uid, ...where },
      order: [
        ['createdAt', 'DESC']
      ]
    })
  }

  // 根据id查找某一项
  async findById(id) {
    const { ctx } = this
    return ctx.model.Task.findOne({ where: { id } })
  }

  // 将已过期的任务全部更新为未完成
  async updateAllTodayBeforeType() {
    const { ctx } = this
    return ctx.model.Task.update({
      type: 4
    }, {
      where: {
        createdAt: {
          [ctx.Op.lt]: dayjs().startOf('hour').format('YYYY-MM-DD HH:mm:ss')
        },
        type: {
          [ctx.Op.notIn]: [3, 4]
        }
      }
    })
  }

  // 根据id删除任务
  async deleteById(id) {
    const { ctx } = this
    return ctx.model.Task.destroy({ where: { id } })
  }

  // 根据id更新任务
  async updateDataById(id, data) {
    const { ctx } = this
    return ctx.model.Task.update(data, { where: { id } })
  }
}

module.exports = TaskService
