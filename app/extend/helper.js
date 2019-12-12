'use strict';

const _ = require('lodash');
const MarkdownIt = require('markdown-it');
const hljs = require('highlight.js');

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

// 解析 markdown
exports.markdown = function () {
  const config = {
    // 启用html, 否则markdown中出现标签会以纯文本渲染
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch {}
      }
  
      return ''; // use external default escaping
    }
  };
  
  const md = MarkdownIt(config);
  
  const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };
  
  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    // If you are sure other plugins can't add `target` - drop check below
    const aIndex = tokens[idx].attrIndex('target');
  
    if (aIndex < 0) {
      tokens[idx].attrPush(['target', '_blank']); // add new attribute
    } else {
      tokens[idx].attrs[aIndex][1] = '_blank';    // replace value of existing attr
    }
  
    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self);
  };

  return md;
}
