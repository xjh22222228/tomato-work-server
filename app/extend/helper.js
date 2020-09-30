'use strict';

const { isPlainObject } = require('lodash');
const MarkdownIt = require('markdown-it');
const anchor = require('markdown-it-anchor');
const hljs = require('highlight.js');

/**
 * 过滤掉对象集合中所有为undefined和空字符串的字段
 * @param {Object} obj
 * @returns {Object}
 */
exports.filterUndefindAndEmptyByObject = (obj) => {
  if (isPlainObject(obj)) {
    for (let k in obj) {
      if (obj[k] === undefined || obj[k] === '') {
        delete obj[k];
      }
    }
  }
  return obj;
};

// 获取今天开始时间戳
exports.getTodayStartTimestamp = () => {
  return new Date().setHours(0, 0, 0, 0);
};

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

      return '';
    }
  };

  const md = new MarkdownIt(config).use(anchor);

  const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const aIndex = tokens[idx].attrIndex('target');
    const isAnchor = tokens[idx].attrs[0][1].startsWith('#');

    if (!isAnchor) {
      if (aIndex < 0) {
        tokens[idx].attrPush(['target', '_blank']);
      } else {
        tokens[idx].attrs[aIndex][1] = '_blank';
      }
    }

    return defaultRender(tokens, idx, options, env, self);
  };

  return md;
};
