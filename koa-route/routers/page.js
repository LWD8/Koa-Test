const router = require('koa-router')();

module.exports = router.get('/',(ctx) => {
  ctx.body = {
    aa:1123465
  }
}).get('/404', (ctx) => {
  ctx.body = '404 page!';
}).get('/helloworld', (ctx) => {
  ctx.body = 'helloworld page!';
})