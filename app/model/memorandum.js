module.exports = app => {
  const { INTEGER, STRING, TINYINT, TEXT, UUIDV4, UUID } = app.Sequelize

  /**
   * 备忘录创建不能大于100个
   */
  const Schema = app.model.define('memorandum', {
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
    sortIndex: {
      type: TINYINT,
      defaultValue: 0,
      allowNull: false,
      comment: '排序'
    },
    title: {
      type: STRING(50),
      allowNull: false,
      defaultValue: '',
      comment: '备忘录标题'
    },
    markdown: {
      type: TEXT('long'),
      allowNull: false,
      comment: 'Markdown内容'
    }
  }, {
    underscored: true,
    comment: '备忘录',
    charset: 'utf8mb4',
    engine: 'InnoDB'
  })

  return Schema
}
