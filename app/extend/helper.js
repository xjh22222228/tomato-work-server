'use strict'

const { isPlainObject } = require('lodash')

/**
 * 过滤掉对象集合中所有为undefined和空字符串的字段
 * @param {Object} obj
 * @returns {Object}
 */
exports.filterUndefindAndEmptyByObject = (obj) => {
  if (isPlainObject(obj)) {
    for (let k in obj) {
      if (obj[k] === undefined || obj[k] === '') {
        delete obj[k]
      }
    }
  }
  return obj
}
