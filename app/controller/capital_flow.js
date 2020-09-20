'use strict';

const Controller = require('egg').Controller;

class CapitalFlow extends Controller {

  async index() {
    const { ctx, service } = this;
    try {
      ctx.validate({
        pageNo: { type: 'int?', convertType: 'int', default: 0 },
        pageSize: { type: 'int?', convertType: 'int', default: 30 },
        startDate: { type: 'int?', convertType: 'int', default: 0 },
        endDate: { type: 'int?', convertType: 'int', default: Number.MAX_SAFE_INTEGER },
        sort: { type: 'string?', default: 'date-desc' }
      }, ctx.query);
    } catch {
      ctx.print = { errorCode: 422 };
      return;
    }

    const {
      pageNo,
      pageSize,
      startDate,
      endDate,
      typeNameId,
      type,
      keyword,
      sort
    } = ctx.query;

    try {
      const result = await service.capitalFlow.findAndCountAllByUid({
        offset: pageNo * pageSize,
        limit: pageSize,
        sort: sort.split('-'),
        startDate,
        endDate,
        typeNameId,
        type,
        keyword
      });
      ctx.print = result;
    } catch {
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
    } catch {
      ctx.print = { errorCode: 422 };
      return;
    }

    const { date, typeId, price, remarks } = ctx.request.body;

    try {
      const result = await service.capitalFlow.create({ date, typeId, price, remarks });
      ctx.print = result;
    } catch {
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
        date: { type: 'int' },
        typeId: { type: 'string' },
        price: { type: 'number' },
        remarks: { type: 'string?', min: 0, max: 250 },
      });
    } catch {
      ctx.print = { errorCode: 422 };
      return;
    }

    const { date, typeId, price, remarks } = ctx.request.body;

    try {
      const result = await service.capitalFlow.updateById(id, { date, typeId, price, remarks });
      ctx.print = result;
    } catch {
      ctx.print = { errorCode: 5, msg: '更新失败' };
    }
  }

  // 统计金额
  async sumPrice() {
    const { ctx, service } = this;
    const { startDate, endDate } = ctx.query;

    try {
      const result = await service.capitalFlow.findSumPriceByDate(startDate, endDate);
      ctx.print = result;
    } catch {
      ctx.print = { errorCode: 2 };
    }
  }
}

module.exports = CapitalFlow;
