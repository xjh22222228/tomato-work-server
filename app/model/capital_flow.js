module.exports = app => {
  const { INTEGER, STRING, UUIDV4, UUID, DECIMAL, BIGINT, TEXT } = app.Sequelize

  const Schema = app.model.define('capital_flow', {
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
    price: {
      type: DECIMAL(19, 2),
      allowNull: false,
      defaultValue: 0,
      comment: '金额'
    },
    date: {
      type: BIGINT(13),
      allowNull: false,
      defaultValue: Date.now,
      comment: '日期'
    },
    typeId: {
      type: UUID,
      allowNull: false,
      // 定义外键
      references: {
        model: 'capital_flow_types',
        key: 'id',
      },
      comment: '外键ID'
    },
    remark: {
      type: STRING(250),
      allowNull: false,
      defaultValue: '',
      comment: '备注信息'
    },
    imgs: {
      type: TEXT('long'),
      comment: '图片地址，由于条件有限，只存储base64'
    }
  }, {
    underscored: true,
    comment: '资金流动',
    charset: 'utf8mb4',
    engine: 'InnoDB'
  })

  Schema.associate = function associate() {
    app.model.CapitalFlow.belongsTo(app.model.CapitalFlowType, {
      as: 'capitalFlowType',
      foreignKey: 'type_id'
    })
  }

  return Schema
}
