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


## 说明
由于一些原因，这个项目之前是由 [Egg](https://github.com/xjh22222228/tomato-work/tree/egg) 框架编写，对应前端源代码 [tomato-work-client](https://github.com/xjh22222228/tomato-work/tree/egg)，如果你想学习或了解 [Egg.js](https://www.eggjs.org/) 框架这是不错的选择。


## MySQL Setup

- 创建数据库 `tomato_work`
- 运行根目录 `sql.sql`

## Build Setup

启动项目之前请配置数据库信息 `.env.development`

```bash
# Download
git clone --depth=1 https://github.com/xjh22222228/tomato-work-server.git

# Install
pnpm i

# Port: 7003
npm run start:dev

# Build start
npm run start
```

## 部署

复制 `.env.development` 到 `.env.production`

启动

```bash
npm run build:prod


npm run start:prod
# or
pm2 start ecosystem.config.cjs
```

---

## License

[MIT](https://opensource.org/licenses/MIT)
