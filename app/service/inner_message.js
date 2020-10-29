'use strict'

const Service = require('egg').Service
const { MessageTitle } = require('../constants')

class InnerMessage extends Service {

  async create(uid, data, option) {
    const { ctx } = this
    uid = uid || ctx.user.uid
    return ctx.model.InnerMessage.create({ uid, ...data }, option)
  }

  async findAndCountAllByUid(options) {
    const { ctx } = this
    const uid = ctx.user.uid
    let res = await ctx.model.InnerMessage.findAndCountAll({
      where: { uid },
      order: [
        ['createdAt', 'DESC']
      ],
      ...options,
      raw: true
    })

    res.rows = res.rows.map(msg => {
      msg.title = MessageTitle[msg.type]
      return msg
    })

    return res
  }

  /**
   * @param {String} id
   */
  async deleteById(id) {
    const { ctx } = this
    const uid = ctx.user.uid
    id = String(id).split(',')
    return ctx.model.InnerMessage.destroy({ where: {
      uid,
      id: {
        [ctx.Op.in]: id
      }
    } })
  }

  async updateUnRead(id) {
    const { ctx } = this
    const uid = ctx.user.uid
    id = String(id).split(',')
    const where = { uid }

    if (String(id).toLocaleLowerCase() !== 'all') {
      where.id = { [ctx.Op.in]: id }
    }

    return ctx.model.InnerMessage.update({
      hasRead: true
    }, { where })
  }
}

module.exports = InnerMessage
