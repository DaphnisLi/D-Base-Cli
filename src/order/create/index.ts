/**
 * create 命令的具体任务
 */

import {
  initialConfig,
  interactMap,
  interactCommand,
} from './util'

import { writePackage } from '../../common/operateFileContent'
import { initProjectDir, isFileExist } from '../../common/operateFile'
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
  const feature = await selectFeature(interactCommand)
  // 初始化项目目录
  initProjectDir(projecrName)
  // 改写项目的 package.json 基本信息
  writePackage({ name: projecrName, files: ['package.json', 'README.md', 'dist'] })
  // 安装 feature
  installFeature(feature, initialConfig, interactMap)
  // 结束
  end(projecrName)
}

export default create
