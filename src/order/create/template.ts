// 模版 —— 后期放在 github 中, 通过 github 提供的 service 来获取模版, 但是要考虑, 会不会使 cli 执行时间过长

export const Eslintrc = `{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "standard"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "comma-dangle": ["error", "always-multiline"],
    "operator-linebreak": ["error", "before"],
    "space-before-function-paren": [
      "error",
      { "anonymous": "always", "named": "always", "asyncArrow": "always" }
    ],
    "handle-callback-err": "off",
    "camelcase": "off",
    "no-use-before-define": "off"
  }
}`

export const Stylelintrc = `{
  "extends": "stylelint-config-standard",
  "rules": {
    "indentation": 2,
    "font-family-no-missing-generic-family-keyword": null,
    "at-rule-no-unknown": [true, {
        "ignoreAtRules": ["for", "function", "if", "each", "include", "mixin", "else"]
    }],
    "no-descending-specificity": null
  },
  "ignoreFiles": [
    "dist/**",
    "docs/**",
    "**/*.ts",
    "**/*.tsx",
    "**/*.js",
    "**/*.jsx",
    "**/*.snap"
  ]
}`

export const Prettierrc = `{
  // 一行最多 80 字符
  printWidth: 80,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用 tab 缩进，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: true,
  // 使用单引号代替双引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾使用逗号
  trailingComma: 'all',
  // 大括号内的首尾需要空格 { foo: bar }
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 换行符使用 lf
  endOfLine: 'lf'
}`

export const Editorconfig = `
# http://editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
`

export const CommitlintConfigJs = `module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'revert', 'release', 'chore']],
    'subject-case': [
      2,
      'always',
      ['lower-case', 'camel-case', 'snake-case', 'kebab-case', 'sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
  },
}`

export const Gitignore = `
node_modules
`

export const TsconfigJson = `{
  "compileOnSave": true,
  "compilerOptions": {
    "target": "ES2018",
    "module": "commonjs",
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "inlineSourceMap":true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "stripInternal": true,
    "pretty": true,
    "declaration": true,
    "outDir": "lib",
    "baseUrl": "./",
    "paths": {
      "*": ["src/*"]
    }
  },
  "exclude": [
    "lib",
    "node_modules",
    "test"
  ]
}`
