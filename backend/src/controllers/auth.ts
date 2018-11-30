// 后台login
import  * as crypto from 'crypto'
import * as jwt from 'jsonwebtoken'
import {Context, BaseContext, BaseRequest} from 'koa'

import config = require('../config')

import { handleSuccess, IParams, handleError } from '../utils/handle'

import authIsVerified, {adminAuthVerified} from '../utils/auth'

import Auth, { IAuth } from '../model/auth'
// md5编码

const md5Decode = (pwd:string | Buffer | DataView) => {
  return crypto
  .createHash("md5")
  .update(pwd)
  .digest("hex")
}

export default class AuthController {
  // 登录
  public static async login (ctx: Context) {
    const {username, password, trew} = ctx.request.body
    const auth = (await Auth
      .findOne({username})) as IAuth | null
    if(!auth){
      handleError({ctx, message:'账户不存在'})
    }
    else if(auth.password === md5Decode(password)){
      const token = jwt.sign({
        name:auth.name,
        password:auth.password,
        id:auth._id,
        permission: auth.permission,
        exp:Math.floor(Date.now() / 1000) + (60*60*24*7)
      }, config.AUTH.jwtTokenSecret)
      handleSuccess({
        ctx, 
        data:{
          auth:{
            name:auth.name,
            username:auth.username,
            avatar:auth.avatar,
            slogan:auth.slogan
          },
          token,
          lifeTime:Math.floor(Date.now() / 1000) + (60*60*24*7),
        }, 
        message:"登录成功"
      })
    }else{
      handleError({ctx, message:"密码错误"})
    }
  }
  // 获取用户信息
  public static async getAuth(ctx: Context) {
    // 从jwt中解析关键字并检索
    const authVerified = authIsVerified(ctx.request)
    if(authVerified.code !== 100){
      handleError({ctx, message:authVerified.message})
    }else{
      const {name} = authVerified
      const auth = await Auth
      .findOne({name}, 'name username slogan avatar')
      .catch(e=>ctx.throw(500, '服务器内部错误'))

      if(auth){
        handleSuccess({ctx, data: auth, message:'获取用户资料成功'})
      }else{
        handleError({ctx, message:'获取用户资料失败'})
      }
    }

  }
  // public static async getAuths(ctx: Context){
  //   const {
  //     page = 1,
  //     pageSize = 10,

  //   } = ctx.query;
  //   const result = await Auth
  // }
  // 新增后台用户 暂时开放
  public static async postAuth(ctx: Context){
    // 是否有足够的权限
    let {
      name,
      username,
      slogan,
      avatar,
      password,
      permission=2
    } = ctx.request.body;
    let options = {
      name,
      username,
      slogan,
      avatar,
      password:md5Decode(password),
    permission
    }
    if(adminAuthVerified(ctx.request)){
      const res = (
        new Auth(options)
        .save()
        .catch(err=>ctx.throw(500, "服务器错误"))
      )
      if(res) handleSuccess({ctx, message:"添加用户成功"})
      else handleError({ctx, message:"添加用户失败"})
    }else handleError({ctx, message:"没有足够的权限新增用户"})
    
  }
  public static async putAuth(ctx: Context){
    const {
      _id,
      name,
      username,
      slogan,
      avatar,
      oldPassword,
      newPassword
    } = ctx.request.body
    const _auth = (
      await Auth.
        findOne({}, '_id name slogan avatar password')) as IAuth | null
      if(_auth){
        if(_auth.password !== md5Decode(oldPassword)) handleError({ctx, message:"原密码错误"})
        else{
          const password = newPassword === '' ? oldPassword : newPassword
          const auth = await Auth
            .findByIdAndUpdate(_id,{
              name,
              username,
              slogan,
              avatar,
              password: md5Decode(password)
            },
            {
              new:true
            })
          if(auth) handleSuccess({ctx, data:auth, message:'修改用户资料成功'})
          else handleError({ctx, message:"修改用户资料失败"})
        }
      }
      else handleError({ctx, message:'修改用户资料失败'}) 
  }
}