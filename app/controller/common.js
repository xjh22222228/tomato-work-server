'use strict'

const Controller = require('egg').Controller
const svgCaptcha = require('svg-captcha')
const dayjs = require('dayjs')

class Common extends Controller {

  async index() {
    const { ctx } = this
    ctx.body = 'Welcome to Tomaro Work !'
  }

  async captcha() {
    const { ctx } = this
    const code = ctx.query.code || '1234'
    const svg = svgCaptcha(code)

    ctx.type = 'svg'
    ctx.body = svg
  }

  // 获取后台首页面板数据
  async getPanelData() {
    const { ctx, service } = this

    let [price, todayTask, unfinishedTodoList, reminder] = await Promise.all([
      service.capitalFlow.findSumPriceByDate(dayjs().format('YYYY-MM-DD')),
      service.task.findAllByUid({ type: { [ctx.Op.in]: [1, 2] } }),
      service.todoList.findUnfinishedByUid(),
      service.reminder.findAllByUid(null, { type: 1 })
    ])

    // 过滤支出
    price = price.filter(item => item.type === 2)
    ctx.print = {
      consumption: price.length > 0 ? price[0].price : '0.00',
      todayTaskCount: todayTask.length,
      unfinishedTodoListCount: unfinishedTodoList.count,
      reminderCount: reminder.count
    }
  }
}

module.exports = Common
