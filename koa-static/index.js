const Koa = require('koa');
const app = new Koa();
const path = require('path');
const static = require('koa-static');

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = __dirname + '/static'

app.use(static(
  path.join(staticPath)
))

app.listen(3000, () => {
  console.log('[demo] static-use-middleware is starting at port 3000')
})