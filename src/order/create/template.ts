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

export const ReactEslintrc = `
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "jsx": true,
    "useJSXTextNode": true
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "extends": ["standard", "standard-react"],
  "plugins": ["@typescript-eslint", "react-hooks"],
  "env": {
    "browser": true,
    "node": true
  },
  "ignorePatterns": ["docs/**/*"],
  "rules": {
    "no-console": "warn",
    "semi": "off",
    "no-use-before-define": "off",
    "no-multiple-empty-lines": "off",
    "no-undef": "off",
    "multiline-ternary": "off",
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "jsx-quotes": ["error", "prefer-double"],
    "comma-dangle": ["error", "only-multiline"],
    "react/jsx-handler-names": "off",
    "react/jsx-fragments": ["error", "syntax"],
    "react/jsx-wrap-multilines": [
      "error",
      { "declaration": "parens-new-line" }
    ],
    "operator-linebreak": ["error", "before"],
    "standard/no-callback-literal": "off"
  },
  "overrides": [
    {
      "files": ["*.ts", "*.tsx"],
      "rules": {
        "@typescript-eslint/semi": ["error", "never"],
        "@typescript-eslint/member-delimiter-style": ["error", {
          "multiline": { "delimiter": "none" },
          "singleline": { "delimiter": "comma", "requireLast": false }
        }],
        "@typescript-eslint/indent": ["error", 2, { "SwitchCase": 1 }],
        "no-unused-vars": "off",
        "dot-notation": "off",
        "quote-props": "off",
        "no-useless-rename": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            "vars": "all",
            "args": "after-used",
            "ignoreRestSiblings": true
          }
        ],
        "react/prop-types": "off",
        "react/jsx-no-target-blank": [
          "error",
          { "enforceDynamicLinks": "always" }
        ],
        "react-hooks/rules-of-hooks": "error"
      }
    }
  ]
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
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'always',
  rangeStart: 0,
  rangeEnd: Infinity,
  requirePragma: false,
  insertPragma: false,
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'css',
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
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/npm-debug.log*
/yarn-error.log
/package-lock.json

# production
/dist
/docs
/.docz

# misc
.DS_Store

# umi
.umi
.umi-production
.umi-test
.env.local
.mfsu-production
`

export const TsconfigJson = `{
  "compilerOptions": {
    "target": "ES6",
    "module": "esnext",
    "moduleResolution": "node",
    "importHelpers": true,
    "jsx": "react",
    "esModuleInterop": true,
    "sourceMap": true,
    "strict": true,
    "skipLibCheck": true,
    "allowSyntheticDefaultImports": true,
    "baseUrl": ".",
    "outDir": "./dist",
    "declaration": true,
    "declarationDir": "./dist",
    "paths": {
      "newProject": ["./src"],
    }
  },
  "include": ["src/**/*", "tests/**/*"],
}`

export const Eslintignore = `
**/*.svg
package.json
package-lock.json
coverage/
yarn.lock
netlify.toml
yarn-error.log
*.sh
*.snap
.gitignore
.npmignore
.prettierignore
.DS_Store
.editorconfig
.eslintignore
**/*.yml
node_modules/**/*
**/*.d.ts
**/*.md
**/*.less
config/
dist/
lib/
`

export const TypingsDTs = `
declare module '*.css';
declare module '*.less';

declare namespace jest {
  interface Matchers<R> {
    toMatchRenderedSnapshot(): R
  }
}
`
export const TsconfigBuildJson = `
{
  "extends": "./tsconfig",
  "include": ["src/**/*"],
  "exclude": ["src/**/__demos__/*", "src/**/__tests__/*"]
}
`

export const RollupConfigJs = `
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import eslint from '@rollup/plugin-eslint'
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json'
import postcss from 'rollup-plugin-postcss'

const commonBundleConfigs = {
  name: 'newProject',
  format: 'umd',
  sourcemap: true,
}

export default {
  input: 'src/index.ts',

  output: [
    {
      ...commonBundleConfigs,
      file: 'dist/index.umd.js',
    },
    {
      ...commonBundleConfigs,
      file: 'dist/index.umd.min.js',
      plugins: [
        terser(),
      ],
    },
  ],

  plugins: [
    resolve({
      browser: true,
      preferBuiltins: true,
    }),
    commonjs({
      transformMixedEsModules: true,
      include: /node_modules/,
    }),
    typescript(),
    eslint(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime'
    }),
    postcss(),
    json(),
  ],
}
`

export const Babelrc = `
// Babel 配置
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react",
    [
      "@babel/preset-typescript",
      {
        "onlyRemoveTypeImports": true
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime"
    ]
  ],
  "ignore": [
    "node_modules/**"
  ]
}
`

export const ReleaseJs = `
#!/usr/bin/env node

const { prompt } = require('inquirer')
const { inc } = require('semver')
const { echo, exec } = require('shelljs')
const { green, yellow } = require('chalk')
const { version } = require('../package.json')

const major = inc(version, 'major')
const minor = inc(version, 'minor')
const patch = inc(version, 'patch')

prompt([
  {
    type: 'list',
    message: '选择要发布的版本号',
    name: 'releaseVersion',
    choices: [
      {
        name: '主版本: V ' + version + ' => V ' + major,
        value: major,
      },
      {
        name: '次版本: V ' + version + ' => V ' + minor,
        value: minor,
      },
      {
        name: '补丁版本: V ' + version + ' => V ' + patch,
        value: patch,
      },
    ],
  },
]).then(({ releaseVersion }) => {
  echo(yellow('修改版本号 😁'))
  exec('npm version ' + releaseVersion + ' --no-git-tag-version')
  echo('')

  echo(yellow('Changelog 😁'))
  exec('npm run changelog')
  echo('')

  echo(yellow('提交代码 😁'))
  exec('git add . && git commit -m "release: V "' + releaseVersion + ' && git push origin HEAD')
  echo('')

  echo(yellow('设置 Tag 😁'))
  exec('git tag V' + releaseVersion + ' && git -c credential.helper= push origin --progress V' + releaseVersion)
  echo('')

  echo(yellow('发布 npm 😁'))
  exec('npm run build && npm publish --access public')

  echo(green('大功告成 🧨🧨🧨🧨🧨'))
})
`

export const UmircTs = `
// config: https://d.umijs.org/config

import { defineConfig } from 'dumi'

export default defineConfig({
  title: 'newProject',
  favicon:
    'https://s2.loli.net/2022/08/14/51A6SiswhVeGnRL.png',
  logo: 'https://s2.loli.net/2022/08/14/51A6SiswhVeGnRL.png',
  outputPath: 'docs',
  mode: 'site',
  navs: [
    null,
    { title: '源码', path: '' }
  ],
  mfsu: {},
})
`
export const IndexMd = `
# Hello Jay
`

export const HelloIndexTs = `
export const Hello = () => {
  return 'Hello'
}
`
export const SrcIndexTs = `
export * from './Hello'
`
