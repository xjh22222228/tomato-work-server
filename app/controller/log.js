'use strict'

const Controller = require('egg').Controller

class LogController extends Controller {
  async index() {
    const { ctx, service } = this

    try {
      ctx.validate({
        pageNo: { type: 'number', required: false, convertType: 'int' },
        pageSize: { type: 'number', required: false, convertType: 'int' },
        startDate: { type: 'string', required: false },
        endDate: { type: 'string', required: false },
        companyId: { type: 'string', required: false },
        logType: { type: 'number', required: false, convertType: 'int' },
      })
    } catch (e) {
      ctx.print = {
        errorCode: 400,
        msg: e.message,
        errorMsg: e
      }
      return
    }

    const result = await service.log.findAllByUid(ctx.query)
    ctx.print = result
  }

  async show() {
    const { ctx, service } = this
    const { id } = ctx.params
    const result = await service.log.findByPk(id)
    ctx.print = result
  }

  async create() {
    const { ctx, service } = this
    const {
      doneContent,
      undoneContent,
      planContent,
      summaryContent,
      companyId,
      logType
    } = ctx.request.body

    try {
      ctx.validate({
        doneContent: { type: 'string' },
        undoneContent: { type: 'string', required: false },
        planContent: { type: 'string' },
        summaryContent: { type: 'string', required: false },
        companyId: { type: 'string', required: true },
        logType: { type: 'number', required: true, convertType: 'int' }
      })
    } catch (e) {
      ctx.print = {
        errorCode: 400,
        msg: e.message,
        errorMsg: e
      }
      return
    }

    const result = await service.log.create({
      doneContent,
      undoneContent,
      planContent,
      summaryContent,
      companyId,
      logType
    })
    ctx.print = {
      msg: '新增成功',
      ...result.toJSON()
    }
  }

  async destroy() {
    const { ctx, service } = this
    const id = ctx.params.id

    const result = await service.log.deleteById(id)
    if (result) {
      ctx.print = {
        msg: '删除成功！',
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
        doneContent: { type: 'string' },
        undoneContent: { type: 'string', required: false },
        planContent: { type: 'string' },
        summaryContent: { type: 'string', required: false },
        companyId: { type: 'string', required: true },
        logType: { type: 'number', required: true, convertType: 'int' }
      })
    } catch (e) {
      ctx.print = {
        errorCode: 400,
        msg: e.message,
        errorMsg: e
      }
      return
    }

    const {
      doneContent,
      undoneContent,
      planContent,
      summaryContent,
      companyId,
      logType
    } = ctx.request.body
    try {
      await service.log.updateById(id, {
        doneContent,
        undoneContent,
        planContent,
        summaryContent,
        companyId,
        logType
      })
      ctx.print = {
        msg: '保存成功！'
      }
    } catch {
      ctx.print = { errorCode: 5 }
    }
  }
}

module.exports = LogController
