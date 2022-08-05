/**
 * create 命令的具体任务
 */

import {
  defaultInstallFeature,
  interactMap,
  interactCommand,
} from './util'

import { changePackageInfo } from '../../common/operateFileContent'
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
  changePackageInfo(projecrName)
  // 安装 feature
  installFeature(feature, defaultInstallFeature, interactMap)
  // 结束
  end(projecrName)
}

export default create
