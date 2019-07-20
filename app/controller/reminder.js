'use strict';

const Controller = require('egg').Controller;

class ReminderController extends Controller {
  async index() {
    const { ctx, service } = this;
    
    try {
      ctx.validate({
        pageSize: { type: 'number', convertType: 'number', required: false },
        pageNo: { type: 'number', convertType: 'number', required: false },
        startDate: { type: 'number', convertType: 'number', required: false },
        endDate: { type: 'number', convertType: 'number', required: false },
      }, ctx.query);
    } catch (err) {
      ctx.print = { errorCode: 422 };
      return;
    }

    const {
      pageSize,
      pageNo,
      startDate = 0,
      endDate = Number.MAX_SAFE_INTEGER,
      type
    } = ctx.query;
    
    try {
      const where = {
        type: Number(type) || undefined,
        date: {
          [ctx.Op.between]: [startDate, endDate]
        }
      };
      const result = await service.reminder.findAllByUid(null, where, {
        limit: Number(pageSize),
        offset: Number(pageNo)
      });
  
      ctx.print = result;
    } catch (err) {
      ctx.logger.error(err);
      ctx.print = { errorCode: 2 };
    }
  }

  async create() {
    const { ctx, service } = this;
    const { date, content } = ctx.request.body;

    try {
      ctx.validate({
        date: { type: 'number', required: true },
        content: { type: 'string', required: true, max: 200, trim: true }
      });
    } catch (err) {
      ctx.print = { errorCode: 422 };
      return;
    }
    
    const result = await service.reminder.create({ date, content });
    ctx.print = { msg: '新增成功', ...result.toJSON() };
  }

  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;

    const result = await service.reminder.deleteById(id);
    if (result) {
      ctx.print = { msg: '删除成功', data: result };
    } else {
      ctx.print = { errorCode: 4 };
    }
  }

  async update() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    
    try {
      ctx.validate({
        date: { type: 'number', convertType: 'number' },
        content: { type: 'string', min: 0, max: 200 },
      });
    } catch (err) {
      ctx.print = { errorCode: 422 };
      return;
    }

    const { date, content } = ctx.request.body;
    try {
      await service.reminder.updateById(id, { date, content });
      ctx.print = null;
    } catch (err) {
      ctx.print = { errorCode: 5 };
    }
  }
}

module.exports = ReminderController;
