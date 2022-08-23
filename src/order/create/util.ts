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
  installReact,
  installRollup,
  installBabel,
  installRelease,
  installDumi,
  mkdirSrc,
} from './installFeature'
import { Interact, Feature } from './constants'
import { InteractCommandType, FeatSelectResult, Interacttype } from '../../common/types'

/**
 * 默认安装的功能
 */
export const initialConfig = () => {
  initRepository()
  installTypesNode()
  installRelease()
}

const handleStandard = (featSelectResult: FeatSelectResult) => {
  installHusky(featSelectResult)
  installChangelog(featSelectResult)
  installESLint(featSelectResult)
  installStylelint(featSelectResult)
  installPrettier(featSelectResult)
  installEditorconfig(featSelectResult)
  installCommitlint(featSelectResult)
  installCommitCheckESLint(featSelectResult)
}

const handleTypeScript = (featSelectResult: FeatSelectResult) => {
  if (!featSelectResult[Interact.TYPESCRIPT]) return
  installTypeScript()
}

const handleReact = (featSelectResult: FeatSelectResult) => {
  if (!featSelectResult[Interact.REACT]) return
  installReact()
  installRollup()
  installBabel()
  installDumi()
  mkdirSrc()
}

/**
 * 交互处理函数集合
 */
export const interactMap = {
  [Interact.STANDARD]: handleStandard,
  [Interact.TYPESCRIPT]: handleTypeScript,
  [Interact.REACT]: handleReact,
}

/**
 * 交互命令
 */
export const interactCommand: InteractCommandType[] = [
  {
    name: Interact.REACT,
    type: Interacttype.CONFIRM,
    message: '是否安装 React',
  },
  {
    name: Interact.TYPESCRIPT,
    type: Interacttype.CONFIRM,
    message: '是否安装 TypeScript',
  },
  {
    name: Interact.STANDARD,
    type: Interacttype.CHECKBOX,
    message: '选择需要安装的基础功能, 使用空格多选',
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
]
