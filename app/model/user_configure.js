module.exports = app => {
  const { INTEGER, BOOLEAN, UUIDV4, UUID, STRING } = app.Sequelize

  const Schema = app.model.define('user_configure', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      comment: '唯一ID'
    },
    uid: {
      type: INTEGER,
      allowNull: false,
      unique: true,
      comment: '用户ID'
    },
    isTaskNotify: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: '待办任务通知'
    },
    isMatterNotify: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: '提醒事项通知'
    },
    serverChanSckey: {
      type: STRING(200),
      allowNull: false,
      defaultValue: '',
      comment: 'server酱SCKEY'
    }
  }, {
    underscored: true,
    comment: '用户配置表',
    charset: 'utf8mb4',
    engine: 'InnoDB'
  })

  return Schema
}
