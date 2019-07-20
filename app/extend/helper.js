'use strict';

const _ = require('lodash');

/**
 * 过滤掉对象集合中所有为undefined和空字符串的字段
 * @param {Object} obj
 * @returns {Object}
 */
exports.filterUndefindAndEmptyByObject = (obj) => {
  if (_.isPlainObject(obj)) {
    for (let k in obj) {
      if (obj[k] === undefined || obj[k] === '') {
        delete obj[k];
      }
    }
  }
  return obj;
}

// 获取今天开始时间戳
exports.getTodayStartTimestamp = () => {
  return new Date().setHours(0, 0, 0, 0);
}
