module.exports = app => {
  const {
    INTEGER,
    STRING,
    TINYINT,
    UUIDV4,
    UUID,
    BOOLEAN,
    DATE,
    TEXT,
    DECIMAL
  } = app.Sequelize

  const Schema = app.model.define('company', {
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
    companyName: {
      type: STRING(30),
      allowNull: false,
      defaultValue: '',
      comment: '单位名称'
    },
    startDate: {
      type: DATE,
      allowNull: false,
      comment: '入职日期'
    },
    endDate: {
      type: DATE,
      comment: '离职日期, null 为至今'
    },
    expectLeaveDate: {
      type: DATE,
      comment: '期望（计划）离职日期'
    },
    remark: {
      type: TEXT,
      allowNull: false,
      defaultValue: '',
      comment: '描述、备注信息'
    },
    amount: {
      type: DECIMAL(19, 2),
      allowNull: false,
      comment: '薪资'
    }
  }, {
    underscored: true,
    comment: '公司单位',
    charset: 'utf8mb4',
    freezeTableName: true,
    engine: 'InnoDB'
  })

  return Schema
}
