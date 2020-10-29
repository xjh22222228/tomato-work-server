'use strict'

const Controller = require('egg').Controller

class TodoList extends Controller {
  async index() {
    const { ctx, service } = this
    try {
      ctx.validate({
        pageNo: { type: 'int?', convertType: 'int', default: 0 },
        pageSize: { type: 'int?', convertType: 'int', default: 10 },
        startDate: { type: 'date', default: new Date() },
        endDate: { type: 'date', default: new Date() },
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
    } = ctx.query

    try {
      const result = await service.todoList.findAndCountAllByUid({
        offset: pageNo * pageSize,
        limit: (pageNo + 1) * pageSize,
        startDate,
        endDate,
      })
      ctx.print = result
    } catch {
      ctx.print = { errorCode: 2 }
    }
  }

  async create() {
    const { ctx, service } = this
    const { content } = ctx.request.body

    try {
      const result = await service.todoList.create({ content })
      ctx.print = {
        data: result,
        msg: '创建成功'
      }
    } catch {
      ctx.print = { errorCode: 3, msg: '创建失败' }
    }
  }

  async update() {
    const { ctx, service } = this
    const id = ctx.params.id

    try {
      ctx.validate({
        status: { type: 'enum?', values: [1, 2] }
      })
    } catch (e) {
      ctx.print = {
        errorCode: 400,
        msg: e.message,
        errorMsg: e
      }
      return
    }

    const { content, status } = ctx.request.body
    const data = { content, status }

    if (Number.isInteger(status)) {
      delete data.content
    }

    try {
      await service.todoList.updateById(id, data)
      ctx.print = { msg: '更新成功' }
    } catch (e) {
      ctx.print = {
        errorCode: 400,
        msg: e.message,
        errorMsg: e
      }
    }
  }

  async destroy() {
    const { ctx, service } = this
    const id = ctx.params.id
    await service.todoList.deleteById(id)
    ctx.print = { msg: '删除成功' }
  }
}

module.exports = TodoList
