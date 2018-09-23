// 文章model
import {db} from '../mongodb'

import * as autoIncrement from 'mongoose-auto-increment'
import * as mongoosePaginate from 'mongoose-paginate'

import {Document} from 'mongoose'

// 自增初始化id
autoIncrement.initialize(db.connection)

export interface IArticle extends Document {
  title: string
  intro: string
  img: string
  createAt: number
  // 状态 1 发布 2 草稿
  state: number
  // 文章公开状态 1 公开 2 私密
  publish: number
  updateAt: number
  category: string
  detail: string
  tag:string
  meta:IMeta
}
export interface IMeta {
  views: number
  likes: number
  comments: number
}
const articleSchema = new db.Schema({
  title: {type: String, required:true},
  intro: {type: String, required:true},
  img: {type: String, required:true},
  createAt: {type: Number, required:true},
  updateAt: { type: Number, required:true},
  category: { type: Number, required:true},
  // 状态 1 发布 2 草稿
  state: { type: Number, default: 1 },
  // 文章公开状态 1 公开 2 私密
  publish: { type: Number, default: 1 },
  detail: {type:String, required:true},
  tag: {type:String, required:false},
  meta:{
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 }
  }
})

// 转化成普通 JavaScript 对象
articleSchema.set('toObject', { getters: true })

// 时间更新
articleSchema.pre('findOneAndUpdate', function (next) {
  this.findOneAndUpdate({}, { update_at: Date.now() })
  next()
})

// 翻页 + 自增ID插件配置
articleSchema.plugin(mongoosePaginate)
articleSchema.plugin(autoIncrement.plugin, {
  model: 'Article',
  field: 'id',
  startAt: 1,
  incrementBy: 1
})

// 时间更新
articleSchema.pre('findOneAndUpdate', function (next) {
  console.log(this, '#'.repeat(100))
  this.findOneAndUpdate({}, { updateAt: Date.now() })
  next()
})

// 文章模型
const Article = db.model('Article', articleSchema)

export default Article