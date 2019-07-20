'use strict';

const Controller = require('egg').Controller;
const svgCaptcha = require('svg-captcha');

class Common extends Controller {
  async captcha() {
    const { ctx } = this;
    const captcha = svgCaptcha.create();
    ctx.type = 'svg';
    ctx.body = captcha.data;
  }
};

module.exports = Common;