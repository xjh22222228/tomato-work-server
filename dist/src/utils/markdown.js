"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const markdownit = require("markdown-it");
const markdown_it_anchor_1 = require("markdown-it-anchor");
const highlight_js_1 = require("highlight.js");
const config = {
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
        if (lang && highlight_js_1.default.getLanguage(lang)) {
            try {
                return highlight_js_1.default.highlight(str, { language: lang }).value;
            }
            catch {
                return str;
            }
        }
        return '';
    },
};
const md = markdownit(config).use(markdown_it_anchor_1.default);
const defaultRender = md.renderer.rules.link_open ||
    function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };
md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const aIndex = tokens[idx].attrIndex('target');
    const isAnchor = tokens[idx].attrs[0][1].startsWith('#');
    if (!isAnchor) {
        if (aIndex < 0) {
            tokens[idx].attrPush(['target', '_blank']);
        }
        else {
            tokens[idx].attrs[aIndex][1] = '_blank';
        }
    }
    return defaultRender(tokens, idx, options, env, self);
};
exports.default = md;
//# sourceMappingURL=markdown.js.map