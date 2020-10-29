'use strict'

const Controller = require('egg').Controller
const os = require('os')

class SystemController extends Controller {
  async index() {
    const { ctx } = this
    const mysqlVersion = await ctx.model.query('SELECT VERSION() as mysqlVersion', {
      raw: true,
      plain: true
    })

    const params = {
      ...mysqlVersion,
      currentSystemTime: Date.now(),
      freemem: os.freemem(),
      totalmem: os.totalmem(),
      platform: os.platform(),
      type: os.type(),
      hostname: os.hostname(),
      arch: os.arch(),
      nodeVersion: process.version,
      cpus: os.cpus(),
    }
    ctx.print = params
  }
}

module.exports = SystemController
