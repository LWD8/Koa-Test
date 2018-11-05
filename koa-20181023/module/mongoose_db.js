const Mongoose = require('mongoose')

const Config = require('../module/config')

class Db{
  static getInstance() {
    if (!Db.instance) {
      Db.instance = new Db()
    }
    return Db.instance;
  }
  constructor() {
    this.dbClient = ''
  }

  connect() {
    return new Promise((resolve, reject) => {
      if (!this.dbClient) {
        Mongoose.connect(`${Config.dbUrl}/${Config.dbName}`, { useNewUrlParser:true }, (err, client) => {
          if (err) {
            reject(err)
            return
          }
          this.dbClient = client
          resolve(this.dbClient)
        })
      } else {
        resolve(this.dbClient)
      }
    })
  }

  find(collentionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        let result = db.collection(collentionName).find(json)
        result.toArray(function(err,docs){
          if (err) {
            reject(err)
            return
          }
          resolve(docs)
        })
      })
    })
  }
}

module.exports = Db.getInstance()