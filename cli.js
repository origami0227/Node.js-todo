const program = require('commander')
//引入index.js
const api  = require('./index')
//命令选项
program
    .option('-x, --xxx', 'what is the x')
    .option('-s, --small', 'small pizza size')
    .option('-p, --pizza-type <type>', 'flavour of pizza');
//增添子命令
program
    .command('add')
    .description('add a task')
    .action((...args) => {
        const words = args.slice(0,-1)
        return api.add(words)//使用add
    });
program
    .command('clear')
    .description('clear all tasks')
    .action((...args) => {
        return api.clear()
    });

program.parse(process.argv);

if(process.argv.length === 2) { //通过打印process.argv可以得知当用户什么都没添加时有两个数据
    //说明用户直接运行了 node cli.js
    return api.showAll()
}

