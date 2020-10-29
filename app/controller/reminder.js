'use strict'

const Controller = require('egg').Controller

class ReminderController extends Controller {
  async index() {
    const { ctx, service, app } = this

    try {
      ctx.validate({
        pageSize: { type: 'number', convertType: 'number', required: false, default: 0 },
        pageNo: { type: 'number', convertType: 'number', required: false, default: 10 },
        startDate: { type: 'date', required: false, default: new Date() },
        endDate: { type: 'date', required: false, default: new Date() },
      }, ctx.query)
    } catch (e) {
      ctx.print = {
        errorCode: 400,
        msg: e.message,
        errorMsg: e
      }
      return
    }

    const {
      pageSize,
      pageNo,
      startDate,
      endDate,
      type
    } = ctx.query

    try {
      const where = {
        type: Number(type) || undefined,
        [ctx.Op.and]: [
          app.Sequelize.where(
            app.Sequelize.fn('DATE', app.Sequelize.col('created_at')),
            '<=',
            endDate
          ),
          app.Sequelize.where(
            app.Sequelize.fn('DATE', app.Sequelize.col('created_at')),
            '>=',
            startDate
          )
        ]
      }
      const result = await service.reminder.findAllByUid(null, where, {
        limit: pageSize,
        offset: pageNo
      })

      ctx.print = result
    } catch (err) {
      ctx.logger.error(err)
      ctx.print = { errorCode: 2 }
    }
  }

  async create() {
    const { ctx, service } = this
    const { date, content } = ctx.request.body

    try {
      ctx.validate({
        date: { type: 'dateTime', required: true },
        content: { type: 'string', required: true, max: 200, trim: true }
      })
    } catch (e) {
      ctx.print = {
        errorCode: 400,
        msg: e.message,
        errorMsg: e
      }
      return
    }

    const result = await service.reminder.create({
      createdAt: date,
      content
    })
    ctx.print = {
      msg: '新增成功',
      ...result.toJSON()
    }
  }

  async destroy() {
    const { ctx, service } = this
    const id = ctx.params.id

    const result = await service.reminder.deleteById(id)
    if (result) {
      ctx.print = {
        msg: '删除成功',
        data: result
      }
    } else {
      ctx.print = { errorCode: 4 }
    }
  }

  async update() {
    const { ctx, service } = this
    const id = ctx.params.id

    try {
      ctx.validate({
        date: { type: 'datetime', convertType: 'string', required: false },
        type: { type: 'number', convertType: 'number', required: false },
        content: { type: 'string', min: 0, max: 200, required: false },
      })
    } catch (e) {
      ctx.print = {
        errorCode: 400,
        msg: e.message,
        errorMsg: e
      }
      return
    }

    const { date, content, type } = ctx.request.body
    try {
      await service.reminder.updateById(id, {
        createdAt: date,
        content,
        type
      })
      ctx.print = null
    } catch {
      ctx.print = { errorCode: 5 }
    }
  }
}

module.exports = ReminderController
