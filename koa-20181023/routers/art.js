const router = require('koa-router')();
const DB = require('../module/mongodb_db')

module.exports = router.get('/', async(ctx) => {
  let title = 'hello art-template'
  let list = [456,456165,1,651,651,321,31,6,51,531,65]
  let username = ctx.session.username
  await ctx.render('edit', {
    title,
    list,
    username
  })
}).get('/share', async (ctx) => {
  let list = [1,2,3,4,5,6,7,8,9]
  const adminData = await DB.find('admin', {})
  const userData = await DB.find('user', {"age":{$gt:50, $lte: 60}})
  let token = ctx.cookies.get('token') || ''
  await ctx.render('shera', {
    list,
    adminData,
    userData,
    token
  })
}).post('/doAdd', async (ctx) => {
  const res = await DB.insert('user', ctx.request.body)
  ctx.body = res
})