'use strict'

const Service = require('egg').Service
const { markdown } = require('js-ant')

class Memorandum extends Service {

  async create(data) {
    const { ctx } = this
    const uid = ctx.user.uid
    return ctx.model.Memorandum.create({ uid, ...data })
  }

  async findAllByUid() {
    const { ctx } = this
    const uid = ctx.user.uid
    let result = await ctx.model.Memorandum.findAll({
      where: { uid },
      order: [
        ['createdAt', 'DESC']
      ],
      raw: true
    })

    result = result.map(item => {
      item.html = markdown.render(item.markdown)
      return item
    })

    return result
  }

  async findByPk(id) {
    const { ctx } = this
    const uid = ctx.user.uid
    const result = await ctx.model.Memorandum.findByPk(id, { where: { uid }, raw: true })
    result.html = markdown.render(result.markdown)
    return result
  }

  /**
   * 更新
   * @param {String} id
   * @param {Object} updateFields
   * @return {Promise}
   */
  async updateById(id, updateFields) {
    const { ctx } = this
    const uid = ctx.user.uid
    return ctx.model.Memorandum.update(updateFields, { where: { uid, id } })
  }

  async deleteById(id) {
    const { ctx } = this
    const uid = ctx.user.uid
    return ctx.model.Memorandum.destroy({ where: { uid, id } })
  }
}

module.exports = Memorandum
