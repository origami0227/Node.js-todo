const db = require('../db')
const fs = require('fs')
jest.mock('fs') //虚拟的fs
describe('db', () => {
    it('can read data', async () => {
        const data = [{title: 'hi', done: true}]
        fs.setMock('/xxx', null, JSON.stringify(data))
        const list = await db.read('/xxx')
        expect(list).toEqual(data)
    })
})