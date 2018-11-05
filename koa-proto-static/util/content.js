const path = require('path');
const fs = require('fs');

// 封装读取目录内容方法
const dir = require('./dir');

// 封装读取文件内容方法
const file = require('./file');

function content(ctx, funllStaticPath) {
  // 封装请求资源的完绝对径
  let reqPath = path.join(funllStaticPath, ctx.url);

  // 判断请求路径是否为存在目录或者文件
  let exist = fs.existsSync(reqPath);

  // 返回请求内容， 默认为空
  let content = ''

  if (!exist) {
    //如果请求路径不存在，返回404
    ctx.body = '404 Not Found! o(╯□╰)o！'
  } else {
    //判断访问地址是文件夹还是文件
    let stat = fs.statSync(reqPath);

    if (stat.isDirectory()) {
      //如果为目录，则渲读取目录内容
      content = dir(ctx.url, reqPath);
    } else {
      // 如果请求为文件，则读取文件内容
      content = file(reqPath);
    }
  }

  return content
}

module.exports = content