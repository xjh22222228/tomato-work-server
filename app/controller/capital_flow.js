'use strict';

const Controller = require('egg').Controller;
const dayjs = require('dayjs');

const enumTypeValues = [1, 2];

class CapitalFlow extends Controller {

  async index() {
    const { ctx, service } = this;
    try {
      ctx.validate({
        pageNo: { type: 'int?', convertType: 'int', default: 0 },
        pageSize: { type: 'int?', convertType: 'int', default: Number.MAX_SAFE_INTEGER - 1 },
        startDate: { type: 'int?', convertType: 'int', default: 0 },
        endDate: { type: 'int?', convertType: 'int', default: Number.MAX_SAFE_INTEGER },
      }, ctx.query);
    } catch (_) {
      ctx.print = { errorCode: 422 };
      return;
    }

    const {
      pageNo,
      pageSize,
      startDate,
      endDate,
      typeNameId,
      type
    } = ctx.query;

    try {
      const result = await service.capitalFlow.findAndCountAllByUid({
        offset: pageNo * pageSize,
        limit: (pageNo + 1) * pageSize,
        startDate,
        endDate,
        typeNameId,
        type
      });
      ctx.print = result;
    } catch (_) {
      ctx.print = { errorCode: 2 };
    }
  }

  async create() {
    const { ctx, service } = this;

    try {
      ctx.validate({
        date: { type: 'int' },
        typeId: { type: 'string' },
        price: { type: 'number' },
        remarks: { type: 'string?', min: 0, max: 250 },
      });
    } catch (_) {
      ctx.print = { errorCode: 422 };
      return;
    }

    const { date, typeId, price, remarks } = ctx.request.body;
    
    try {
      const result = await service.capitalFlow.create({ date, typeId, price, remarks });
      ctx.print = result;
    } catch (_) {
      ctx.print = { errorCode: 3, msg: '创建失败' };
    }
  }

  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;

    const result = await service.capitalFlow.deleteById(id);
    ctx.print = { ...result, msg: '删除成功' };
  }

  async update() {
    const { ctx, service } = this;
    const id = ctx.params.id;

    try {
      ctx.validate({
        name: { type: 'string?', convertType: 'string', min: 1, max: 20 },
        type: { type: 'enum', values: enumTypeValues }
      });
    } catch (_) {
      ctx.print = { errorCode: 422 };
      return;
    }
    
    const { name, type } = ctx.request.body;
    const updateFields = { name, type };
    const findResult = await await service.capitalFlow.findOneByName(name);

    if (findResult && findResult.name === name) {

      if (findResult.type === type) {
        ctx.print = { errorCode: 3, msg: '无变动' };
        return;
      }
      delete updateFields.name;
    }

    try {
      await service.capitalFlow.updateById(id, updateFields);
      ctx.print = { msg: '更新成功' };
    } catch (_) {
      ctx.print = { errorCode: 3, msg: '更新失败' };
    }
  }

  // 统计金额
  async sumPrice() {
    const { ctx, service } = this;
    const todayStartTimestamp = ctx.helper.getTodayStartTimestamp();
    const {
      startDate = dayjs(todayStartTimestamp).subtract(7, 'd').valueOf(),
      endDate = Date.now()
    } = ctx.query;
    const formatStartDate = dayjs(startDate);
    const formatEndDate = dayjs(endDate);
    // 两个日期的时间差
    const diffDay = formatEndDate.diff(formatStartDate, 'day');

    try {
      const result = await service.capitalFlow.findSumPriceByDate(startDate, endDate);
      const data = [];

      // 初始化数据
      for (let i = 0; i < diffDay; i++) {
        const payload = {
          date: dayjs(startDate).add(i, 'd').format('YYYY-MM-DD'),
          price: '0.00',
          labelPrice: 0,
          name: '收入',
          type: 1
        };
        data.push(payload, { ...payload, name: '支出', type: 2 });
      }

      result.forEach(item => {
        
        const idx = data.findIndex(el => el.date === item.date);

        if (idx === -1) return;

        if (item.type === 1) {
          data[idx].price = item.price;
        } else {
          data[idx + 1].price = item.price;
        }
      });

      ctx.print = data;
    } catch (_) {
      ctx.print = { errorCode: 2 };
    }
  }
}

module.exports = CapitalFlow;
