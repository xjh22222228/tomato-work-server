# tomato-work-server

tomato-work-server 是 [tomato-work](https://github.com/xjh22222228/tomato-work) 的服务端。




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
