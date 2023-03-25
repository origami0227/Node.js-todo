//获取家目录
const homedir = require('os').homedir()
const home = process.env.HOME || homedir
//拼凑数据库路径
const p = require('path')
const dbPath = p.join(home, '.todo')
const fs = require('fs')

const db = {
    //默认path = dbPath
    read(path = dbPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, {flag: 'a+'}, (error, data) => {
                if (error) {
                    return reject(error) //出错就reject并直接退出来
                }
                let list //作用域问题
                try {
                    list = JSON.parse(data.toString()) //尝试把data变成对象，但会错误因为空字符串不是合法的JSON
                } catch (error2) {
                    list = [] //错误则让list变成空数组
                }
                resolve(list)

            })
        })

    },
    write(list, path = dbPath) {
        return new Promise((resolve, reject) => {
            const string = JSON.stringify(list)
            fs.writeFile(dbPath, string, (error) => {
                if (error) {
                    return reject(error) //遇到error就退出来
                }
                resolve()

            })
        })

    }
}
module.exports = db