module.exports = app => {
  const { INTEGER, STRING, BIGINT, TINYINT, UUIDV4, UUID } = app.Sequelize

  const Schema = app.model.define('task', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    uid: {
      type: INTEGER,
      allowNull: false,
      comment: '用户ID',
    },
    content: {
      type: STRING(200),
      allowNull: false,
      defaultValue: '',
    },
    date: {
      type: BIGINT(13),
      allowNull: false,
      defaultValue: Date.now,
    },
    type: {
      type: TINYINT(1),
      allowNull: false,
      defaultValue: 1,
      comment: '进度类型: 1=待作业, 2=作业中, 3=已完成, 4=未完成'
    },
    count: {
      type: TINYINT(1),
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    underscored: true,
    comment: '今日待办',
    charset: 'utf8mb4',
    engine: 'InnoDB'
  })

  return Schema
}
