// 模版

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
}
`

export const ReactEslintrc = `{
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
}
`

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
}
`

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
}
`

export const Editorconfig = `# http://editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
`

export const CommitlintConfigJs = `// feat: 新特性
// fix: 修改问题
// refactor: 代码重构
// docs: 文档修改
// style: 样式修改 (我知道是代表代码格式不代表样式, 但我就用它来代表样式, so what!)
// test: 测试用例修改
// chore: 构建流程、依赖管理
// revert: revert 前一个 commit
// release: 发布 NPM
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'revert', 'release', 'chore']],
    'subject-case': [
      2,
      'always',
      ['lower-case', 'camel-case', 'snake-case', 'kebab-case', 'sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
  },
}
`

export const Gitignore = `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

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
    "rootDir": "./",
    "baseUrl": "./src",
    "paths": {
      "newProject": ["."],
    }
  },
  "include": ["src/**/*", "tests/**/*", "./typings.d.ts"],
}
`

export const Eslintignore = `**/*.svg
package-lock.json
coverage/
*.snap
.gitignore
.npmignore
.editorconfig
.eslintignore
node_modules/**/*
**/*.d.ts
**/*.md
config/
dist/
lib/
`

export const TypingsDTs = `// 声明全局类型
// import { LoDashStatic } from 'lodash'

// 作用于 import styles from '*.css', 不然会报错
declare module '*.less'
declare module '*.css'

// lodash 全局 type
// declare global {
//   const _: LoDashStatic
// }

`
export const TsconfigBuildJson = `{
  "extends": "./tsconfig",
  "include": ["src/**/*"],
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "dist",
    "outDir": "dist",
    "rootDir": "./src"
  },
  "exclude": ["src/**/__demos__/*", "src/**/__tests__/*"]
}
`

export const RollupConfigJs = `import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss'

const commonBundleConfigs = {
  name: 'newProject',
  format: 'umd',
  sourcemap: true,
  globals: {
    react: 'React',
  },
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
    postcss(),
  ],

  external: [
    'react',
  ],
}
`

export const ReleaseJs = `#!/usr/bin/env node

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

export const DumircTs = `// config: https://d.umijs.org/config

import { defineConfig } from 'dumi'

const logo = 'https://s2.loli.net/2022/08/14/51A6SiswhVeGnRL.png'

export default defineConfig({
  title: '',
  logo,
  favicons: [logo],
  hash: true,
  outputPath: 'dist-docs',
  devtool: 'eval',
  history: { type: 'hash' },
  themeConfig: {
    socialLinks: {
      github: ''
    }
  }
})

`

export const IndexMd = `# Hello Jay
`

export const HelloIndexTs = `export const Hello = () => {
  return 'Hello Jay'
}
`
export const SrcIndexTs = `export * from './Hello'
`
