/**
 * Rule: describe-whitespace
 * Ensures no leading or trailing whitespace in describes and its
 */
'use strict';

const calleeNames = [
  'describe',
  'xdescribe',
  'mdescribe',
  'xmdescribe',
  'it',
  'xit',
  'cit',
  'xcit',
  'mit',
  'xmit',
  'retryIt',
  'xretryIt'
];

module.exports = {
  meta: {
    docs: {
      description: 'ensures no leading or trailing whitespace in describe/it descriptions',
      category: 'Possible Errors',
      recommended: true
    },
    fixable: 'code',
    schema: [] // no options
  },
  create: function (context) {
    return {
      CallExpression: function (node) {
        if (calleeNames.includes(node.callee.name) && node.arguments[0].value) {
          const description = node.arguments[0].value.toString();
          const trimmed = description.trim();
          if (description !== trimmed) {
            const fixed = node.arguments[0].raw.replace(description, trimmed);
            context.report({
              node: node,
              message: 'Unexpected leading or trailing whitespace in description',
              fix: function(fixer) {
                return fixer.replaceTextRange(node.arguments[0].range, fixed);
              }
            });
          }
        }
      }
    };
  }
};
