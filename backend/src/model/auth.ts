// 权限和用户model
import * as crypto from 'crypto'
import { Document } from 'mongoose'


import { db } from '../mongodb'
import * as config from '../config'

export interface IAuth extends Document {
  name: string,
  username: string,
  slogan: string,
  avatar: string,
  password: string
}

const authSchema = new db.Schema({
  name: { type: String, default: '' },
  username: { type: String, default: config.AUTH.defaultUsername },
  slogan: { type: String, default:'' },
  gravatar: { type: String, required: true },

})

