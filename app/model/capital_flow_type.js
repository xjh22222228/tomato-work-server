module.exports = app => {
  const { INTEGER, STRING, TINYINT, UUIDV4, UUID } = app.Sequelize

  const Schema = app.model.define('capital_flow_type', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    uid: {
      type: INTEGER,
      allowNull: false,
    },
    sortIndex: {
      type: TINYINT,
      defaultValue: 0,
      allowNull: false,
      comment: '排序'
    },
    name: {
      type: STRING(20),
      allowNull: false,
      defaultValue: '',
    },
    type: {
      type: TINYINT,
      allowNull: false,
      defaultValue: 1,
      comment: '1=收入, 2=支出'
    },
  }, {
    underscored: true,
    comment: '资金流动类型',
    charset: 'utf8mb4',
    engine: 'InnoDB'
  })

  return Schema
}
