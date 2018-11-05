const router = require('koa-router')();

module.exports = router.get('/', async (ctx) => {
  let title = 'hello ejs'
  let list = [0,1,6,156]
  await ctx.render('stock', {
    title,
    list
  })
})