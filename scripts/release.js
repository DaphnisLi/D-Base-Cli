#!/usr/bin/env node

const { prompt } = require('inquirer')
const { inc } = require('semver')
const { echo, exec } = require('shelljs')
const { green, yellow } = require('chalk')
const { version } = require('../package.json')

// 自动算出要升的版本号
const major = inc(version, 'major') // 主版本 (重大版本改动)
const minor = inc(version, 'minor') // 次版本 (feat)
const patch = inc(version, 'patch') // 补丁版本 (bug)

// 交互命令行
prompt([
  {
    type: 'list', // 单选
    message: '选择要发布的版本号',
    name: 'releaseVersion',
    choices: [
      {
        name: `主版本: v${version} => v${major}`,
        value: major, // 既可以是字符串也可以是数字
      },
      {
        name: `次版本: v${version} => v${minor}`,
        value: minor,
      },
      {
        name: `补丁版本: v${version} => v${patch}`,
        value: patch,
      },
    ],
  },
]).then(({ releaseVersion }) => {
  echo(yellow('修改版本号 😁'))
  // 修改版本号, 禁用版本提交和标记tag。其实直接 write package 也是可以的, 但是太粗暴了。
  exec(`npm version ${releaseVersion} --no-git-tag-version`) // releaseVersion = 'major' or 1.0.0
  echo('')

  echo(yellow('Changelog 😁'))
  exec('npm run changelog')
  echo('')

  echo(yellow('提交代码 😁'))
  exec(`git add . && git commit -m 'release: V ${releaseVersion}' && git push origin HEAD`)
  echo('')

  echo(yellow('设置 Tag 😁'))
  exec(`git tag V ${releaseVersion} && git git -c credential.helper= push origin --progress V ${releaseVersion}`)
  echo('')

  echo(yellow('发布 npm 😁'))
  exec('npm run build && npm publish --access public')

  echo(green('大功告成 🧨🧨🧨🧨🧨'))
})
