// type
import { Interact, Feature } from '../order/create/constants'

export interface PackageJSON {
  name: string
  version: string
  description: string
  scripts: {
    [key: string]: string
  }
  husky: {
    hooks: {
      [key: string]: string
    }
  }
}

export interface JSON {
  [key: string]: unknown
}

export interface ScriptsCommand {
  commandName: string
  command: string
}

/**
 * 所选功能, key 是交互选项的 name
 */
export type SelectFeatureResult<T extends Feature> = {
  [key in keyof T]: any
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
