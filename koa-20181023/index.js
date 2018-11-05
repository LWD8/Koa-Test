const Koa = require('koa')
const app = new Koa()
const router = require('./routers')
const views = require('koa-views');
const path = require('path')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
let art = require('koa-art-template')
const session = require('koa-session')

// 模版引擎ejs配置
// app.use(views(path.join(__dirname, './ejs'), {
//   extension: 'ejs'
// }))
// 模版引擎art-template配置
art(app, {
  root: path.join(__dirname, './art'),
  extname: '.art',
  debug: process.env.NODE_ENV !== 'production'
})

// POST请求接收data数据
app.use(bodyParser())

// 配置静态文件
app.use(static(path.join(__dirname, './static')))

// session配置
app.keys = ['some secret hurr'];
const CONFIG = {
  key: 'lwd:sess', //cookie key (default is koa:sess)
  maxAge: 86400000, // cookie 的过期时间 maxAge in ms (default is 1 days)
  overwrite: true, //是否可以 overwrite (默认 default true)
  httpOnly: true, //cookie 是否只有服务器端可以访问 httpOnly or not (default true)
  signed: true, //签名默认 true
  rolling: false, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
  renew: false, //(boolean) renew session when session is nearly expired,
};
app.use(session(CONFIG, app));

// 中间件
app.use(async (ctx, next) => {
  console.log(new Date())
  ctx.session.username = '张三'
  ctx.cookies.set('token', 15618946846516153156)
  await next()
})

app.use(router.routes()).use(router.allowedMethods()) // 启动路由

app.listen(3000)