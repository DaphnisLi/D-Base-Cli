// 操作文件内容

import { readJsonFile, writeJsonFile } from './operateFile'
import { PackageJSON } from './types'

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
/* eslint-disable no-redeclare */
function writePackage (key: keyof PackageJSON, value: string | object): void
function writePackage (obj: PackageJSON): void
function writePackage (fun: (packageContent: PackageJSON) => void): void
function writePackage (param: any, value?: string): void {
  const packageJson = readJsonFile<PackageJSON>('./package.json')
  if (typeof param === 'string') {
    packageJson[param] = value
  } else if (typeof param === 'object') {
    for (const key in param) {
      packageJson[key] = param[key]
    }
  } else if (typeof param === 'function') {
    param(packageJson)
  }
  writeJsonFile<PackageJSON>('./package.json', packageJson)
}

export {
  writePackage,
}
