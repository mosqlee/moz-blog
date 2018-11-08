// jwt 验证方法
import * as jwt from 'jsonwebtoken'
import { Context, Request } from 'koa'

import * as config from '../config'

const authToken = (req: Request) => {
  if(req.headers && req.headers.authorization){
    const parts = req.headers.authorization.split(' ')
    if(Object.is(parts.length, 2) && Object.is(parts[0], 'Bearer')) {
      return parts[1]
    }
  }
  return false
}

// 验证权限

const authIsVerified = (req: Request) =>{
  const token = authToken(req)
  if(token) {
    try {
      const decodedToken = jwt.verify(token, config.AUTH.jwtTokenSecret)
      return true
      // if (decodedToken > Math.floor(Date.now() / 1000)) {
      //   return true
      // }
    } catch (error) {
      return false
    }
  }
}

// 管理员权限
export const adminAuthVerified = (req: Request):boolean =>{
  const token = authToken(req)
  if(token) {
    try {
      console.log(token, 'token')

      // const decodedToken = jwt.verify(token, config.AUTH.jwtTokenSecret)
      // TODO: 增加字段判断权限等级 1：最高管理员 2：一般管理员
      // if(decodedToken.isAdmin){

      // }

      return true
      // if (decodedToken > Math.floor(Date.now() / 1000)) {
      //   return true
      // }
    } catch (error) {
      console.log(error)
      return false
    }
  }
  return false
}

export default authIsVerified