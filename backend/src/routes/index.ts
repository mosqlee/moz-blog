import * as Router from 'koa-router'
import * as config from '../config'
import * as controller from '../controllers'

import authIsVerified from '../utils/auth'

const router = new Router({
  prefix: config.APP.ROOT_PATH
})

// Api
router
  .get('/', (ctx, next)=>{
    console.log('what??')
    ctx.response.body = config.INFO
  })
  .get('/blog', controller.article.getArts) 														// 文章列表
  .post('/blog', controller.article.postArt)														// 添加文章
  .get('/blog/:id', controller.article.getArt)

export default router