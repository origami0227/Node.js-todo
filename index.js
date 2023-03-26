const db = require('./db')
//add方法
module.exports.add = async (title) => {
    //读取之前的任务
    const list = await db.read()
    //添加新的任务名为title
    list.push({title, done: false})
    //存储任务到文件
    await db.write(list)
}

module.exports.clear = async () => {
    //直接将文件归空
    await db.write([])
}