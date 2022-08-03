/**
 * create 命令的具体任务
 */

import {
  installFeature,
  selectFeature,
} from './util'

import { changePackageInfo } from '../../common/operateFileContent'
import { initProjectDir, isFileExist } from '../../common/operateFile'
import { end } from '../../common/commandLine'

// create 命令
const create = async (projecrName: string): Promise<void> => {
  // 判断文件是否已经存在
  isFileExist(projecrName)
  // 选择需要的功能
  const feature = await selectFeature()
  // 初始化项目目录
  initProjectDir(projecrName)
  // 改写项目的 package.json 基本信息
  changePackageInfo(projecrName)
  // 安装 feature
  installFeature(feature)
  // 结束
  end(projecrName)
}

export default create
