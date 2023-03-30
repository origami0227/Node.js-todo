const fs = jest.createMockFromModule('fs') //创建虚拟fs
const _fs = jest.requireActual('fs') //真的fs
Object.assign(fs, _fs) //把真的fs赋值给假的fs
const mocks = {}
fs.setMock = (path, error, data) => {
    mocks[path] = [error, data]
}
fs.readFile = (path, options, callback) => {
    if (path in mocks) {
        callback(mocks[path][0],mocks[path][1])
    } else {
        _fs.readFile(path, options, callback)
    }
}
module.exports = fs