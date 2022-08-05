// 命令行

import * as clear from 'clear-console'
import * as shell from 'shelljs'
import {
  yellow,
  green,
  blue,
} from 'chalk'
import { Feature, Interact } from '../order/create/constants'
import { SelectFeatureResult, InteractCommandType } from './types'
import { prompt } from 'inquirer'

/**
 * 项目安装成功提示
 */
export const end = (projectName: string) => {
  shell.echo(`成功创建项目 —— ${yellow(projectName)}  🧨🧨🧨🧨🧨`)
}

/**
 * 开始安装提示
 * @param name 功能名
 */
export const startInstall = (name: Feature | string) => {
  shell.echo(yellow(`开始安装 ${name} 🙄️`))
  shell.echo('')
}

/**
 * 安装完成提示
 * @param name 功能名
 */
export const successInstall = (name: Feature | string) => {
  shell.echo(green(`成功安装 ${name} 😁`))
  shell.echo('')
}

/**
 * 交互式命令行
 */
export const selectFeature = async (interactCommand: InteractCommandType[]): Promise<SelectFeatureResult> => {
  // 清空命令行
  clear()
  // 输出信息
  /* eslint-disable @typescript-eslint/no-var-requires */
  shell.echo(blue(`DAPHNIS-BASE-CLI v${require('../../package.json').version}`))
  shell.echo('开始初始化项目')
  shell.echo('')

  return await prompt(interactCommand)
}

/**
 * 安装用户选择的功能
 * @param feature 功能列表
 */
export const installFeature = (feature: SelectFeatureResult, defaultInstallFeature: () => void, interactMap: {
  [key in Interact]: (interactResult: any) => void
}) => {
  shell.echo(green('开始安装所选功能 😁'))
  shell.echo('')
  shell.echo(yellow('过程可能会有些慢呦... 🙄️'))
  shell.echo('')

  defaultInstallFeature()

  for (const key in feature) {
    interactMap[key](feature[key])
  }
}
