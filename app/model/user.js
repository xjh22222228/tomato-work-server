module.exports = app => {
  const { STRING, INTEGER, TINYINT, UUIDV4, UUID } = app.Sequelize

  const Schema = app.model.define('user', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    uid: {
      type: INTEGER,
      allowNull: false
    },
    provider: {
      type: STRING(10),
      allowNull: false,
      defaultValue: 'github'
    },
    loginName: {
      type: STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    username: {
      type: STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    password: {
      type: STRING(32),
      allowNull: false,
      defaultValue: ''
    },
    token: {
      type: STRING,
      allowNull: false,
      defaultValue: ''
    },
    avatarUrl: {
      type: STRING,
      allowNull: false,
      defaultValue: ''
    },
    location: {
      type: STRING,
      allowNull: false,
      defaultValue: ''
    },
    bio: {
      type: STRING,
      allowNull: false,
      defaultValue: ''
    },
    email: {
      type: STRING(50),
      allowNull: false,
      defaultValue: '',
    },
    ipAddr: {
      type: STRING(20),
      allowNull: false,
      defaultValue: '',
      validate: {
        isIP: true
      }
    },
    role: {
      type: TINYINT(1),
      allowNull: false,
      defaultValue: 1,
      comment: '权限: 0=超级管理员(只能有一个), 1=普通用户'
    }
  }, {
    underscored: true,
    charset: 'utf8mb4',
    engine: 'InnoDB'
  })

  return Schema
}
