// jwt 验证方法
import * as jwt from 'jsonwebtoken'
import { Context } from 'koa'

import * as config from '../config'

const authToken = (req: Context) => {
  if(req.headers && req.headers.authorization){
    const parts = req.headers.authorization.split(' ')
    if(Object.is(parts.length, 2) && Object.is(parts[0], 'Bearer')) {
      return parts[1]
    }
  }
  return false
}

// 验证权限

const authIsVerified = (req: Context) =>{
  const token = authToken(req)
  if(token) {
    try {
      const decodedToken = jwt.verify(token, config.AUTH.jwtTokenSecret)
      return true
      // if (decodedToken > Math.floor(Date.now() / 1000)) {
      //   return true
      // }
    } catch (error) {
      
    }
  }
}

export default authIsVerified