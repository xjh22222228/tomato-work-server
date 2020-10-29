'use strict'

const Controller = require('egg').Controller

class InnerMessage extends Controller {
  async index() {
    const { ctx, service } = this

    const { pageNo = 0, pageSize = 20 } = ctx.query

    const query = {
      offset: pageNo * pageSize,
      limit: Number(pageNo + 1) * pageSize
    }

    const result = await service.innerMessage.findAndCountAllByUid(query)
    ctx.print = result
  }

  async update() {
    const { ctx, service } = this
    const id = ctx.params.id

    await service.innerMessage.updateUnRead(id)
    ctx.print = { msg: '已标记已读' }
  }
}

module.exports = InnerMessage
