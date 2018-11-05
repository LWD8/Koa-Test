const router = require('koa-router')();

module.exports = router.get('/get/data.json', (ctx) => {
  ctx.body = {
    success: true,
    data: {
      text: 'Hello Koa-Router!'
    }
  }
}).get('/get/user.json', (ctx) => {
  ctx.body = {
    success: true,
    data: {
      text: 'my name is koa.js!'
    }
  }
})