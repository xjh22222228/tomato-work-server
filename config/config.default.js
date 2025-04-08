/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  const config = {}

  config.keys = appInfo.name + '_1557145862828_145'

  config.middleware = []

  config.cluster = {
    listen: {
      port: 7003,
    },
  }

  config.bodyParser = {
    jsonLimit: '10mb',
    formLimit: '10mb',
  }

  config.security = {
    csrf: false,
  }

  config.passportLocal = {
    usernameField: 'loginName',
    passwordField: 'password',
  }

  config.title = 'Tomato Work'

  // 数据库配置 [必须]
  config.sequelize = {
    dialect: 'mysql',
    database: 'tomato_work',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    timezone: '+08:00',
  }

  // github配置信息 [可选, 默认使用作者的信息, 但启动端口不可修改]
  // 本地调试使用下面的配置，部署到线上你需要去GitHub申请一个OAuth Application
  config.passportGithub = {
    key: '489b39e1f91d934128c8',
    secret: '9ec2cf95bee7f1451792ce8124075cce7b66450d',
    // http://localhost:7001 是客户端的链接，如果线上就填写你的域名
    callbackURL: 'http://localhost:7001/api/passport/github/callback',
    redirectURL: '/',
    successRedirect: '/api/passport/github/success',
    failureRedirect: '/?state=0',
  }

  // 邮箱配置信息 [可选, 默认使用测试账号]
  config.mailer = {
    host: 'smtp.2980.com',
    port: 25,
    secure: false,
    auth: {
      user: 'tomatowork@2980.com',
      pass: 'a123456',
    },
  }

  // 自己邮箱, 用于通知报告
  config.email = 'xjh22222228@gmail.com'

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    allowHeaders:
      'Content-Type,X-Requested-With,Authorization,Origin,Accept,cancelRequest,isLoading,errorAlert,successAlert,token',
  }

  return config
}
