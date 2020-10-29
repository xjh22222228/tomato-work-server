'use strict'

const _ = require('lodash')
const { errorCode } = require('../constants')

module.exports = {
  /**
   * 返回Sequelize所有操作符
   * @url https://demopark.github.io/sequelize-docs-Zh-CN/querying.html
   */
  get Op() {
    return this.app.Sequelize.Op
  },
  get print() {
    return this.body
  },
  get realIP() {
    return this.get['X-Real-IP'] || this.get['X-Forwarded-For'] || this.ip
  },
  /**
   * @param {*} val
   * @example
   * ctx.print = 'Hello'
   * ctx.print = null
   * ctx.print = { name: 'Hello' }
   * @return {Object}
   */
  set print(val) {
    const body = {
      data: val,
      errorCode: 0,
      msg: errorCode[0],
      success: true
    }

    if (_.isPlainObject(val)) {

      if (val.errorCode !== undefined && val.errorCode !== 0) {
        body.errorCode = val.errorCode
        body.success = false
        body.msg = errorCode[body.errorCode] || 'error'
        body.data = null
      }

      body.msg = val.msg || body.msg
      body.errorMsg = val.errorMsg || body.msg

      // 删除重复定义字段
      if (_.isPlainObject(body.data)) {
        body.data = Object.assign({}, body.data)
        delete body.data.errorCode
        delete body.data.msg
        delete body.data.success
      }
    }

    this.body = body
  }
}
