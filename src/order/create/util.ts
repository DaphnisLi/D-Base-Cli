// create 命令用户交互逻辑

import { clearConsole } from '../../common/commandLine'
import { prompt } from 'inquirer'
import {
  blue,
  green,
  yellow,
} from 'chalk'
import * as shell from 'shelljs'
import {
  installChangelog,
  installESLint,
  installStylelint,
  installPrettier,
  installEditorconfig,
  installTypesNode,
  installHusky,
  installCommitCheckESLint,
  installCommitlint,
  initRepository,
} from './installFeature'
import { SelectFeatureResult } from '../../common/types'
import { Interact, Feature } from './constants'

/**
 * 交互式命令行，让用户自己选择需要的功能
 * return ['ESLint', 'Prettier', 'CZ']
 */
export const selectFeature = async (): Promise<SelectFeatureResult> => {
  // 清空命令行
  clearConsole()
  // 输出信息
  /* eslint-disable @typescript-eslint/no-var-requires */
  shell.echo(blue(`DAPHNIS-BASE-CLI v${require('../../../package.json').version}`))
  shell.echo('开始初始化项目')
  shell.echo('')

  return await prompt([
    {
      name: Interact.STANDARD,
      type: 'checkbox',
      message: '选择需要安装的基础功能, 使用空格多选.',
      choices: [
        { name: Feature.CHANGELOG, value: Feature.CHANGELOG },
        { name: Feature.ESLINT, value: Feature.ESLINT },
        { name: Feature.STYLELINT, value: Feature.STYLELINT },
        { name: Feature.PRETTIER, value: Feature.PRETTIER },
        { name: Feature.EDITORCONFIG, value: Feature.EDITORCONFIG },
        { name: Feature.COMMITLINT, value: Feature.COMMITLINT },
        { name: Feature.COMMITCHECKESLINT, value: Feature.COMMITCHECKESLINT },
      ],
    },
    {
      type: Interact.CONFIRM,
      name: 'confirm',
      message: '是否安装完成',
    },
  ])
}

/**
 * 默认安装的功能
 */
const defaultInstallFeature = () => {
  installTypesNode()
}

/**
 * 安装用户选择的功能
 * @param feature 功能列表
 */
export const installFeature = (feature: SelectFeatureResult) => {
  shell.echo(green('开始安装所选功能 😁'))
  shell.echo('')
  shell.echo(yellow('过程可能会有些慢呦... 🙄️'))
  shell.echo('')

  defaultInstallFeature()

  // TODO 这块设计的不好, 后面想想办法优化下
  for (const key in feature) {
    if (key === Interact.STANDARD) {
      initRepository()
      installHusky(feature[key])
      installChangelog(feature[key])
      installESLint(feature[key])
      installStylelint(feature[key])
      installPrettier(feature[key])
      installEditorconfig(feature[key])
      installCommitlint(feature[key])
      installCommitCheckESLint(feature[key])
    }
  }
}
