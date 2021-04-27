'use strict'

const Controller = require('egg').Controller

class CompanyController extends Controller {
  async index() {
    const { ctx, service, app } = this

    const result = await service.company.findAllByUid()
    ctx.print = result
  }

  async create() {
    const { ctx, service } = this
    const {
      startDate,
      endDate,
      companyName,
      remark
    } = ctx.request.body

    try {
      ctx.validate({
        startDate: { type: 'date', required: true },
        endDate: { type: 'date', required: true },
        companyName: { type: 'string', required: true, max: 200, trim: true },
        remark: { type: 'string', required: true, max: 1000, trim: true }
      })
    } catch (e) {
      ctx.print = {
        errorCode: 400,
        msg: e.message,
        errorMsg: e
      }
      return
    }

    const result = await service.company.create({
      startDate,
      endDate,
      companyName,
      remark
    })
    ctx.print = {
      msg: '新增成功',
      ...result.toJSON()
    }
  }

  async destroy() {
    const { ctx, service } = this
    const id = ctx.params.id

    const result = await service.company.deleteById(id)
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
        startDate: { type: 'date', required: true },
        endDate: { type: 'date', required: true },
        companyName: { type: 'string', required: true, max: 200, trim: true },
        remark: { type: 'string', required: true, max: 1000, trim: true }
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
      startDate,
      endDate,
      companyName,
      remark
    } = ctx.request.body
    try {
      await service.company.updateById(id, {
        startDate,
        endDate,
        companyName,
        remark
      })
      ctx.print = null
    } catch {
      ctx.print = { errorCode: 5 }
    }
  }
}

module.exports = CompanyController
