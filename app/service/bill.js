'use strict'

const Service = require('egg').Service
const dayjs = require('dayjs')

class Bill extends Service {
  async create(data) {
    const { ctx } = this
    const uid = ctx.user.uid
    return ctx.model.Bill.create({ uid, ...data })
  }

  /**
   * 统计某个时间段金额数据
   * @param {String} [startDate] - 默认前一周
   * @param {String} [endDate] - 默认今天
   */
  async findSumPriceByDate(startDate, endDate) {
    const { ctx, app } = this
    const uid = ctx.user.uid
    startDate =
      startDate || dayjs().startOf('hour').subtract(7, 'd').format('YYYY-MM-DD')
    endDate = endDate || dayjs().format('YYYY-MM-DD')

    const SQLQuery = `
      SELECT 
      SUM(a.price) AS price,
      b.type,
      DATE(a.created_at) AS date
      from bills AS a,
      bill_types AS b
      WHERE a.type_id = b.id AND a.uid = ? AND DATE(a.created_at) >= ? AND DATE(a.created_at) <= ? 
      GROUP BY b.type,
      DATE(a.created_at)
      ORDER BY DATE(a.created_at);
    `

    const result = await ctx.model.query(SQLQuery, {
      replacements: [uid, startDate, endDate],
      raw: true,
      type: app.Sequelize.QueryTypes.SELECT,
    })

    // 两个日期的时间差
    const startDateObject = dayjs(startDate)
    const endDateObject = dayjs(endDate)
    const diffDay = endDateObject.diff(startDateObject, 'day') + 1
    const data = []

    // 补录日期, 查出来的数据有些日期没有
    for (let i = 0; i < diffDay; i++) {
      const payload = {
        date: dayjs(startDate).add(i, 'd').format('YYYY-MM-DD'),
        price: 0,
        name: '收入',
        type: 1,
      }
      data.push(payload, {
        ...payload,
        name: '支出',
        type: 2,
      })
    }

    result.forEach((item) => {
      const idx = data.findIndex((el) => el.date === item.date)

      if (~idx) {
        if (item.type === 1) {
          data[idx].price = item.price
        } else {
          data[idx + 1].price = item.price
        }
      }
    })

    return data
  }

  async findAndCountAllByUid(options) {
    const { ctx, app } = this
    const { startDate, endDate, type, typeNameId, keyword, sort } = options
    const uid = ctx.user.uid
    const offset = options.offset || 0
    const limit = options.limit || Number.MAX_SAFE_INTEGER

    const billTypeWhere = {
      id: typeNameId,
      type,
    }

    !typeNameId && delete billTypeWhere.id
    !type && delete billTypeWhere.type

    const result = await ctx.model.Bill.findAndCountAll({
      attributes: [
        'id',
        'uid',
        'price',
        'date',
        'typeId',
        'remark',
        'createdAt',
        'updatedAt',
        [app.Sequelize.col('billType.name'), 'name'],
        [app.Sequelize.col('billType.type'), 'type'],
      ],
      where: {
        [ctx.Op.and]: [
          app.Sequelize.where(
            app.Sequelize.fn('DATE', app.Sequelize.col('bill.created_at')),
            '<=',
            endDate
          ),
          app.Sequelize.where(
            app.Sequelize.fn('DATE', app.Sequelize.col('bill.created_at')),
            '>=',
            startDate
          ),
        ],
        remark: {
          [ctx.Op.like]: `%${keyword}%`,
        },
        uid,
      },
      include: [
        {
          model: ctx.model.BillType,
          as: 'billType',
          where: billTypeWhere,
        },
      ],
      order: [sort],
      raw: true,
      offset,
      limit,
    })

    // 计算资金
    const amount = await ctx.model.Bill.findAll({
      attributes: [
        [app.Sequelize.fn('sum', app.Sequelize.col('price')), 'price'],
        [app.Sequelize.col('billType.type'), 'type'],
      ],
      where: {
        [ctx.Op.and]: [
          app.Sequelize.where(
            app.Sequelize.fn('DATE', app.Sequelize.col('bill.created_at')),
            '<=',
            endDate
          ),
          app.Sequelize.where(
            app.Sequelize.fn('DATE', app.Sequelize.col('bill.created_at')),
            '>=',
            startDate
          ),
        ],
        remark: {
          [ctx.Op.like]: `%${keyword}%`,
        },
        uid,
      },
      include: [
        {
          attributes: [],
          model: ctx.model.BillType,
          as: 'billType',
          where: {
            ...billTypeWhere,
            uid,
          },
        },
      ],
      raw: true,
      group: 'billType.type',
    })

    const amountParams = {
      consumption: 0,
      income: 0,
      available: 0,
    }

    amount.forEach((item) => {
      if (item.type === 1) {
        amountParams.income = item.price
      } else {
        amountParams.consumption = item.price
      }
      return item
    })

    amountParams.available = (
      amountParams.income - amountParams.consumption
    ).toFixed(2)

    return {
      ...result,
      ...amountParams,
    }
  }

  // 查询详情
  async findByPk(id) {
    const { ctx } = this
    const uid = ctx.user.uid
    const result = await ctx.model.Bill.findByPk(id, {
      where: { uid },
      raw: true,
    })
    return result
  }

  /**
   * @param {String} id
   */
  async deleteById(id) {
    const { ctx } = this
    const uid = ctx.user.uid
    id = String(id).split(',')
    return ctx.model.Bill.destroy({
      where: {
        uid,
        id: { [ctx.Op.in]: id },
      },
    })
  }

  /**
   * @param {String} name
   */
  async findOneByName(name) {
    const { ctx } = this
    const uid = ctx.user.uid
    return ctx.model.Bill.findOne({
      where: { name, uid },
    })
  }

  /**
   * @param {String} id
   * @param {Object} updateFields
   */
  async updateById(id, updateFields) {
    const { ctx } = this
    const uid = ctx.user.uid
    return ctx.model.Bill.update(updateFields, {
      where: { uid, id },
    })
  }

  // 统计金额分组
  async findAmountGroup(startDate, endDate) {
    const { ctx, app } = this
    const uid = ctx.user.uid

    const SQLQuery = `
      SELECT 
      SUM(f.price) as amount, t.type, t.name
      FROM bills AS f
      INNER JOIN bill_types as t
      ON f.uid = ? AND t.id = f.type_id
      AND DATE(f.created_at) >= ? AND DATE(f.created_at) <= ?
      GROUP BY t.type, t.name;
    `

    const result = await ctx.model.query(SQLQuery, {
      replacements: [uid, startDate, endDate],
      raw: true,
      type: app.Sequelize.QueryTypes.SELECT,
    })

    return result
  }
}

module.exports = Bill
