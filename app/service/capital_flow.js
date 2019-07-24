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

    return ctx.model.query(query, {
      replacements: [uid, startDate, endDate],
      raw: true,
      type: app.Sequelize.QueryTypes.SELECT
    });
  }

  async findAndCountAllByUid(options = {}) {
    const { ctx, app } = this;
    const { startDate, endDate, type, typeNameId } = options;
    const uid = ctx.user.uid;
    const offset = options.offset || 0;
    const limit = options.limit || Number.MAX_SAFE_INTEGER;
    const typeQuery = type ? 'AND b.type = ?' : `AND ''=?`;
    const typeNameQuery = typeNameId ? 'AND b.id = ?' : `AND ''=?`;
    const query = `SELECT a.id, a.type_id AS typeId, a.created_at, a.date, a.remarks, a.price, b.name, b.type from capital_flows AS a, capital_flow_types AS b WHERE a.date BETWEEN ? AND ? AND a.type_id = b.id AND a.uid = ? ${typeQuery} ${typeNameQuery} ORDER BY created_at DESC limit ?,?`;
    
    
    const count = await ctx.model.CapitalFlow.count({ where: { uid } });
    const result = await ctx.model.query(query, {
      replacements: [startDate, endDate, uid, type, typeNameId, offset, limit],
      raw: true,
      type: app.Sequelize.QueryTypes.SELECT
    });

    const priceParams = {
      consumption: 0,
      income: 0
    };

    result.forEach(item => {
      const price = Number(item.price);
      if (item.type === 1) {
        priceParams.income += price;
      } else {
        priceParams.consumption += price;
      }
    })

    return { count, rows: result, ...priceParams };
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
