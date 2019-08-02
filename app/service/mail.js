'use strict';

const Service = require('egg').Service;
const qs = require('querystring');

class MailService extends Service {

  /**
   * 微信推送
   */
  wechatPush(data = {}) {
    const { ctx } = this;
    const params = qs.stringify({
      text: data.subject || '无标题',
      desp: data.text || data.html || '无内容'
    });
    
    ctx.curl(`https://sc.ftqq.com/${data.sckey}.send?${params}`);
  }


  /**
   * 发送邮件， 总是使用这个service进行发送
   * @param {Object} data
   * @return {Promise}
   */
  async send(data) {
    const { ctx, app } = this;
    let i = 3;
    // 尝试发送 i 次
    while (i--) {
      try {
        const result = await app.mailer.send(data);
        return Promise.resolve(result);
      } catch (err) {
        ctx.logger.warn(`邮箱：${data.to} 发送失败，原因：账号错误或超出邮件发送频率。`);
        if (i <= 0) {
          return Promise.reject(err);
        }
      }
    }
  }

  // 发送提醒事项
  async sendReminder() {
    const { ctx, service, config } = this;

    try {
      const data = await service.reminder.findAllNotSend();
      const user = {};
      // 合并同一用户多个事项
      data.forEach(item => {
        const { email, content, id, sckey } = item;

        if (email in user) {
          user[email].content.push(content);
          user[email].ids.push(id);
        } else {
          user[email] = {
            content: [content],
            ids: [id],
            sckey
          };
        }
      });

      // 推送
      for (let k in user) {
        const { content, ids, sckey } = user[k];
        let html = '';
        
        content.forEach((text, idx) => {
          html += `<h2>${idx + 1}：${text}</h2>`;
        });

        const data = {
          to: k,
          subject: `您有${content.length}项提醒事项 - ${config.title}`,
          html,
          sckey
        };

        service.mail.wechatPush(data);

        service.mail.send(data)
        .then(() => {
          ctx.logger.debug(`${k} 发送成功!`);
          service.reminder.updateTypeById(ids, 2);
        });
      }
    } catch (err) {
      ctx.logger.error(err);
    }
  }
}

module.exports = MailService;
