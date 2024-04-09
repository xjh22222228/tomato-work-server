<p align="center">
  <img src="https://raw.githubusercontent.com/xjh22222228/tomato-work/master/public/poster.png" width="150" />
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

- [Node.js >= 14](https://nodejs.org/en/)
- [Egg.js](https://eggjs.org/zh-cn/intro/)
- [MySQL](https://www.mysql.com/)
- [Sequelize](https://github.com/sequelize/sequelize)
- [js-ant](https://github.com/xjh22222228/js-ant)

## MySQL Setup

Simple MySQL install and config

Run file `sql.sql`

```sql
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

---

## License

[MIT](https://opensource.org/licenses/MIT)
