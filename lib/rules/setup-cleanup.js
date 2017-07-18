/**
 * Rule: setup-cleanup
 * Ensures specs contain a setup and cleanup function
 */
'use strict';

module.exports = {
  meta: {
    docs: {
      description: 'ensures specs contain a setup and cleanup function',
      category: 'Possible Errors',
      recommended: true
    },
    schema: [] // no options
  },
  create: function (context) {
    const filename = context.getFilename();
    let setup = false;
    let cleanup = false;

    return {
      CallExpression: function (node) {
        if (node.callee.name === 'setup') {
          setup = true;
        } else if (node.callee.name === 'cleanup') {
          cleanup = true;
        }
      },
      'Program:exit': function (node) {
        if (filename.endsWith('Spec.js') && !filename.includes('/unit/')) {
          if (!setup) {
            context.report({
              node: node,
              message: 'Spec does not contain a setup function'
            });
          }
          if (!cleanup) {
            context.report({
              node: node,
              message: 'Spec does not contain a cleanup function'
            });
          }
        }
      }
    };
  }
};
