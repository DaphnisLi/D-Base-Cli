// 命令行

import * as clear from 'clear-console'
import * as shell from 'shelljs'
import {
  yellow,
  green,
} from 'chalk'
import { Feature } from '../order/create/constants'

/**
 * 清空命令行
 */
export const clearConsole = () => {
  clear()
}

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
