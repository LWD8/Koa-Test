const router = require('koa-router')();
const home = require('./home')
const news = require('./news')
const stock = require('./stock')
const art = require('./art')

router.use('/', home.routes(), home.allowedMethods());
router.use('/news', news.routes(), news.allowedMethods());
router.use('/stock', stock.routes(), stock.allowedMethods());
router.use('/art', art.routes(), art.allowedMethods());

module.exports = router