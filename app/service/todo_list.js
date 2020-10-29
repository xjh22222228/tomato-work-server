'use strict'

const Service = require('egg').Service

class TodoList extends Service {

  async create(data) {
    const { ctx } = this
    const uid = ctx.user.uid
    return ctx.model.TodoList.create({ uid, ...data })
  }

  async findAndCountAllByUid(options = {}) {
    const { ctx, app } = this
    const uid = ctx.user.uid
    return ctx.model.TodoList.findAndCountAll({
      where: {
        [ctx.Op.and]: [
          app.Sequelize.where(
            app.Sequelize.fn('DATE', app.Sequelize.col('created_at')),
            '<=',
            options.endDate
          ),
          app.Sequelize.where(
            app.Sequelize.fn('DATE', app.Sequelize.col('created_at')),
            '>=',
            options.startDate
          )
        ],
        uid,
      },
      order: [
        ['createdAt', 'DESC']
      ],
      ...options
    })
  }

  // 检索所有未完成的数据
  async findUnfinishedByUid(options) {
    const { ctx } = this
    const uid = ctx.user.uid
    return ctx.model.TodoList.findAndCountAll({
      where: {
        status: 1,
        uid,
      },
      order: [
        ['createdAt', 'DESC']
      ],
      ...options
    })
  }

  /**
   * @param {String} id
   */
  async deleteById(id) {
    const { ctx } = this
    const uid = ctx.user.uid
    id = String(id).split(',')
    return ctx.model.TodoList.destroy({ where: {
      uid,
      id: {
        [ctx.Op.in]: id
      }
    } })
  }

  /**
   * @param {String} name
   */
  async findOneByName(name) {
    const { ctx } = this
    const uid = ctx.user.uid
    return ctx.model.TodoList.findOne({
      where: { name, uid }
    })
  }

  /**
   * @param {String} id
   * @param {Object} updateFields
   */
  async updateById(id, updateFields) {
    const { ctx } = this
    const uid = ctx.user.uid
    return ctx.model.TodoList.update(updateFields, {
      where: { uid, id }
    })
  }
}

module.exports = TodoList
