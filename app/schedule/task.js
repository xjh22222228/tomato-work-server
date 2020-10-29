const Subscription = require('egg').Subscription

class Task extends Subscription {
  static get schedule() {
    return {
      // 每天 00:01:00
      cron: '0 1 0 * * *',
      type: 'all',
    }
  }

  async subscribe() {
    const { service, ctx } = this
    try {
      service.task.updateAllTodayBeforeType()
    } catch (err) {
      ctx.logger.error(err)
    }
  }
}

module.exports = Task
