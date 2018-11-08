import {Context} from 'koa'
export default function parseBody(){
  return  async function ( ctx:Context, next:any ) {
    console.log(ctx.request.method)
    if(ctx.request.method === "POST" || ctx.request.method === "PUT"){
      ctx.request.body = JSON.parse(ctx.request.body)
    }else{
    }
    await next()
  }
}