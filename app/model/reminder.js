module.exports = app => {
  const { INTEGER, STRING, BIGINT, TINYINT, UUID, UUIDV4 } = app.Sequelize

  const Schema = app.model.define('reminder', {
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
      allowNull: true,
      defaultValue: 1,
      comment: '事项类型, 1=待提醒, 2=已提醒'
    },
  }, {
    underscored: true,
    comment: '事项提醒',
    charset: 'utf8mb4',
    engine: 'InnoDB'
  })

  return Schema
}
