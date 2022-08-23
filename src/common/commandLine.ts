// 命令行

import * as clear from 'clear-console'
import * as shell from 'shelljs'
import {
  yellow,
  green,
  blue,
} from 'chalk'
import { Feature, Interact } from '../order/create/constants'
import { FeatSelectResult, InteractCommandType } from './types'
import { prompt } from 'inquirer'

/**
 * 项目安装成功提示
 */
export const end = (projectName: string) => {
  shell.echo(`成功创建项目 —— ${yellow(projectName)}  🧨🧨🧨🧨🧨`)
}

/**
 * 安装提示
 * @param name 功能名
 * 如果需要添加新类型
 */
export const installPoint = (featureName: Feature | string) => {
  const start = () => {
    shell.echo(yellow(`开始安装 ${featureName} 🙄️`))
    shell.echo('')
  }
  const success = () => {
    shell.echo(green(`成功安装 ${featureName} 😁`))
    shell.echo('')
  }
  return [start, success] // 为什么用 [] 而不用 {} ? 防止重名
}

/**
 * 交互式命令行
 */
export const selectFeature = async (interactCommand: InteractCommandType[]): Promise<FeatSelectResult> => {
  // 清空命令行
  clear()
  // 输出信息
  /* eslint-disable @typescript-eslint/no-var-requires */
  shell.echo(blue(`DAPHNIS-BASE-CLI V ${require('../../package.json').version}`))
  shell.echo('开始初始化项目')
  shell.echo('')

  return await prompt(interactCommand)
}

/**
 * 安装用户选择的功能
 * @param feature 功能列表
 */
export const installFeature = (feature: FeatSelectResult, initialConfig: () => void, interactMap: {
  [key in Interact]: (interactResult: any) => void
}) => {
  shell.echo(green('开始安装所选功能 😁'))
  shell.echo('')
  shell.echo(yellow('过程可能会有些慢呦... 🙄️'))
  shell.echo('')

  initialConfig()

  for (const key in feature) {
    interactMap[key](feature)
  }
}
