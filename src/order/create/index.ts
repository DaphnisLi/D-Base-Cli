/**
 * create 命令的具体任务
 */

import {
  defaultConfig,
  interactMap,
  interactOption,
} from './util'
import { Feature, SelectResult } from './types'
import { initProjectDir, isFileExist, writePackage } from '../../common/operateFile'
import {
  end,
  installFeature,
  selectFeature,
} from '../../common/commandLine'

// create 命令
const create = async (projecrName: string): Promise<void> => {
  // 判断文件是否已经存在
  isFileExist(projecrName)
  // 选择需要的功能
  const selectResult = await selectFeature<Feature, SelectResult>(interactOption)
  // 初始化项目目录
  initProjectDir(projecrName)
  // 改写项目的 package.json 基本信息
  writePackage({ name: projecrName, files: ['package.json', 'README.md', 'dist'] })
  // 安装 feature
  installFeature(interactMap, selectResult, defaultConfig)
  // 结束
  end(projecrName)
}

export default create
