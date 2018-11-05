const router = require('koa-router')()
let render = require('../utils/common')
const DB = require('../module/mongodb_db')

module.exports = router.get('/',async (ctx) => {
  let html = await render(ctx.request.url)
  ctx.body = html
}).post('/add', async (ctx) => {
  ctx.body = ctx.request.body;
}).get('/koa', async (ctx) => {
  const result = await DB.find('admin', {})
  ctx.body = result;
})