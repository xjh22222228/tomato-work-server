module.exports = app => {
  const { STRING, INTEGER, NOW, TINYINT, UUIDV4, UUID } = app.Sequelize;

  const Schema = app.model.define('user', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    uid: {
      type: INTEGER,
      allowNull: false,
      defaultValue: NOW
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
      validate: {
        isEmail: true
      }
    },
    ipAddr: {
      type: STRING(20),
      allowNull: false,
      defaultValue: '',
      validate: {
        isIP: true
      }
    },
    // 账号角色权限，目前暂无用到，预留以后需要
    role: {
      type: TINYINT(1),
      allowNull: false,
      defaultValue: 1,
      comment: '权限，1=正常'
    }
  }, {
    underscored: true,
    charset: 'utf8',
    engine: 'InnoDB'
  });

  return Schema;
};
