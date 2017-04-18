/**
 * Rule: top-level-describe
 * Ensures top level describe matches the test filename
 */
'use strict';

const tagRegExp = /#[\w-]+\b/g;

module.exports = {
  meta: {
    docs: {
      description: 'ensures top level describe matches test file name',
      category: 'Possible Errors',
      recommended: true
    },
    fixable: 'code',
    schema: [] // no options
  },
  create: function (context) {
    return {
      CallExpression: function (node) {
        if ((node.callee.name === 'describe' ||
             node.callee.name === 'xdescribe') &&
           node.parent.parent.parent === null) {

          let specName = context.getFilename().replace(/^.*\//, '').
            replace(/\.js$/, '').
            replace(/([a-z])(\d+)/g, '$1 $2').
            replace(/([A-Z][a-z]+)/g, ' $1');
          specName = specName.charAt(0).toUpperCase() + specName.substr(1, specName.length);
          const describeName = node.arguments[0].value.replace(tagRegExp, '').trim();

          if (specName !== describeName) {
            const fixedName = node.arguments[0].raw.replace(describeName, specName);
            context.report({
              node: node,
              message: 'Expected top level describe to match file name',
              fix: function(fixer) {
                return fixer.replaceTextRange(node.arguments[0].range, fixedName);
              }
            });
          }
        }
      }
    };
  }
};
