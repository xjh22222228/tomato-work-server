'use strict'

const Service = require('egg').Service

class BillType extends Service {
  async create(data) {
    const { ctx } = this
    const uid = ctx.user.uid
    return ctx.model.BillType.create({ uid, ...data })
  }

  async findAllByUid(options) {
    const { ctx } = this
    const uid = ctx.user.uid
    return ctx.model.BillType.findAll({
      where: { uid },
      order: [['type', 'DESC']],
      ...options,
    })
  }

  /**
   * @param {String} id
   */
  async deleteById(id) {
    const { ctx } = this
    const uid = ctx.user.uid
    id = String(id).split(',')
    return ctx.model.BillType.destroy({
      where: {
        uid,
        id: {
          [ctx.Op.in]: id,
        },
      },
    })
  }

  /**
   * @param {String} name
   */
  async findOneByName(name) {
    const { ctx } = this
    const uid = ctx.user.uid
    return ctx.model.BillType.findOne({
      where: { name, uid },
    })
  }

  /**
   * @param {String} id
   * @param {Object} updateFields
   */
  async updateById(id, updateFields) {
    const { ctx } = this
    const uid = ctx.user.uid
    return ctx.model.BillType.update(updateFields, {
      where: { uid, id },
    })
  }
}

module.exports = BillType
