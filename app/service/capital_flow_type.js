'use strict'

const Service = require('egg').Service

class CapitalFlowType extends Service {

  async create(data) {
    const { ctx } = this
    const uid = ctx.user.uid
    return ctx.model.CapitalFlowType.create({ uid, ...data })
  }

  async findAllByUid(options) {
    const { ctx } = this
    const uid = ctx.user.uid
    return ctx.model.CapitalFlowType.findAll({
      where: { uid },
      order: [
        ['type', 'DESC']
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
    return ctx.model.CapitalFlowType.destroy({ where: {
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
    return ctx.model.CapitalFlowType.findOne({
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
    return ctx.model.CapitalFlowType.update(updateFields, {
      where: { uid, id }
    })
  }
}

module.exports = CapitalFlowType
