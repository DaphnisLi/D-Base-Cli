// 操作文件内容

import { readJsonFile, writeJsonFile } from './operateFile'
import { PackageJSON, ScriptsCommand } from './types'

/**
 * 写入 package 文件
 * @param scriptsCommand scripts 中的命令
 */
export const writePackageScripts = (scriptsCommand: ScriptsCommand[]) => {
  // ? eslint 检查的是 src 下的文件, 所以要记得创建 src 文件
  const packageJson = readJsonFile<PackageJSON>('./package.json')
  scriptsCommand.forEach(item => {
    packageJson.scripts[item.commandName] = item.command
  })
  writeJsonFile<PackageJSON>('./package.json', packageJson)
}

/**
 * 改写项目中 package.json 的 name
 */
export const changePackageInfo = (projectName: string) => {
  const packageJSON: PackageJSON = readJsonFile<PackageJSON>('./package.json')
  packageJSON.name = projectName
  writeJsonFile<PackageJSON>('./package.json', packageJSON)
}
