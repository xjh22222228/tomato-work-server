'use strict';

const Service = require('egg').Service;
const dayjs = require('dayjs');

class CapitalFlow extends Service {

  async create(data = {}) {
    const { ctx } = this;
    const uid = ctx.user.uid;
    return ctx.model.CapitalFlow.create({ uid, ...data });
  }

  /**
   * 统计某个时间段金额数据
   * @param {Number} [startDate] - 默认前一周
   * @param {Number} [endDate] - 默认今天
   */
  async findSumPriceByDate(startDate, endDate = Date.now()) {
    const { ctx, app } = this;
    const uid = ctx.user.uid;
    const todayStartTimestamp = ctx.helper.getTodayStartTimestamp();
    // 7天前时间戳
    startDate = startDate || dayjs(todayStartTimestamp).subtract(7, 'd').valueOf();
    
    const query = 'SELECT SUM(a.`price`) AS `price`, b.`type`, FROM_UNIXTIME(a.`date` / 1000, "%Y-%m-%d") AS `date` from `capital_flows` AS a, `capital_flow_types` AS b WHERE a.type_id = b.id AND a.`uid` = ? AND a.`date` BETWEEN ? AND ?  GROUP BY b.`type`, FROM_UNIXTIME(a.`date` / 1000, "%Y-%m-%d") ORDER BY FROM_UNIXTIME(a.`date` / 1000, "%Y-%m-%d");';

    const result = await ctx.model.query(query, {
      replacements: [uid, startDate, endDate],
      raw: true,
      type: app.Sequelize.QueryTypes.SELECT
    });

    // 两个日期的时间差
    const startDateObject = dayjs(startDate);
    const endDateObject = dayjs(endDate);
    const diffDay = endDateObject.diff(startDateObject, 'day');
    const data = [];

    // 初始化数据
    for (let i = 0; i < diffDay; i++) {
      const payload = {
        date: dayjs(startDate).add(i, 'd').format('YYYY-MM-DD'),
        price: 0,
        name: '收入',
        type: 1
      };
      data.push(payload, { ...payload, name: '支出', type: 2 });
    }

    result.forEach(item => {
      const idx = data.findIndex(el => el.date === item.date);

      if (~idx) {
        if (item.type === 1) {
          data[idx].price = item.price;
        } else {
          data[idx + 1].price = item.price;
        }
      }
    });

    return data;
  }

  async findAndCountAllByUid(options = {}) {
    const { ctx, app } = this;
    const { startDate, endDate, type, typeNameId } = options;
    const uid = ctx.user.uid;
    const offset = options.offset || 0;
    const limit = options.limit || Number.MAX_SAFE_INTEGER;
    
    const capitalFlowTypeWhere = {
      id: typeNameId,
      type
    };

    (!typeNameId && delete capitalFlowTypeWhere.id);
    (!type && delete capitalFlowTypeWhere.type);

    const result = await ctx.model.CapitalFlow.findAndCountAll({
      attributes: [
        'id', 'uid', 'price', 'date', 'typeId', 'remarks', 'createdAt', 'updatedAt',
        [app.Sequelize.col('capitalFlowType.name'), 'name'],
        [app.Sequelize.col('capitalFlowType.type'), 'type'],
      ],
      where: {
        date: {
          [ctx.Op.between]: [startDate, endDate]
        },
        uid
      },
      include: [{
        model: ctx.model.CapitalFlowType,
        as: 'capitalFlowType',
        where: capitalFlowTypeWhere
      }],
      order: [
        ['createdAt', 'DESC']
      ],
      raw: true,
      offset,
      limit
    });

    const sumPrice = await this.findSumPriceByDate(startDate, endDate);

    const priceParams = {
      consumption: 0,
      income: 0
    };

    sumPrice.forEach(item => {
      const price = Number(item.price);
      if (item.type === 1) {
        priceParams.income += price;
      } else {
        priceParams.consumption += price;
      }
      return item;
    });

    return { ...result, ...priceParams };
  }

  /**
   * @param {String} id
   */
  async deleteById(id) {
    const { ctx } = this;
    const uid = ctx.user.uid;
    id = String(id).split(',');
    return ctx.model.CapitalFlow.destroy({ where: {
      uid,
      id: { [ctx.Op.in]: id }
    } });
  }

  /**
   * @param {String} name
   */
  async findOneByName(name) {
    const { ctx } = this;
    const uid = ctx.user.uid;
    return ctx.model.CapitalFlow.findOne({
      where: { name, uid }
    });
  }

  /**
   * @param {String} id
   * @param {Object} updateFields
   */
  async updateById(id, updateFields) {
    const { ctx } = this;
    const uid = ctx.user.uid;
    return ctx.model.CapitalFlow.update(updateFields, {
      where: { uid, id }
    });
  }
}

module.exports = CapitalFlow;
