'use strict'

const Controller = require('egg').Controller

const enumTypeValues = [1, 2]

class CapitalFlowType extends Controller {

  async index() {
    const { ctx, service } = this
    try {
      ctx.validate({
        pageNo: { type: 'int?', convertType: 'int', default: 0 },
        pageSize: { type: 'int?', convertType: 'int', default: Number.MAX_SAFE_INTEGER - 1 },
      }, ctx.query)
    } catch (e) {
      ctx.print = {
        errorCode: 400,
        msg: e.message,
        errorMsg: e
      }
      return
    }

    const { pageNo, pageSize } = ctx.query

    try {
      const result = await service.capitalFlowType.findAllByUid({
        offset: pageNo * pageSize,
        limit: (pageNo + 1) * pageSize
      })
      ctx.print = result
    } catch {
      ctx.print = { errorCode: 2 }
    }
  }

  async create() {
    const { ctx, service } = this

    try {
      ctx.validate({
        name: { type: 'string?', convertType: 'string', min: 1, max: 20 },
        type: { type: 'enum', values: enumTypeValues }
      })
    } catch (e) {
      ctx.print = {
        errorCode: 400,
        msg: e.message,
        errorMsg: e
      }
      return
    }

    const { name, type } = ctx.request.body
    const findResult = await await service.capitalFlowType.findOneByName(name)

    if (findResult) {
      ctx.print = { errorCode: 3, msg: '不可重复创建' }
      return
    }

    try {
      const result = await service.capitalFlowType.create({ name, type })
      ctx.print = result
    } catch {
      ctx.print = { errorCode: 3, msg: '创建失败' }
    }
  }

  async destroy() {
    const { ctx, service } = this
    const id = ctx.params.id

    try {
      const result = await service.capitalFlowType.deleteById(id)
      ctx.print = { ...result, msg: '删除成功' }
    } catch {
      ctx.print = { errorCode: 4 }
    }
  }

  async update() {
    const { ctx, service } = this
    const id = ctx.params.id

    try {
      ctx.validate({
        name: { type: 'string?', convertType: 'string', min: 1, max: 20 },
        type: { type: 'enum', values: enumTypeValues }
      })
    } catch (e) {
      ctx.print = {
        errorCode: 400,
        msg: e.message,
        errorMsg: e
      }
      return
    }

    const { name, type } = ctx.request.body
    const updateFields = { name, type }
    const findResult = await await service.capitalFlowType.findOneByName(name)

    if (findResult && findResult.name === name) {
      if (findResult.type === type) {
        ctx.print = { errorCode: 3, msg: '无变动' }
        return
      }
      delete updateFields.name
    }

    try {
      await service.capitalFlowType.updateById(id, updateFields)
      ctx.print = { msg: '更新成功' }
    } catch {
      ctx.print = { errorCode: 3, msg: '更新失败' }
    }
  }
}

module.exports = CapitalFlowType
