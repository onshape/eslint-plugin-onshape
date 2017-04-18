/**
 * Rule: valid-tags
 * Ensures tags in describes / its are valid
 */
'use strict';

const tagRegExp = /#([\w-]+)\b/g;

const testFunctions = [
  'cit',
  'cleanup',
  'describe',
  'it',
  'mdescribe',
  'mit',
  'retryIt',
  'setup',
  'xcit',
  'xdescribe',
  'xit',
  'xmdescribe',
  'xmit',
  'xretryIt'
];

const editDistance = function(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  let i;
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [ i ];
  }

  let j;
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1,
                                Math.min(matrix[i][j - 1] + 1,
                                         matrix[i - 1][j] + 1));
      }
    }
  }

  return matrix[b.length][a.length];
};

const bestMatch = function(tags, invalidTag) {
  let bestTag = false;
  let bestDistance = 3;
  for (const tag of tags) {
    const distance = editDistance(tag, invalidTag);
    if (distance <= bestDistance) {
      bestDistance = distance;
      bestTag = tag;
    }
  }
  return bestTag;
};

module.exports = {
  meta: {
    docs: {
      description: 'validates tags used in descibe/it statements',
      category: 'Possible Errors',
      recommended: true
    },
    fixable: 'code',
    schema: [] // no options
  },
  create: function (context) {
    return {
      CallExpression: function (node) {
        if (context.settings && context.settings.tags &&
            testFunctions.includes(node.callee.name) &&
            node.arguments[0] && node.arguments[0].value) {
          const testTags = [ ];
          node.arguments[0].value.replace(tagRegExp, function(match, tag) {
            testTags.push(tag);
          });

          if (testTags.length) {
            for (const tag of testTags) {
              let found = false;
              for (const validTag of context.settings.tags) {
                if ((validTag instanceof RegExp && validTag.test(tag)) || validTag === tag) {
                  found = true;
                  break;
                }
              }

              if (!found) {
                const suggestion = bestMatch(context.settings.tags, tag);
                if (suggestion) {
                  const fixedTag = node.arguments[0].raw.replace(`#${tag}`, `#${suggestion}`);
                  context.report({
                    node: node,
                    message: `#${tag} is not a valid tag, did you mean #${suggestion}?`,
                    fix: function(fixer) {
                      return fixer.replaceTextRange(node.arguments[0].range, fixedTag);
                    }
                  });
                } else {
                  context.report({
                    node: node,
                    message: `#${tag} is not a valid tag.`
                  });
                }
              }
            }
          }
        }
      }
    };
  }
};
