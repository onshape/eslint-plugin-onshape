# eslint-plugin-onshape

Onshape eslint plugin

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-onshape-eslint-plugin`:

```
$ npm install eslint-plugin-onshape-eslint-plugin --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-onshape-eslint-plugin` globally.

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
        "onshape/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here
