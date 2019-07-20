module.exports = app => {
  const { INTEGER, STRING, UUIDV4, UUID, DECIMAL, BIGINT, NOW } = app.Sequelize;

  const Schema = app.model.define('capital_flow', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    uid: {
      type: INTEGER,
      allowNull: false,
    },
    price: {
      type: DECIMAL(19, 2),
      allowNull: false,
      defaultValue: 0
    },
    date: {
      type: BIGINT(13),
      allowNull: false,
      defaultValue: NOW,
    },
    typeId: {
      type: UUID,
      allowNull: false,
      // 定义外键
      references: {
        model: 'capital_flow_types',
        key: 'id',
      },
    },
    remarks: {
      type: STRING(250),
      allowNull: false,
      defaultValue: '',
      comment: '备注信息'
    }
  }, {
    underscored: true,
    comment: '资金流动',
    charset: 'utf8',
    engine: 'InnoDB'
  });

  return Schema;
};
