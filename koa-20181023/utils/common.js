const fs = require('fs')
module.exports = (page) => {
  let view = '404.html'
  switch(page) {
    case '/':
        view = 'index.html'
        break;
    case '/news':
        view = 'news.html'
        break;
    default:
        break;
  }
  return new Promise((resolve, reject) => {
    let viewUrl = `${__dirname}/../views/${view}`
    fs.readFile(viewUrl, 'binary', (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(data)
    })
  })
}