// 权限和用户model
import * as crypto from 'crypto'
import jwt = require('jsonwebtoken')

import { Document } from 'mongoose'


import { db } from '../mongodb'
import * as config from '../config'

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
  gravatar: { type: String, required: true },
  password:{
    type: String,
    default: crypto.createHash('md5').update(config.AUTH.defaultPassword).digest('hex')

  },
  permission:{
    type:Number,
    default:2
  }
})

const Auth = db.model('Auth', authSchema)

export default Auth
