<p align="center">
  <img src="https://raw.githubusercontent.com/xjh22222228/tomato-work/master/public/logo.svg" width="150" />
  <br />
  <b>Tomato Work 个人事务管理系统</b>
  <p align="center">
    <a href="https://github.com/xjh22222228/tomato-work">
      <img alt="Server" src="https://img.shields.io/static/v1.svg?label=&message=Client&style=flat-square&color=e8883a">
    </a>
    <a href="https://github.com/xjh22222228/tomato-work-server/stargazers"><img src="https://img.shields.io/github/stars/xjh22222228/tomato-work-server" alt="Stars"/></a>
    <img src="https://img.shields.io/github/package-json/v/xjh22222228/tomato-work-server" />
    <img src="https://img.shields.io/github/license/xjh22222228/tomato-work-server" />
  </p>
</p>

## Built with

- [Node.js >= 18](https://nodejs.org/en/)
- [Egg.js](https://eggjs.org/zh-cn/intro/)
- [MySQL](https://www.mysql.com/)
- [Sequelize](https://github.com/sequelize/sequelize)
- [js-ant](https://github.com/xjh22222228/js-ant)

## MySQL Setup

- 创建数据库 `tomato_work`
- 运行根目录 `sql.sql`

## Build Setup

启动项目之前请配置数据库信息 config/config.default.js

```bash
# Download
git clone --depth=1 https://github.com/xjh22222228/tomato-work-server.git

# Install
pnpm i

# Port: 7003
npm run dev

# Build start
npm run start
```

## 部署

复制 `config/config.default.js` 到 `config/config.product.js`, 生产环境是运行 `config/config.product.js` 配置文件，默认是没有的。

启动

```bash
npm run start:prod
```

---

## License

[MIT](https://opensource.org/licenses/MIT)
