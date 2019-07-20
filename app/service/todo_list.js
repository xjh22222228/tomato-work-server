'use strict';

const Service = require('egg').Service;

class TodoList extends Service {

  async create(data = {}) {
    const { ctx } = this;
    const uid = ctx.user.uid;
    return ctx.model.TodoList.create({ uid, ...data });
  }

  async findAndCountAllByUid(options = {}) {
    const { ctx } = this;
    const uid = ctx.user.uid;
    return ctx.model.TodoList.findAndCountAll({
      where: {
        createdAt: {
          [ctx.Op.lt]: new Date(options.endDate),
          [ctx.Op.gt]: new Date(options.startDate),
        },
        uid,
      },
      order: [
        ['createdAt', 'DESC']
      ],
      ...options
    });
  }

  /**
   * @param {String} id
   */
  async deleteById(id) {
    const { ctx } = this;
    const uid = ctx.user.uid;
    id = String(id).split(',');
    return ctx.model.TodoList.destroy({ where: {
      uid,
      id: {
        [ctx.Op.in]: id
      }
    } });
  }

  /**
   * @param {String} name
   */
  async findOneByName(name) {
    const { ctx } = this;
    const uid = ctx.user.uid;
    return ctx.model.TodoList.findOne({
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
    return ctx.model.TodoList.update(updateFields, {
      where: { uid, id }
    });
  }
}

module.exports = TodoList;
