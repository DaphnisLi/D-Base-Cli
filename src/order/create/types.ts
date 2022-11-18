// 常量

// 要安装的功能
export enum Feature {
  REPOSITORY_URL = 'RepositoryUrl',
  DUMI = 'Dumi',
  REACT = 'React',
  TYPESCRIPT = 'TypeScript',
  STANDARD = 'Standard',
  RELEASE_SESCRIPT = 'ReleaseScript'
}

// Standard
export enum StandardOption {
  CHANGELOG = 'Changelog',
  ESLINT = 'ESLint',
  STYLELINT = 'Stylelint',
  PRETTIER = 'Prettier',
  EDITORCONFIG = 'Editorconfig',
  PUSHLINT = 'Pushlint',
}

// React
export enum ReactOption {
  REACT = 'React',
  ROLLUP = 'Rollup',
}

// 所选功能结果
export interface SelectResult {
  [Feature.DUMI]: boolean
  [Feature.REACT]: boolean
  [Feature.TYPESCRIPT]: boolean
  [Feature.STANDARD]: StandardOption[]
}
