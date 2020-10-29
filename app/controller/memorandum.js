'use strict'

const Controller = require('egg').Controller

class Memorandum extends Controller {

  async index() {
    const { ctx, service } = this
    const result = await service.memorandum.findAllByUid()
    ctx.print = result
  }

  async show() {
    const { ctx, service } = this
    const { id } = ctx.params
    const result = await service.memorandum.findByPk(id)
    ctx.print = result
  }

  async create() {
    const { ctx, service } = this

    try {
      ctx.validate({
        title: { type: 'string?', max: 50, min: 1 },
        markdown: { type: 'string?' }
      })
    } catch (e) {
      ctx.print = {
        errorCode: 400,
        msg: e.message,
        errorMsg: e
      }
      return
    }

    const { title, markdown } = ctx.request.body

    try {
      const result = await service.memorandum.create({ title, markdown })
      ctx.print = { msg: '创建成功', data: result }
    } catch(err) {
      ctx.print = {
        errorCode: 3,
        data: err,
        msg: '创建失败'
      }
    }
  }

  async update() {
    const { ctx, service } = this
    const id = ctx.params.id

    try {
      ctx.validate({
        title: { type: 'string?', max: 50, min: 1 },
        markdown: { type: 'string?' }
      })
    } catch (e) {
      ctx.print = {
        errorCode: 400,
        msg: e.message,
        errorMsg: e
      }
      return
    }

    const { title, markdown } = ctx.request.body

    try {
      const result = await service.memorandum.updateById(id, { title, markdown })
      ctx.print = { msg: '更新成功', data: result }
    } catch (err) {
      ctx.print = {
        errorCode: 5,
        data: err,
        msg: '更新失败'
      }
    }
  }

  async destroy() {
    const { ctx, service } = this
    const id = ctx.params.id

    try {
      await service.memorandum.deleteById(id)
      ctx.print = { msg: '删除成功' }
    } catch {
      ctx.print = { errorCode: 4, msg: '删除失败' }
    }
  }
}

module.exports = Memorandum
