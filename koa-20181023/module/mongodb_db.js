const config = require('./config')
const MongoClient = require('mongodb').MongoClient;

class Db{
  static getInstance() {
    if (!Db.instance){
      Db.instance = new Db()
    }
    return Db.instance
  }
  constructor() {
    this.dbClient = ''
    this.connect()
  }
  connect() {
    return new Promise((resolve, reject) => {
      if (!this.dbClient) {
        MongoClient.connect(config.dbUrl, { useNewUrlParser: true }, (err, client) => {
          if (err) {
            reject(err)
            return
          }
          this.dbClient = client.db(config.dbName)
          resolve(this.dbClient)
        })
      } else {
        resolve(this.dbClient)
      }
    })
  }
  find(collectionName, json) {
    return new Promise(async (resolve, reject) => {
      this.connect().then(db => {
        let result=db.collection(collectionName).find(json);
        result.toArray((err, docs) => {
          if (err) {
            reject(err)
            return
          }

          resolve(docs)
        })
      })
    })
  }

  insert(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionName).insertOne(json, (err, res) => {
          if (err) {
            reject(err)
            return
          }
          resolve(res)
        })
      })
    })
  }
}

module.exports = Db.getInstance()