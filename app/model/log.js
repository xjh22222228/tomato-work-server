module.exports = app => {
  const { INTEGER, STRING, TINYINT, UUIDV4, UUID, BOOLEAN, TEXT } = app.Sequelize

  const Schema = app.model.define('log', {
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
    companyId: {
      type: STRING,
      allowNull: false,
      comment: '单位ID, -1=无'
    },
    logType: {
      type: TINYINT,
      allowNull: false,
      comment: '日志类型, 1=日报、2=周报、3=月报'
    },
    doneContent: {
      type: TEXT,
      allowNull: false,
      defaultValue: '',
      comment: '完成内容'
    },
    undoneContent: {
      type: TEXT,
      allowNull: false,
      defaultValue: '',
      comment: '未完成内容'
    },
    planContent: {
      type: TEXT,
      allowNull: false,
      defaultValue: '',
      comment: '计划内容'
    },
    summaryContent: {
      type: TEXT,
      allowNull: false,
      defaultValue: '',
      comment: '工作总结'
    },
  }, {
    underscored: true,
    comment: '日志管理',
    charset: 'utf8mb4',
    engine: 'InnoDB'
  })

  return Schema
}
