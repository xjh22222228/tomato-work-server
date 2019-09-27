'use strict';

const _ = require('lodash');
const { errorCode } = require('../constants');

module.exports = {
  /**
   * 返回Sequelize所有操作符
   * @url https://demopark.github.io/sequelize-docs-Zh-CN/querying.html
   */
  get Op() {
    return this.app.Sequelize.Op;
  },
  get print() {
    return this.ctx.body;
  },
  get realIP() {
    const { ctx } = this;
    return ctx.headers['X-Real-IP'] || ctx.headers['X-Forwarded-For'] || ctx.ip;
  },
  /**
   * @param {*} responseData
   * @example 
   * ctx.print = 'Hello';
   * ctx.print = null;
   * ctx.print = { name: 'Hello' };
   * @return {Object}
   */
  set print(responseData) {
    const body = {
      data: responseData,
      errorCode: 0,
      msg: errorCode[0],
      success: true
    };

    if (_.isPlainObject(responseData)) {
      
      if (responseData.errorCode !== undefined && responseData.errorCode !== 0) {
        body.errorCode = responseData.errorCode;
        body.success = false;
        body.msg =  errorCode[body.errorCode] || 'error';
        body.data = null;
      }
      
      body.msg = responseData.msg || body.msg;

      // 删除重复定义字段
      if (_.isPlainObject(body.data)) {
        body.data = Object.assign({}, body.data);
        delete body.data.errorCode;
        delete body.data.msg;
        delete body.data.success;
      }
    }
    
    this.body = body;
  }
};
