# tomato-work-server

tomato-work-server 是 [tomato-work](https://github.com/xjh22222228/tomato-work) 的服务端。



![](https://github.com/xjh22222228/statics/blob/master/images/gif/1.gif)







## 开发技术
核心技术：node.js(v10) + egg.js + mysql +  sequelize...
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
"dayjs": "^1.8.15"
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
# 安装依赖包
npm i

# 启动 Port: 7003
npm run dev

# 部署
npm start
```

---

## License
[MIT](https://opensource.org/licenses/MIT)

只要注明原作者许可声明，您可以自由地复制、分享、和修改。

Copyright (c) 2019-present, [xiejiahe](https://github.com/xjh22222228)
