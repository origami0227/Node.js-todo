const db = require('./db')
const inquirer = require('inquirer');
//add方法
module.exports.add = async (title) => {
    //读取之前的任务
    const list = await db.read()
    //添加新的任务名为title
    list.push({title, done: false}) //任务名以及完成状态
    //存储任务到文件
    await db.write(list)
}

module.exports.clear = async () => {
    //直接将文件归空
    await db.write([])
}

module.exports.showAll = async () => {
    //读取之前的任务
    const list = await db.read()
    //打印之前的任务
    // list.forEach((task, index) => { //接受任务和它的序号
    //     console.log(`${task.done ? '[✅]' : '[_]'}${index + 1}-${task.title}`)
    // })

    inquirer
        .prompt([
            {
                type: 'list',
                name: 'index',
                message: '请选择你想操作的任务',
                choices: [{name: '退出', value: '-1'}, ...
                    list.map((task, index) => {
                        return {name: `${task.done ? '[✅]' : '[_]'}${index + 1}-${task.title}`, value: index.toString()}
                    }),
                    {name: '创建任务', value: '-2'}
                ]
            }
        ])
        .then((answers) => {
            const index = parseInt(answers.index)
            if (index >= 0) {
                //说明选择了一个任务
                inquirer.prompt({
                    type: 'list',
                    name: 'action',
                    message: '请选择操作',
                    choices: [
                        {name: '退出', value: 'quit'},
                        {name: '已完成', value: 'markAsDone'},
                        {name: '未完成', value: 'markAsUndone'},
                        {name: '改标题', value: 'updateTitle'},
                        {name: '删除', value: 'remove'}
                    ]
                }).then(answer2 => {
                    switch (answer2.action) {
                        case 'quit': //退出
                            break;
                        case 'markAsDone': //标记完成
                            list[index].done = true //标记为完成
                            db.write(list) //保存
                            break;
                        case 'markAsUndone': //标记未完成
                            list[index].done = false
                            db.write(list)
                            break;
                        case 'updateTitle': //修改标题
                            inquirer.prompt({
                                type: 'input',
                                name: 'title',
                                message: '新的标题',
                                default: list[index].title,//默认显示旧标题
                            }).then(answer => {
                                list[index].title = answer.title //将用户输入的title赋值给list
                                db.write(list)
                            })
                            break;
                        case 'remove': //删除
                            list.splice(index, 1) //删除该项任务
                            db.write(list)
                            break;
                    }
                })
            } else if (index === -2) {
                //说明选择了创建任务
                inquirer.prompt({
                    type: 'input',
                    name: 'title',
                    message: '输入任务标题',
                }).then(answer => {
                    list.push({
                        title: answer.title,
                        done: false,
                    })
                    db.write(list)
                })
            }
        })
}