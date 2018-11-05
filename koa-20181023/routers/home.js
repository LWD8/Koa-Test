const router = require('koa-router')()
let render = require('../utils/common')

module.exports = router.get('/', async (ctx, next) => {
  // 路由中间件
  console.log('路由中间件')
  await next()
}).get('/',async (ctx) => {
  let ctx_query = ctx.query
  let ctx_querystring = ctx.querystring
  let request = ctx.request
  let req_query = request.query
  let req_querystring = request.querystring
  // let html = await render(ctx.request.url)
  let html = {
    ctx_query,
    ctx_querystring,
    req_query,
    req_querystring
  }
  ctx.body = html
})