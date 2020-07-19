<p align="center">
  <img src="https://raw.githubusercontent.com/xjh22222228/tomato-work/master/public/poster.png" width="150" />
  <br />
  <b>Tomato Work 个人事务管理系统</b>
  <p align="center">
    <a href="https://github.com/xjh22222228/tomato-work">WEB </a>
    <a href="https://github.com/xjh22222228/tomato-work-weapp"> 小程序</a>
  </p>
  <p align="center">
    <a href="https://github.com/xjh22222228/tomato-work-server/stargazers"><img src="https://img.shields.io/github/stars/xjh22222228/tomato-work-server" alt="Stars Badge"/></a>
    <img src="https://img.shields.io/github/package-json/v/xjh22222228/tomato-work-server" />
    <img src="https://img.shields.io/github/license/xjh22222228/tomato-work-server" />
    <a href="https://hits.dwyl.com/xjh22222228/tomato-work-server">
      <img src="https://hits.dwyl.com/xjh22222228/tomato-work-server.svg" />
    </a>
  </p>
</p>



## 开发技术
核心技术：node.js(v10+) + egg.js + mysql +  sequelize...
``` json
"egg": "^2.15.1",
"egg-crypto": "^1.0.0",
"egg-jwt": "^3.1.6",
"egg-mailer": "^1.0.1",
"egg-passport": "^2.0.2",
"egg-passport-github": "^1.0.0",
"egg-passport-local": "^1.2.1",
"egg-sequelize": "^5.1.0",
"egg-validate": "^2.0.2",
"lodash": "^4.17.11",
"mysql2": "^1.6.5",
"svg-captcha": "^1.4.0",
"validator": "^11.0.0",
"node-xlsx": "^0.15.0",
"dayjs": "^1.8.15",
"markdown-it": "^10.0.0",
"highlight.js": "^9.17.0"
```

## MySQL Setup
Simple MySQL install and config

```
# Install mysql
sudo apt install mysql-server
systemctl status mysql.service

# Adjusting User Authentication 
sudo mysql
mysql > SELECT user,authentication_string,plugin,host FROM mysql.user;
mysql > ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';

# Create a database for tomato work
mysql > CREATE DATABASE tomato_work

# Later you can login to mysql via
mysql -u root -p
```

## Build Setup
启动项目之前请配置数据库信息  config/config.default.js

``` bash
# Install
npm i

# Port: 7003
npm run dev

# Build start
npm start
```

---

## License
[MIT](https://opensource.org/licenses/MIT)
