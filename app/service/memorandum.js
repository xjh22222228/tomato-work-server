'use strict';

const Service = require('egg').Service;

class Memorandum extends Service {

  async create(data = {}) {
    const { ctx } = this;
    const uid = ctx.user.uid;
    return ctx.model.Memorandum.create({ uid, ...data });
  }

  async findAllByUid() {
    const { ctx } = this;
    const uid = ctx.user.uid;
    return ctx.model.Memorandum.findAll({
      where: { uid },
      order: [
        ['createdAt', 'DESC']
      ]
    });
  }

  async findByPk(id) {
    const { ctx } = this;
    const uid = ctx.user.uid;
    return ctx.model.Memorandum.findByPk(id, { where: { uid } });
  }

  /**
   * 更新
   * @param {String} id 
   * @param {Object} updateFields 
   * @return {Promise}
   */
  async updateById(id, updateFields) {
    const { ctx } = this;
    const uid = ctx.user.uid;
    return ctx.model.Memorandum.update(updateFields, { where: { uid, id } });
  }

  async deleteById(id) {
    const { ctx } = this;
    const uid = ctx.user.uid;
    return ctx.model.Memorandum.destroy({ where: { uid, id } });
  }
}

module.exports = Memorandum;
