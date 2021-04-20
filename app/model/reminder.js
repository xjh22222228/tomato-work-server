module.exports = app => {
  const { INTEGER, STRING, BIGINT, TINYINT, UUID, UUIDV4 } = app.Sequelize

  const Schema = app.model.define('reminder', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      comment: '唯一ID'
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
      comment: '提醒内容'
    },
    date: {
      type: BIGINT(13),
      allowNull: false,
      defaultValue: Date.now,
      comment: '提醒日期'
    },
    type: {
      type: TINYINT(1),
      allowNull: true,
      defaultValue: 1,
      comment: '事项类型, 1=待提醒, 2=已提醒'
    },
  }, {
    underscored: true,
    comment: '事项提醒, 目前支持微信提醒和邮件提醒',
    charset: 'utf8mb4',
    engine: 'InnoDB'
  })

  return Schema
}
