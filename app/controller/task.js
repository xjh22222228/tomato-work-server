'use strict';

const Controller = require('egg').Controller;

class TaskController extends Controller {
  async index() {
    const { ctx, service } = this;
    const { startDate, endDate } = ctx.query;
    const result = await service.task.findAllByUid({
      date: {
        [ctx.Op.between]: [startDate, endDate]
      }
    });

    const data = {
      wait: [],
      process: [],
      finished: [],
      unfinished: []
    };

    result.forEach(item => {
      switch (item.type) {
        case 1:
          data.wait.push(item);
          break;
        case 2:
          data.process.push(item);
          break;
        case 3:
          data.finished.push(item);
          break;
        case 4:
          data.unfinished.push(item);
          break;
        default:
      }
    });

    ctx.print = { ...data };
  }

  async create() {
    const { ctx, service } = this;
    
    try {
      ctx.validate({
        date: { type: 'number', convertType: 'number', default: Date.now() },
        content: { type: 'string', convertType: 'string', max: 200 },
        count: { type: 'number', convertType: 'number', min: 0, max: 5 },
      });
    } catch (err) {
      ctx.print = { errorCode: 422 };
      return;
    }

    const { date, content, count } = ctx.request.body;
    try {
      await service.task.create(null, { date, content, count });
      ctx.print = { msg: '新增成功' };
    } catch (err) {
      ctx.print = { errorCode: 3 };
    }
  }

  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    await service.task.deleteById(id);
    ctx.print = { msg: '删除成功' };
  }

  async update() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const { rollback } = ctx.request.body;
    const result = await service.task.findById(id);
    if (!result) {
      ctx.print = { errorCode: 2 };
    }

    const type = rollback ? result.type - 1 : result.type + 1;
    
    await service.task.updateDataById(id, { type });
    ctx.print = null;
  }
}

module.exports = TaskController;
