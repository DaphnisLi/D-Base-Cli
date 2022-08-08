// 对基本数据 / 引用数据的操作

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
export const analyseFileName = (fileName: string) => fileName.split('.').filter(item => item).map(item => capitalLetters(item)).join('')