const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const router = require('./routers')

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('[demo] route-use-middleware is starting at port 3000')
})