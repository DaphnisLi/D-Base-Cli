// create 命令用户交互逻辑

import {
  installChangelog,
  installESLint,
  installStylelint,
  installPrettier,
  installEditorconfig,
  installTypesNode,
  installHusky,
  installCommitCheckESLint,
  installCommitlint,
  initRepository,
  installTypeScript,
} from './installFeature'
import { Interact, Feature } from './constants'
import { InteractCommandType } from '../../common/types'

/**
 * 默认安装的功能
 */
export const defaultInstallFeature = () => {
  installTypesNode()
  initRepository()
}

const handleStandard = (interactResult: any) => {
  installHusky(interactResult)
  installChangelog(interactResult)
  installESLint(interactResult)
  installStylelint(interactResult)
  installPrettier(interactResult)
  installEditorconfig(interactResult)
  installCommitlint(interactResult)
  installCommitCheckESLint(interactResult)
}

const handleTypeScript = (interactResult: any) => {
  installTypeScript(interactResult)
}

/**
 * 交互处理函数集合
 */
export const interactMap = {
  [Interact.STANDARD]: handleStandard,
  [Interact.TYPESCRIPT]: handleTypeScript,
}

/**
 * 交互命令
 */
export const interactCommand: InteractCommandType[] = [
  {
    name: Interact.STANDARD,
    type: 'checkbox',
    message: '选择需要安装的基础功能, 使用空格多选.',
    choices: [
      { name: Feature.CHANGELOG, value: Feature.CHANGELOG },
      { name: Feature.ESLINT, value: Feature.ESLINT },
      { name: Feature.STYLELINT, value: Feature.STYLELINT },
      { name: Feature.PRETTIER, value: Feature.PRETTIER },
      { name: Feature.EDITORCONFIG, value: Feature.EDITORCONFIG },
      { name: Feature.COMMITLINT, value: Feature.COMMITLINT },
      { name: Feature.COMMITCHECKESLINT, value: Feature.COMMITCHECKESLINT },
    ],
  },
  {
    name: Interact.TYPESCRIPT,
    type: 'confirm',
    message: '是否安装 TypeScript',
  },
]
