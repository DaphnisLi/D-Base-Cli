// 操作文件

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve } from 'path'
import * as shell from 'shelljs'
import { red, yellow, green } from 'chalk'
import { PackageJSON } from './types'
import { set } from 'lodash'

/**
 * 读取指定路径下 json 文件内容
 * @param filePath json 文件的路径, 这里是相对路径, 相对于项目根目录的路径
 */
export const readJsonFile = <T>(filePath: string): T => {
  return JSON.parse(readFileSync(filePath, { encoding: 'utf-8' }))
}

/**
 * 覆写指定路径下的 json 文件内容
 * @param filePath json 文件的路径, 这里是相对路径, 相对于项目根目录的路径
 * @param content  json 内容
 */
export const writeJsonFile = <T>(filePath: string, content: T) => {
  writeFileSync(filePath, JSON.stringify(content, null, 2))
}

/**
 * 获取项目绝对路径
 * @param projectName 项目名
 * process.cwd() 进程当前工作目录
 * return 工作目录/projectName
 */
export const getProjectPath = (projectName: string) => {
  return resolve(process.cwd(), projectName)
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

/**
 * 初始化项目目录
 */
export const initProjectDir = (projectName: string) => {
  shell.cd(projectName)
  shell.exec('git init')
  shell.exec('npm init -y')
}

/**
 * 初始化 Git 仓库
 */
export const initRepository = (repositoryUrl: string, projecrName: string) => {
  shell.echo(yellow('开始克隆仓库 🙄️'))
  shell.exec(`git clone ${repositoryUrl}`)
  initProjectDir(projecrName)
  shell.echo(green('克隆仓库成功 😁'))
}

/**
 * 修改 package 文件
 *
 * writePackage('name', 'Daphnis')
 *
 * writePackage({ 'name': 'Daphnis', 'version': '1.0.0'  })
 *
 * writePackage((packageContent) => {
 *  packageContent.name = 'Daphnis'
 *  packageContent.version = '1.0.0'
 * })
 */
export function writePackage (key: string, value: string | object): void
export function writePackage (obj: object): void
export function writePackage (fun: (packageContent: PackageJSON) => void): void
export function writePackage (param: any, value?: string): void {
  const packageJson = readJsonFile<PackageJSON>('./package.json')
  if (typeof param === 'string') {
    set(packageJson, param, value)
  } else if (typeof param === 'object') {
    for (const key in param) {
      set(packageJson, key, param[key])
    }
  } else if (typeof param === 'function') {
    param(packageJson)
  }
  writeJsonFile<PackageJSON>('./package.json', packageJson)
}
