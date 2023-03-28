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
    list.forEach((task, index) => { //接受任务和它的序号
        console.log(`${task.done ? '[✅]' : '[_]'}${index + 1}-${task.title}`)
    })

    inquirer
        .prompt([
            {
                type:'list',
                name:'index',
                message:'请选择你想操作的任务',
                choices:[
                    '1','2','3'
                ]
            }
        ])
        .then((answers) => {
            console.log(answers)
        })
}