'use strict'

const Controller = require('egg').Controller

class UserConfigure extends Controller {

  // 检索用户配置信息
  async index() {
    const { ctx, service } = this
    const result = await service.userConfigure.findUserConfigByUid()
    ctx.print = result
  }

  // 更新用户配置表
  async update() {
    const { ctx, service } = this
    const { isTaskNotify, isMatterNotify, sckey } = ctx.request.body
    const updateFileds = {
      isTaskNotify,
      isMatterNotify,
      serverChanSckey: sckey
    }

    for (let k in updateFileds) {
      updateFileds[k] === undefined && delete updateFileds[k]
    }

    try {
      if (!Object.keys(updateFileds).length) {
        throw new Error()
      }
      ctx.validate({
        isTaskNotify: { type: 'boolean?' },
        isMatterNotify: { type: 'boolean?' },
        sckey: { type: 'string?', max: 200 }
      })
    } catch (e) {
      ctx.print = {
        errorCode: 400,
        msg: e.message,
        errorMsg: e
      }
    }

    const result = await service.userConfigure.update(null, updateFileds)
    ctx.print = {
      msg: '更新成功',
      data: result
    }
  }
}

module.exports = UserConfigure
