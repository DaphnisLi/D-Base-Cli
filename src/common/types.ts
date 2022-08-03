// type

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

export interface SelectFeatureResult {
  [key: string]: any
}
