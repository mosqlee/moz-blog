// 权限和用户model
import * as crypto from 'crypto'
import jwt = require('jsonwebtoken')
import * as autoIncrement from 'mongoose-auto-increment'
import * as mongoosePaginate from 'mongoose-paginate'
import { Document } from 'mongoose'


import { db } from '../mongodb'
import * as config from '../config'
// 自增初始化id
autoIncrement.initialize(db.connection)

export interface IAuth extends Document {
  name: string,
  username: string,
  slogan: string,
  avatar: string,
  password: string,
  permission:number//1:最高管理，2：一般管理
}

const authSchema = new db.Schema({
  name: { type: String, default: '' },
  username: { type: String, default: config.AUTH.defaultUsername },
  slogan: { type: String, default:'' },
  avatar: { type: String, required: true },
  password:{
    type: String,
    default: crypto.createHash('md5').update(config.AUTH.defaultPassword).digest('hex')
  },
  permission:{
    type:Number,
    default:2
  }
})
authSchema.set('toObject', { getters: true })
// 时间更新
authSchema.pre('findOneAndUpdate', function (next) {
  this.findOneAndUpdate({}, { update_at: Date.now() })
  next()
})
// 翻页 + 自增ID插件配置
authSchema.plugin(mongoosePaginate)
authSchema.plugin(autoIncrement.plugin, {
  model: 'Article',
  field: 'id',
  startAt: 1,
  incrementBy: 1
})
const Auth = db.model('Auth', authSchema)

export default Auth
