// 常量

// 要安装的功能
export enum Feature {
  STANDARD = 'Standard',
  TYPESCRIPT = 'TypeScript',
  REACT = 'React',
  DUMI = 'Dumi'
}

// Standard
export enum StandardOption {
  CHANGELOG = 'Changelog',
  ESLINT = 'ESLint',
  STYLELINT = 'Stylelint',
  PRETTIER = 'Prettier',
  EDITORCONFIG = 'Editorconfig',
  COMMITLINT = 'Commitlint',
  COMMITCHECKESLINT = 'CommitCheckESLint',
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
