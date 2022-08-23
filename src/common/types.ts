// type
import { Interact, Feature } from '../order/create/constants'

export interface PackageJSON {
  name?: string
  version?: string
  description?: string
  files?: string[]
  typings?: string
  main?: string
  module?: string
  scripts?: {
    [key: string]: string
  }
  husky?: {
    hooks?: {
      [key: string]: string
    }
  }
  'lint-staged'?: {
    [key: string]: string[]
  }
  peerDependencies?: {
    [key: string]: string
  }
  dependencies?: {
    [key: string]: string
  }
}

export interface JSON {
  [key: string]: unknown
}

export interface ScriptsCommand {
  commandName: string
  command: string
}

interface ChoicesType {
  name: Feature
  value: Feature
}

export interface InteractCommandType {
  name: Interact
  type: string
  message: string
  choices?: ChoicesType[]
}

export interface FeatSelectResult {
  [Interact.STANDARD]: Feature[]
  [Interact.TYPESCRIPT]: boolean
  [Interact.REACT]: boolean
}

// 这个 enum 还是和 type 有关的。还有其他的选项, 暂时用不到, 就不加了
export enum Interacttype {
  INPUT = 'input',
  NUMBER = 'number',
  CONFIRM = 'confirm', // 是否
  LIST = 'list', // 单选
  CHECKBOX = 'checkbox', // 多选
  PASSWORD = 'password' // 密码
}
