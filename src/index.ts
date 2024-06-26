import { program } from 'commander'
import create from './order/create'

// Help
program
  .version(require('../package.json').version, '-v --version')
  .usage('<command> [options]') // 设置帮助信息的首行提示

// 命令
program
  .command('create') // 设置命令 <> 里的是必选参数
  .description('新建项目请执行: d-base-cli create')
  .action(async () => {
    // create 命令的主要逻辑
    await create()
  })

// process.argv 终端输入的命令
program.parse(process.argv) // 解析 process.argv 的结果
