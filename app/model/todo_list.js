module.exports = app => {
  const { INTEGER, TEXT, TINYINT, UUIDV4, UUID } = app.Sequelize

  const Schema = app.model.define('todo_list', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      comment: '唯一ID'
    },
    uid: {
      type: INTEGER,
      allowNull: false,
      comment: '用户ID'
    },
    content: {
      type: TEXT,
      defaultValue: '',
      allowNull: false,
      comment: '清单内容'
    },
    status: {
      type: TINYINT,
      defaultValue: 1,
      allowNull: false,
      comment: '状态, 1=进行中, 2=完成'
    },
  }, {
    underscored: true,
    comment: '活动清单',
    charset: 'utf8mb4',
    engine: 'InnoDB'
  })

  return Schema
}
