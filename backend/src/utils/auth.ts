// jwt 验证方法
import * as jwt from 'jsonwebtoken'
import { Context, Request } from 'koa'

import * as config from '../config'

export interface IJwt {
  name: string,
  password: string,
  id:string,
  permission:number,//1:最高管理，2：一般管理
  exp:number
}
const authToken = (req: Request) => {
  if(req.headers && req.headers.authorization){
    return req.headers.authorization
    // const parts = req.headers.authorization.split(' ')
    // if(Object.is(parts.length, 2) && Object.is(parts[0], 'Bearer')) {
    //   return parts[1]
    // }
  }
  return false
}

// 验证权限，100是后端登录

const authIsVerified = (req: Request):{message:string, code:number, name:string}  =>{
  const token = authToken(req)
  if(token) {
    try {
      const decodedToken:any = jwt.verify(token, config.AUTH.jwtTokenSecret)
      if (decodedToken.exp <= Math.floor(Date.now() / 1000)) {
        return {message:'登录过期，请重新登录', code:101, name:''}
      }else{
        return {message:'success', code:100, name:decodedToken.name}
      }
        // if (decodedToken > Math.floor(Date.now() / 1000)) {
      //   return true
      // }
    } catch (error) {
      return {message:'请先登录', code:102, name:''}
    }
  }
  return {message:'请先登录', code:102, name:''}
}

// 管理员权限
export const adminAuthVerified = (req: Request):boolean|{message:string, code:number} =>{
  // return true;
  const token = authToken(req)
  if(token) {
    try {
      const decodedToken:any = jwt.verify(token, config.AUTH.jwtTokenSecret)
      // 过期
      if (decodedToken.exp <= Math.floor(Date.now() / 1000)) {
        return {message:'登录过期，请重新登录', code:101}
        // 
      }else if(decodedToken.permission >2 ||!decodedToken.permission){
        return {message:'权限不够，请联系管理员', code:201}
      }else{
        return true
      }

      // TODO: 增加字段判断权限等级 1：最高管理员 2：一般管理员
    } catch (error) {
      console.log(error)
      return false
    }
  }
  return false
}

export default authIsVerified