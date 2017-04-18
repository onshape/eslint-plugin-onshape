/**
 * Rule: require-tags
 * Ensures all top level describes contain a tag
 */
'use strict';

const tagRegExp = /#[\w-]+\b/;

module.exports = {
  meta: {
    docs: {
      description: 'require tags in top level describes',
      category: 'Possible Errors',
      recommended: true
    },
    schema: [] // no options
  },
  create: function (context) {
    return {
      CallExpression: function (node) {
        if ((node.callee.name === 'describe' ||
             node.callee.name === 'xdescribe') &&
            node.parent.parent.parent === null &&
            node.arguments[0] && node.arguments[0].value) {

          if (!tagRegExp.test(node.arguments[0].value)) {
            context.report({
              node: node,
              message: 'Expected top level describe to contain a tag'
            });
          }
        }
      }
    };
  }
};
