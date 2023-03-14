// 简单的操作

/**
 * 首字母大写
 */
export const capitalLetters = (word: string) => word.replace(word.slice(0, 1), word.slice(0, 1).toUpperCase())

/**
 * 解析文件名
 * @param fileName 文件名
 * .eslintrc => Eslintrc
 * commitlint.config.js => CommitlintConfigJs
 */
export const analyzeFileName = (fileName: string) => fileName.split('.').filter(item => item).map(item => capitalLetters(item)).join('')

/**
 *  获取 Git 仓库名
 * @param repositoryUrl Git 远端仓库 Url
 */
export const getRepositoryName = (repositoryUrl: string) => repositoryUrl.split('/').slice(-1)[0].split('.')[0]
