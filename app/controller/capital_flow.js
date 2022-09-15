'use strict'

const Controller = require('egg').Controller

class CapitalFlow extends Controller {

  async index() {
    const { ctx, service } = this
    try {
      ctx.validate({
        pageNo: { type: 'int?', convertType: 'int', default: 0 },
        pageSize: { type: 'int?', convertType: 'int', default: 30 },
        startDate: { type: 'date?', default: new Date(1970, 1, 1) },
        // 希望能活到今日，并且能看到此时写的代码
        endDate: { type: 'date?', default: new Date(2099, 12, 28) },
        sort: { type: 'string?', default: 'createdAt-desc' }
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
      pageNo,
      pageSize,
      startDate,
      endDate,
      typeNameId,
      type,
      keyword,
      sort,
    } = ctx.query

    try {
      const result = await service.capitalFlow.findAndCountAllByUid({
        offset: pageNo * pageSize,
        limit: pageSize,
        sort: sort.split('-'),
        startDate,
        endDate,
        typeNameId,
        type,
        keyword,
      })
      ctx.print = result
    } catch (e) {
      ctx.logger.error(e)
      ctx.print = { errorCode: 2 }
    }
  }

  async create() {
    const { ctx, service } = this

    try {
      ctx.validate({
        date: { type: 'datetime' },
        typeId: { type: 'string' },
        price: { type: 'number' },
        remark: { type: 'string?', min: 0, max: 250 },
        imgs: { type: 'string?', default: '' },
      }, ctx.request.body)
    } catch (e) {
      ctx.print = {
        errorCode: 400,
        msg: e.message,
        errorMsg: e
      }
      return
    }

    const { date, typeId, price, remark, imgs } = ctx.request.body

    try {
      const result = await service.capitalFlow.create({
        createdAt: date,
        typeId,
        price,
        remark,
        imgs
      })
      ctx.print = {
        ...result,
        msg: '创建成功'
      }
    } catch {
      ctx.print = { errorCode: 3, msg: '创建失败' }
    }
  }

  async show() {
    const { ctx, service } = this
    const { id } = ctx.params
    const result = await service.capitalFlow.findByPk(id)
    ctx.print = result
  }

  async destroy() {
    const { ctx, service } = this
    const id = ctx.params.id

    const result = await service.capitalFlow.deleteById(id)
    ctx.print = {
      ...result,
      msg: '删除成功'
    }
  }

  async update() {
    const { ctx, service } = this
    const id = ctx.params.id

    try {
      ctx.validate({
        date: { type: 'datetime' },
        typeId: { type: 'string' },
        price: { type: 'number' },
        remark: { type: 'string?', min: 0, max: 250 },
        imgs: { type: 'string?', default: '' }
      }, ctx.request.body)
    } catch (e) {
      ctx.print = {
        errorCode: 400,
        msg: e.message,
        errorMsg: e
      }
      return
    }

    const { date, typeId, price, remark, imgs } = ctx.request.body

    try {
      const result = await service.capitalFlow.updateById(id, {
        createdAt: date,
        typeId,
        price,
        remark,
        imgs
      })
      ctx.print = {
        ...result,
        msg: '保存成功'
      }
    } catch {
      ctx.print = {
        errorCode: 5,
        msg: '更新失败'
      }
    }
  }

  // 统计金额
  async sumAmount() {
    const { ctx, service } = this
    const { startDate, endDate } = ctx.query

    try {
      const result = await service.capitalFlow.findSumPriceByDate(startDate, endDate)
      ctx.print = result
    } catch {
      ctx.print = { errorCode: 2 }
    }
  }

  // 统计金额分组
  async amountGroup() {
    const { ctx, service } = this
    const { startDate, endDate } = ctx.query

    const result = await service.capitalFlow.findAmountGroup(startDate, endDate)
    ctx.print = result
  }
}

module.exports = CapitalFlow
