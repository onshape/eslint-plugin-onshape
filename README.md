# eslint-plugin-onshape

Onshape eslint plugin

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-onshape`:

```
$ npm install eslint-plugin-onshape --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-onshape` globally.

## Usage

Add `onshape-eslint-plugin` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "eslint-plugin-onshape"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "onshape/top-level-describe": 2,
        "onshape/valid-tags": 2
    }
}
```

## Supported Rules

top-level-describe: enforce proper file naming that matches the description of the top level describes
valid-tags: enforce that tags match those supplied via settings.
