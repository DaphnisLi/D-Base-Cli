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
  installGitignore,
  installTypeScript,
  installReact,
  installRollup,
  installRelease,
  installDumi,
  mkdirSrc,
} from './installFeature'
import { StandardOption, Feature, SelectResult } from './types'
import { InteractOption, InteractOptionType } from '../../common/types'
import { analyseFileName } from '../../common/libs'
import * as template from './template'
import { writeFileSync } from 'fs'
import * as shell from 'shelljs'
import { red } from 'chalk'

/**
 * 创建配置文件
 * @param fileName 文件名
 * @param templateName 模版名
 */
export const createConfigFile = (fileName: string, templateName?: string) => {
  try {
    writeFileSync(`./${fileName}`, template[templateName || analyseFileName(fileName)], { encoding: 'utf-8' })
  } catch (err) {
    shell.echo(`${red(err)}`)
    shell.echo(`${red(`无法写入 ${fileName} 文件内容`)}`)
    shell.echo(`${red(`请在 ${fileName} 中添加以下内容`)}`)
    shell.echo(`${red(analyseFileName(fileName))}`)
  }
}

/**
 * 初始化配置
 */
export const defaultConfig = () => {
  installGitignore()
  installTypesNode()
  installRelease()
}

const handleInstallDumi = (selectResult: SelectResult) => {
  if (!selectResult[Feature.DUMI]) return
  installDumi()
}

const handleInstallReact = (selectResult: SelectResult) => {
  if (!selectResult[Feature.REACT]) return
  installReact()
  installRollup()
  mkdirSrc()
}

const handleInstallTypeScript = (selectResult: SelectResult) => {
  if (!selectResult[Feature.TYPESCRIPT]) return
  installTypeScript()
}

const handleInstallStandard = (selectResult: SelectResult) => {
  installHusky(selectResult)
  installChangelog(selectResult)
  installESLint(selectResult)
  installStylelint(selectResult)
  installPrettier(selectResult)
  installEditorconfig(selectResult)
  installCommitlint(selectResult)
  installCommitCheckESLint(selectResult)
}

/**
 * 交互处理函数集合
 */
export const interactMap: { [key in Feature]: (selectResult: SelectResult) => void } = {
  [Feature.DUMI]: handleInstallDumi,
  [Feature.REACT]: handleInstallReact,
  [Feature.TYPESCRIPT]: handleInstallTypeScript,
  [Feature.STANDARD]: handleInstallStandard,
}

/**
 * 交互命令
 */
export const interactOption: InteractOption<Feature>[] = [
  {
    name: Feature.DUMI,
    type: InteractOptionType.CONFIRM,
    message: '是否安装 Dumi',
  },
  {
    name: Feature.REACT,
    type: InteractOptionType.CONFIRM,
    message: '是否安装 React',
  },
  {
    name: Feature.TYPESCRIPT,
    type: InteractOptionType.CONFIRM,
    message: '是否安装 TypeScript',
  },
  {
    name: Feature.STANDARD,
    type: InteractOptionType.CHECKBOX,
    message: '选择需要安装的基础功能, 使用空格多选',
    choices: [
      { name: StandardOption.CHANGELOG, value: StandardOption.CHANGELOG },
      { name: StandardOption.ESLINT, value: StandardOption.ESLINT },
      { name: StandardOption.STYLELINT, value: StandardOption.STYLELINT },
      { name: StandardOption.PRETTIER, value: StandardOption.PRETTIER },
      { name: StandardOption.EDITORCONFIG, value: StandardOption.EDITORCONFIG },
      { name: StandardOption.COMMITLINT, value: StandardOption.COMMITLINT },
      { name: StandardOption.COMMITCHECKESLINT, value: StandardOption.COMMITCHECKESLINT },
    ],
  },
]
