'use strict'

const Service = require('egg').Service
const dayjs = require('dayjs')

class CompanyService extends Service {

  /**
   * 一次性查询全部，因为公司不会有很多
   * @param {Number} uid
   * @return {Promise}
   */
  async findAllByUid(uid) {
    const { ctx } = this
    uid = uid || ctx.user.uid

    return ctx.model.Company.findAndCountAll({
      where: {
        uid,
      },
      raw: true,
      order: [['startDate', 'DESC']],
    })
  }

  /**
   * 新增单位
   * @param {Object} data
   * @return {Promise}
   */
  async create(data) {
    const { ctx } = this
    const uid = ctx.user.uid
    data.uid === undefined && (data.uid = uid)
    return ctx.model.Company.create(data)
  }

  /**
   * 删除单位
   * @param {Number} id
   * @return {Promise}
   */
  async deleteById(id) {
    const uid = this.ctx.user.uid
    const ids = String(id).split(',')
    return this.ctx.model.Company.destroy({
      where: {
        uid,
        id: { [this.ctx.Op.in]: ids }
      }
    })
  }

  /**
   * 更新单位信息
   * @return {Promise}
   */
  async updateById(id, updateFields) {
    const { ctx } = this

    return ctx.model.Company.update(updateFields, {
      where: {
        uid: ctx.user.uid,
        id
      }
    })
  }
}

module.exports = CompanyService
