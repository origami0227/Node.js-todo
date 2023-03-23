const program = require('commander')

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
        console.log(words);
    });
program
    .command('clear')
    .description('clear all tasks')
    .action((...args) => {
        console.log('this is a clear');
    });

program.parse(process.argv);
