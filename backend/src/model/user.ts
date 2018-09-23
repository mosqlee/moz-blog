// 后台登陆model
import {db} from '../mongodb'

import * as autoIncrement from 'mongoose-auto-increment'

autoIncrement.initialize(db.connection)

export interface IUser extends Document {
    name: string,
    passward:string,
    avatar:string,
    createAt: number,
    updateAt:number,
    // 0admin，1freeze
    state:number
}

const userSchema = new db.Schema({
    name: {type:String, required:true},
    passward:{type: String, required: true},
    avatar: {type: String, required:false},
    createAt: {type: Number, required:true},
    updateAt: {type: Number, required:true}
})

userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field:'id',
    startAt: 1,
    incrementBy: 1
})

userSchema.pre('findOneAndUpdate', function (next) {
    this.findOneAndUpdate({}, { updateAt: Date.now() })
    next()
})

// 文章模型
const User = db.model('Article', userSchema)

export default User