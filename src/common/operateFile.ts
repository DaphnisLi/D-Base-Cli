// 操作文件

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve } from 'path'
import * as shell from 'shelljs'
import { red } from 'chalk'
import { analyseFileName } from './libs'
import * as template from '../order/create/template'

/**
 * 读取指定路径下 json 文件
 * @param filePath json 文件的路径, 这里是相对路径, 相对于项目根目录的路径
 */
export const readJsonFile = <T>(filePath: string): T => {
  return JSON.parse(readFileSync(filePath, { encoding: 'utf-8' }))
}

/**
 * 覆写指定路径下的 json 文件
 * @param filePath json 文件的路径, 这里是相对路径, 相对于项目根目录的路径
 * @param content  json 内容
 */
export const writeJsonFile = <T>(filePath: string, content: T): void => {
  writeFileSync(filePath, JSON.stringify(content, null, 2))
}

/**
 * 获取项目绝对路径
 * @param projectName 项目名
 * process.cwd() 进程当前工作目录
 * return 工作目录/projectName
 */
export const getProjectPath = (projectName: string): string => {
  return resolve(process.cwd(), projectName)
}

/**
 * 创建配置文件
 * @param fileName 文件名
 */
export const createConfigFile = (fileName: string) => {
  try {
    writeFileSync(`./${fileName}`, template[analyseFileName(fileName)], { encoding: 'utf-8' })
  } catch (err) {
    shell.echo(`${red(err)}`)
    shell.echo(`${red(`无法写入 ${fileName} 文件内容`)}`)
    shell.echo(`${red(`请在 ${fileName} 中添加以下内容`)}`)
    shell.echo(`${red(analyseFileName(fileName))}`)
  }
}

/**
 * 初始化项目目录
 */
export const initProjectDir = (projectName: string) => {
  shell.exec(`mkdir ${projectName}`)
  shell.cd(projectName)
  shell.exec('npm init -y') // 初始化 npm
}

/**
 * 验证当前目录下是否已经存在指定文件，如果存在则退出进行
 * @param filename 文件名
 */
export const isFileExist = (filename: string) => {
  // 文件绝对路径
  const file = getProjectPath(filename)
  // 验证文件是否已经存, 存在则退出进程
  if (existsSync(file)) {
    shell.echo(red(`${file} 已经存在`))
    process.exit(1) // 失败, 退出进程 0 | 1
  }
}
