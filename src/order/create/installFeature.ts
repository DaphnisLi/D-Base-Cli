// 各个功能的安装方法

import * as shell from 'shelljs'
import { writePackage } from '../../common/operateFile'
import { installPoint } from '../../common/commandLine'
import { Feature, StandardOption, SelectResult, ReactOption } from './types'
import { yellow } from 'chalk'
import { createConfigFile } from './util'

/**
 * CheckBox 退出安装
 * @param standardOptionList 功能名
 * @param standardOption checkbox 具体的功能名
 */
const isQuitInstall = (standardOptionList: StandardOption[], standardOption: StandardOption) => !standardOptionList.some(item => item === standardOption)

/**
 * 安装 Changelog
 */
export const installChangelog = (selectResult: SelectResult) => {
  if (isQuitInstall(selectResult[Feature.STANDARD], StandardOption.CHANGELOG)) return
  const [start, success] = installPoint(StandardOption.CHANGELOG)
  start()
  shell.exec('npm i @nicecode/changelog conventional-changelog-cli -D')

  writePackage(c => {
    c.scripts = {
      ...c.scripts,
      changelog: 'conventional-changelog -p angular -i CHANGELOG.md -s',
    }
  })
  success()
}

/**
 * 安装 React ESLint 插件
 */
const installESLintPlugins = () => {
  shell.exec('npm i @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-standard eslint-config-standard-react eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-node eslint-plugin-promise eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-standard -D')
}

/**
 * 安装 ESLint
 */
export const installESLint = (selectResult: SelectResult) => {
  if (isQuitInstall(selectResult[Feature.STANDARD], StandardOption.ESLINT)) return

  const [start, success] = installPoint(StandardOption.ESLINT)
  start()
  shell.exec('npm i @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint standard -D')

  // 安装了 React, 就要安装 React 对应的 ESLint
  createConfigFile('.eslintrc', selectResult[Feature.REACT] && 'ReactEslintrc')
  selectResult[Feature.REACT] && installESLintPlugins()
  createConfigFile('.eslintignore')

  const isInstallStyleEslint = selectResult[Feature.STANDARD].includes(StandardOption.STYLELINT)
  writePackage(c => {
    c.scripts = {
      ...c.scripts,
      lint: `eslint -c ./.eslintrc --ext .jsx,.js,.ts,.tsx src${isInstallStyleEslint ? ' && stylelint ./src' : ''}`,
      'lint-fix': `eslint -c ./.eslintrc --ext .jsx,.js,.ts,.tsx src --fix${isInstallStyleEslint ? ' && stylelint ./src --fix' : ''}`,
    }
  })
  success()
}

/**
 * 安装 Stylelint
 */
export const installStylelint = (selectResult: SelectResult) => {
  if (isQuitInstall(selectResult[Feature.STANDARD], StandardOption.STYLELINT)) return

  const [start, success] = installPoint(StandardOption.STYLELINT)
  start()
  shell.exec('npm i stylelint stylelint-config-standard -D')
  createConfigFile('.stylelintrc')
  success()
}

/**
 * 安装 Prettier
 * 虽然我不用这个功能, 但我也要提供一下
 */
export const installPrettier = (selectResult: SelectResult) => {
  if (isQuitInstall(selectResult[Feature.STANDARD], StandardOption.PRETTIER)) return

  const [start, success] = installPoint(StandardOption.PRETTIER)
  start()
  shell.exec('npm i prettier -D')
  createConfigFile('.prettierrc')

  writePackage(c => {
    c.scripts = {
      ...c.scripts,
      prettier: 'prettier --write "src/**/*.ts"',
    }
  })
  success()
}

/**
 * 安装 Editorconfig
 */
export const installEditorconfig = (selectResult: SelectResult) => {
  if (isQuitInstall(selectResult[Feature.STANDARD], StandardOption.EDITORCONFIG)) return

  const [start, success] = installPoint(StandardOption.EDITORCONFIG)
  start()
  createConfigFile('.editorconfig')
  success()
}

/**
 * 安装 Husky
 */
export const installHusky = (selectResult: SelectResult) => {
  const lint = [StandardOption.COMMITLINT, StandardOption.COMMITCHECKESLINT]
  const isInstallHusky = selectResult[Feature.STANDARD].some(item => lint.includes(item))
  if (!isInstallHusky) return

  shell.exec('npm i husky -D')
  shell.exec('npx husky install')
}

/**
 * Commitlint
 * push 时检查 commitMessage 是否 符合规范
 */
export const installCommitlint = (selectResult: SelectResult) => {
  if (isQuitInstall(selectResult[Feature.STANDARD], StandardOption.COMMITLINT)) return

  const [start, success] = installPoint(StandardOption.COMMITLINT)
  start()
  shell.exec('npm i @commitlint/cli @commitlint/config-conventional -D')
  shell.exec('npx husky add .husky/pre-push "npm run commit-lint" ')

  writePackage(c => {
    c.scripts = {
      ...c.scripts,
      'commit-lint': 'commitlint --from origin/master --to HEAD',
    }
    c.husky = {
      ...c.husky,
      hooks: {
        ...c.husky?.hooks,
        'pre-push': 'npm run commit-lint',
      },
    }
  })

  createConfigFile('commitlint.config.js')
  success()
}

/**
 * 安装 lint-staged
 */
const installLintStaged = () => {
  shell.exec('npm i lint-staged -D')
  shell.exec('npx husky add .husky/pre-commit "npx lint-staged" ')

  writePackage(c => {
    c.husky = {
      ...c.husky,
      hooks: {
        ...c.husky.hooks,
        'pre-commit': 'lint-staged',
      },
    }
  })
}

/**
 * CommitCheckESLint
 * commit 时检查 eslint、stylelint
 */
export const installCommitCheckESLint = (selectResult: SelectResult) => {
  if (isQuitInstall(selectResult[Feature.STANDARD], StandardOption.COMMITCHECKESLINT)) return

  const [start, success] = installPoint(StandardOption.COMMITCHECKESLINT)
  start()
  installLintStaged()

  writePackage('lint-staged', {
    '*.{jsx,js,ts,tsx}': ['eslint -c ./.eslintrc --ext .jsx,.js,.ts,.tsx'],
  })

  selectResult[Feature.STANDARD].includes(StandardOption.STYLELINT) && installCommitCheckStylelint()
  success()
}

/**
 * commit 时检查 styleLint
 */
const installCommitCheckStylelint = () => {
  writePackage(c => {
    c['lint-staged'] = {
      ...c['lint-staged'],
      '*.{css,scss,less}': ['stylelint'],
    }
  })
}

/**
 * 安装 @types/node
 * 这是 node.js 的类型定义包
 */
export const installTypesNode = () => {
  const [start, success] = installPoint('@types/node')
  start()
  shell.exec('npm i @types/node -D')
  success()
}

/**
 * git 初始化
 */
export const installGitignore = () => {
  shell.echo(yellow('创建 .gitignore'))
  createConfigFile('.gitignore')
  shell.touch('README.md')
}

/**
 * 安装 TypeScript
 */
export const installTypeScript = () => {
  const [start, success] = installPoint(Feature.TYPESCRIPT)
  start()
  shell.exec('npm i typescript -D')
  createConfigFile('tsconfig.json')
  success()
}

/**
 * 安装 React
 */
export const installReact = () => {
  const [start, success] = installPoint(Feature.REACT)
  start()
  shell.exec('npm i react@16 react-dom@16 -S') // 最好是安装在 peerDependencies 中, 因为基础包不需要用 react, 用宿主环境的即可

  writePackage(c => {
    c.peerDependencies = {
      ...c?.peerDependencies,
      react: c.dependencies.react,
      'react-dom': c.dependencies['react-dom'],
    }
    delete c.dependencies.react
    delete c.dependencies['react-dom']
  })
  success()
}

/**
 * 安装 Rollup plugins
 */
const installRollupPlugins = () => {
  shell.exec('npm i rollup-plugin-postcss rollup-plugin-terser @rollup/plugin-commonjs @rollup/plugin-eslint @rollup/plugin-node-resolve @rollup/plugin-typescript -D')
}

/**
 * 创建 Typings.d.ts
 */
const installTypingsDTs = () => {
  createConfigFile('typings.d.ts')
  writePackage('typings', 'dist/index.d.ts')
}

/**
 * 创建 tsconfig.build.json
 */
const installTsconfigBuildJson = () => {
  createConfigFile('tsconfig.build.json')
}

/**
 * Rollup 默认安装
 */
const defaultRollup = () => {
  installRollupPlugins()
  installTypingsDTs()
  installTsconfigBuildJson()
}

/**
 * 安装 Rollup
 */
export const installRollup = () => {
  const [start, success] = installPoint(ReactOption.ROLLUP)
  start()
  shell.exec('npm i rollup -D')
  defaultRollup()
  createConfigFile('rollup.config.js')
  writePackage(c => {
    c.main = 'dist/index.umd.js'
    c.module = 'dist/index.js'
    c.scripts = {
      ...c.scripts,
      build: 'rm -rf dist && tsc -p ./tsconfig.build.json && rollup --config',
    }
  })
  success()
}

/**
 * 安装发布脚本
 */
export const installRelease = () => {
  shell.exec('npm i inquirer@7 semver shelljs chalk@4 -D')
  shell.mkdir('scripts')
  shell.cd('scripts')
  createConfigFile('release.js')
  shell.cd('../')
  writePackage(c => {
    c.scripts = {
      ...c.scripts,
      release: './scripts/release.js',
    }
  })
}

/**
 * 安装 Dumi
 */
export const installDumi = () => {
  const [start, success] = installPoint(Feature.DUMI)
  start()
  shell.exec('npm i dumi -D')
  createConfigFile('.umirc.ts')
  writePackage(c => {
    c.scripts = {
      ...c.scripts,
      start: 'dumi dev',
      'docs:build': 'dumi build',
    }
  })
  success()
}

/**
 * 新建 src 目录
 */
export const mkdirSrc = () => {
  shell.mkdir('src')
  shell.cd('src')
  createConfigFile('index.md')
  createConfigFile('index.ts', 'SrcIndexTs')
  shell.mkdir('Hello')
  shell.cd('Hello')
  createConfigFile('index.ts', 'HelloIndexTs')
  shell.cd('../../')
}
