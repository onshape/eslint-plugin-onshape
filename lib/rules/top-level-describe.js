/**
 * Rule: top-level-describe
 * Ensures top level describe matches the test filename
 */

const tagRegExp = /#[\w-]+\b/g;

module.exports = {
  create: function (context) {
    return {
      CallExpression: function (node) {
        if (node.callee.name === 'describe' &&
           node.parent.parent.parent === null) {

          let specName = context.getFilename().replace(/^.*\//, '').
            replace(/\.js$/, '').
            replace(/([a-z])(\d+)/g, '$1 $2').
            replace(/([A-Z][a-z]+)/g, ' $1');
          specName = specName.charAt(0).toUpperCase() + specName.substr(1, specName.length);
          let describeName = node.arguments[0].value.replace(tagRegExp, '').trim();

          if (specName !== describeName) {
            const fixedName = node.arguments[0].raw.replace(describeName, specName);
            context.report({ node: node,
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