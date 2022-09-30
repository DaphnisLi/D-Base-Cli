/**
 * create 命令的具体任务
 */

import {
  configBeforeInstall,
  interactMap,
  interactOption,
  configBeforeEnd,
} from './util'
import { Feature, SelectResult } from './types'
import { isFileExist, initRepository } from '../../common/operateFile'
import {
  end,
  installFeature,
  selectFeature,
} from '../../common/commandLine'
import { getRepositoryName } from '../../common/libs'

// create 命令
const create = async (): Promise<void> => {
  // 选择需要的功能
  const selectResult = await selectFeature<Feature, SelectResult>(interactOption)
  // 项目名
  const projecrName = getRepositoryName(selectResult[Feature.REPOSITORY_URL])
  // 判断文件是否已经存在
  isFileExist(projecrName)
  // 初始化 Git 仓库
  initRepository(selectResult[Feature.REPOSITORY_URL], projecrName)
  // 安装前配置
  configBeforeInstall(selectResult)
  // 安装 feature
  installFeature(interactMap, selectResult)
  // 结束前配置
  configBeforeEnd(selectResult)
  // 结束
  end(projecrName)
}

export default create
