import * as mongoose from 'mongoose'

import * as config from '../config'

(mongoose as any).Promise = global.Promise

export const db = mongoose

export const connect = () =>{
  // 连接数据库
  mongoose.connect(config.MONGODB.uri)
  // 连接错误
  mongoose.connection.on('error', e=>{
    console.log('数据库连接失败', e)
  })
  // 连接成功
  mongoose.connection.once('open', ()=>{
    console.log('数据库连接成功')
  })
  return mongoose
}