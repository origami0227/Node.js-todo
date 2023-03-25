//获取家目录
const homedir = require('os').homedir()
const home = process.env.HOME || homedir
//拼凑数据库路径
const p = require('path')
const dbPath = p.join(home, '.todo')
const fs = require('fs')
//add方法
module.exports.add = (title) => {
    //读取之前的任务
    fs.readFile(dbPath, {flag: 'a+'}, (error, data) => {
        if(error) console.log(error)
        else{
            let list //作用域问题
            try{
                list =  JSON.parse(data.toString()) //尝试把data变成对象，但会错误因为空字符串不是合法的JSON
            }catch (error2){
                list = [] //错误则让list变成空数组
            }
            console.log(list)
            //添加新的任务名为title
            const task = {
                title:title,
                done:false, //默认没做完
            }
            //存储任务到文件
            list.push(task) //将任务放入数组
            const string = JSON.stringify(list)
            fs.writeFile(dbPath,string,(error3)=>{
                if(error3) console.log(error3)
            })
        }
    })
    console.log(home)
}