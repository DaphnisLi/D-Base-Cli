// 各个功能的安装方法

import * as shell from 'shelljs'
import { createConfigFile } from '../../common/operateFile'
import { writePackage } from '../../common/operateFileContent'
import { startInstall, successInstall } from '../../common/commandLine'
import { Feature } from './constants'
import { yellow } from 'chalk'

/**
 * 退出安装, 适用于 checkbox
 * @param featureList 所选功能列表
 * @param feature 功能名
 */
const isQuitInstall = (featureList: Feature[], feature: Feature) => !featureList.some(item => item === feature)

/**
 * 安装 Changelog
 */
export const installChangelog = (featureList: Feature[]) => {
  if (isQuitInstall(featureList, Feature.CHANGELOG)) return

  startInstall(Feature.CHANGELOG)
  shell.exec('npm i @nicecode/changelog conventional-changelog-cli -D')

  writePackage(c => {
    c.scripts = {
      ...c.scripts,
      changelog: 'conventional-changelog -p angular -i CHANGELOG.md -s',
    }
  })
  successInstall(Feature.CHANGELOG)
}

/**
 * 安装 ESLint
 */
export const installESLint = (featureList: Feature[]) => {
  if (isQuitInstall(featureList, Feature.ESLINT)) return

  startInstall(Feature.ESLINT)
  shell.exec('npm i @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint standard -D')
  createConfigFile('.eslintrc')
  createConfigFile('.eslintignore')
  writePackage(c => {
    c.scripts = {
      ...c.scripts,
      lint: 'eslint -c ./.eslintrc --ext .jsx,.js,.ts,.tsx src && stylelint ./src',
      'lint-fix': 'eslint -c ./.eslintrc --ext .jsx,.js,.ts,.tsx src --fix && stylelint ./src --fix',
    }
  })
  successInstall(Feature.ESLINT)
}

/**
 * 安装 Stylelint
 */
export const installStylelint = (featureList: Feature[]) => {
  if (isQuitInstall(featureList, Feature.STYLELINT)) return

  startInstall(Feature.STYLELINT)
  shell.exec('npm i stylelint stylelint-config-standard -D')
  createConfigFile('.stylelintrc')
  successInstall(Feature.STYLELINT)
}

/**
 * 安装 Prettier
 * 虽然我不用这个功能, 但我也要提供一下
 */
export const installPrettier = (featureList: Feature[]) => {
  if (isQuitInstall(featureList, Feature.PRETTIER)) return

  startInstall(Feature.PRETTIER)
  shell.exec('npm i prettier -D')
  createConfigFile('.prettierrc')

  writePackage(c => {
    c.scripts = {
      ...c.scripts,
      prettier: 'prettier --write "src/**/*.ts"',
    }
  })
  successInstall(Feature.PRETTIER)
}

/**
 * 安装 Editorconfig
 */
export const installEditorconfig = (featureList: Feature[]) => {
  if (isQuitInstall(featureList, Feature.EDITORCONFIG)) return

  startInstall(Feature.EDITORCONFIG)
  createConfigFile('.editorconfig')
  successInstall(Feature.EDITORCONFIG)
}

/**
 * 安装 Husky
 */
export const installHusky = (featureList: Feature[]) => {
  const lint = [Feature.COMMITLINT, Feature.COMMITCHECKESLINT]
  const isInstallHusky = featureList.some(item => lint.includes(item))
  if (!isInstallHusky) return

  shell.exec('npm i husky -D')
  shell.exec('npx husky install')
}

/**
 * Commitlint
 * push 时检查 commitMessage 是否 符合规范
 */
export const installCommitlint = (featureList: Feature[]) => {
  if (isQuitInstall(featureList, Feature.COMMITLINT)) return

  startInstall(Feature.COMMITLINT)
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
        ...c.husky.hooks,
        'pre-push': 'npm run commit-lint',
      },
    }
  })

  createConfigFile('commitlint.config.js')
  successInstall(Feature.COMMITLINT)
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
export const installCommitCheckESLint = (featureList: Feature[]) => {
  if (isQuitInstall(featureList, Feature.COMMITCHECKESLINT)) return

  startInstall(Feature.COMMITCHECKESLINT)
  installLintStaged()

  writePackage('lint-staged', {
    '*.{jsx,js,ts,tsx}': ['eslint -c ./.eslintrc --ext .jsx,.js,.ts,.tsx'],
  })

  featureList.includes(Feature.STYLELINT) && installCommitCheckStylelint()
  successInstall(Feature.COMMITCHECKESLINT)
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
  startInstall('@types/node')
  shell.exec('npm i @types/node -D')
  successInstall('@types/node')
}

/**
 * git 初始化
 */
export const initRepository = () => {
  shell.echo(yellow('git 初始化'))
  shell.exec('git init')
  createConfigFile('.gitignore')
}

/**
 * 安装 TypeScript
 */
export const installTypeScript = (isInstallTypeScript: boolean) => {
  if (!isInstallTypeScript) return
  startInstall(Feature.TYPESCRIPT)
  shell.exec('npm i typescript -D')
  createConfigFile('tsconfig.json')
  successInstall(Feature.TYPESCRIPT)
}
