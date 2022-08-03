// 各个功能的安装方法

import * as shell from 'shelljs'
import {
  readJsonFile,
  writeJsonFile,
  createConfigFile,
} from '../../common/operateFile'
import { writePackageScripts } from '../../common/operateFileContent'
import { PackageJSON, ScriptsCommand } from '../../common/types'
import { startInstall, successInstall } from '../../common/commandLine'
import { Feature } from './constants'
import { yellow } from 'chalk'

/**
 * 退出安装
 * @param feature 所选功能列表
 * @param f 功能名
 */
const isQuitInstall = (featureList: Feature[], feature: Feature) => !featureList.some(item => item === feature)

/**
 * 安装 Changelog
 */
export const installChangelog = (featureList: Feature[]) => {
  if (isQuitInstall(featureList, Feature.CHANGELOG)) return

  startInstall(Feature.CHANGELOG)
  shell.exec('npm i @nicecode/changelog conventional-changelog-cli -D')

  const commandList: ScriptsCommand[] = [
    {
      commandName: 'changelog',
      command: 'conventional-changelog -p angular -i CHANGELOG.md -s',
    },
  ]
  writePackageScripts(commandList)
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

  const commandList: ScriptsCommand[] = [
    {
      commandName: 'lint',
      command: 'eslint -c ./.eslintrc --ext .jsx,.js,.ts,.tsx src && stylelint ./src',
    },
    {
      commandName: 'lint-fix',
      command: 'eslint -c ./.eslintrc --ext .jsx,.js,.ts,.tsx src --fix && stylelint ./src --fix',
    },
  ]
  writePackageScripts(commandList)
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

  const commandList: ScriptsCommand[] = [
    {
      commandName: 'prettier',
      command: 'prettier --write "src/**/*.ts"',
    },
  ]
  writePackageScripts(commandList)
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

  const commandList: ScriptsCommand[] = [
    {
      commandName: 'commit-lint',
      command: 'commitlint --from origin/master --to HEAD',
    },
  ]
  writePackageScripts(commandList)
  const packageJson = readJsonFile<PackageJSON>('./package.json')
  packageJson.husky = {
    ...packageJson?.husky || {},
    hooks: {
      ...packageJson?.husky?.hooks || {},
      'pre-push': 'npm run commit-lint',
    },
  }
  createConfigFile('commitlint.config.js')
  successInstall(Feature.COMMITLINT)
}

/**
 * 安装 lint-staged
 */

const installLintStaged = () => {
  shell.exec('npm i lint-staged -D')
  shell.exec('npx husky add .husky/pre-commit "npx lint-staged" ')
  const packageJson = readJsonFile<PackageJSON>('./package.json')
  packageJson.husky = {
    ...packageJson?.husky || {},
    hooks: {
      ...packageJson?.husky?.hooks || {},
      'pre-commit': 'lint-staged',
    },
  }
}

/**
 * CommitCheckESLint
 * commit 时检查 eslint、stylelint
 */
export const installCommitCheckESLint = (featureList: Feature[]) => {
  if (isQuitInstall(featureList, Feature.COMMITCHECKESLINT)) return

  startInstall(Feature.COMMITCHECKESLINT)
  installLintStaged()
  const packageJson = readJsonFile<PackageJSON>('./package.json')
  packageJson['lint-staged'] = {
    '*.{jsx,js,ts,tsx}': ['eslint -c ./.eslintrc --ext .jsx,.js,.ts,.tsx'],
  }
  writeJsonFile<PackageJSON>('./package.json', packageJson)
  featureList.includes(Feature.STYLELINT) && installCommitCheckStylelint()
  successInstall(Feature.COMMITCHECKESLINT)
}

/**
 * commit 时检查 styleLint
 */
const installCommitCheckStylelint = () => {
  const packageJson = readJsonFile<PackageJSON>('./package.json')
  packageJson['lint-staged']['*.{css,scss,less}'] = ['stylelint']
  writeJsonFile<PackageJSON>('./package.json', packageJson)
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
