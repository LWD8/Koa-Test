const Koa = require('koa');
const loggerAsync = require('./logger-async');
const app = new Koa();

app.use(loggerAsync());

app.use((ctx) => {
  ctx.body = 'Hello World!';
})

app.listen(3000);