// 公共解析器

import * as Koa from 'koa'

export interface IParams {
  ctx: Koa.Context
  message: string
  err?:any
  data?: any
}

export const handleError =(
  { ctx, message = '请求失败', err = '' }: IParams
) =>{

}

export const handleSuccess = (
  { ctx, message = '请求成功', data = ''}: IParams
)=>{
  ctx.response.body = { code: 1, message, data }
}