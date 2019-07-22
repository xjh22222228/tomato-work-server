/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  
  const config = exports = {};

  config.keys = appInfo.name + '_1557145862828_145';

  config.middleware = [];

  config.cluster = {
    listen: {
      port: 7003,
    }
  };

  config.bodyParser = {
    jsonLimit: '10mb',
    formLimit: '10mb',
  };

  config.security = {
    csrf: false
  };

  config.passportLocal = {
    usernameField: 'loginName',
    passwordField: 'password'
  };

  config.title = 'Tomato Work';

  // 数据库配置 [必须]
  config.sequelize = {
    dialect: 'mysql',
    database: 'tomato_work',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456',
  };

  // github配置信息 [可选, 默认使用作者的信息, 但启动端口不可修改]
  config.passportGithub = {
    key: '489b39e1f91d934128c8',
    secret: '9ec2cf95bee7f1451792ce8124075cce7b66450d',
    callbackURL: 'http://localhost:9663/api/passport/github/callback',
    successRedirect: '/api/passport/github/success',
    failureRedirect: '/?state=0'
  };

  // 邮箱配置信息 [可选]
  config.mailer = {
    host: 'smtp.mxhichina.com',
    port: 465,
    secure: true,
    auth: {
      user: 'system@example.com',
      // 注意： 163/QQ是授权密码， 阿里云是登录密码
      pass: 'hello',
    },
  };

  return config;
};