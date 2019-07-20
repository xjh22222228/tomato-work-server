'use strict';

const Controller = require('egg').Controller;

class TodoList extends Controller {
  async index() {
    const { ctx, service } = this;
    try {
      ctx.validate({
        pageNo: { type: 'int?', convertType: 'int', default: 0 },
        pageSize: { type: 'int?', convertType: 'int', default: Number.MAX_SAFE_INTEGER - 1 },
        startDate: { type: 'int?', convertType: 'int', default: Date.now() },
        endDate: { type: 'int?', convertType: 'int', default: Date.now() },
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
    } = ctx.query;

    try {
      const result = await service.todoList.findAndCountAllByUid({
        offset: pageNo * pageSize,
        limit: (pageNo + 1) * pageSize,
        startDate,
        endDate,
      });
      ctx.print = result;
    } catch (_) {
      ctx.print = { errorCode: 2 };
    }
  }

  async create() {
    const { ctx, service } = this;
    const { content } = ctx.request.body;

    try {
      const result = await service.todoList.create({ content });
      ctx.print = result;
    } catch (_) {
      ctx.print = { errorCode: 3, msg: '创建失败' };
    }
  }

  async update() {
    const { ctx, service } = this;
    const id = ctx.params.id;

    try {
      ctx.validate({
        status: { type: 'enum?', values: [1, 2] }
      });
    } catch (_) {
      ctx.print = { errorCode: 422 };
      return;
    }

    const { content, status } = ctx.request.body;
    const data = { content, status };

    if (Number.isInteger(status)) {
      delete data.content;
    }

    try {
      await service.todoList.updateById(id, data);
      ctx.print = { msg: '更新成功' };
    } catch (_) {
      ctx.print = { errorCode: 422 };
    }
  }

  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    await service.todoList.deleteById(id);
    ctx.print = { msg: '删除成功' };
  }
}

module.exports = TodoList;
