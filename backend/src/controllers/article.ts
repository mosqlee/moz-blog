import { Context, BaseContext } from 'koa'

import { handleSuccess, IParams, handleError } from '../utils/handle'

import authIsVerified from '../utils/auth'

import * as Config from '../config'

import Article, { IArticle } from '../model/article'

declare module "koa" {
  interface Request {
      body?: any;
      rawBody: {} | null | undefined;
  }
  interface Context {
    params: any;
  }
}
export default class ArticleController {
  // 列表
  public static async getArts(ctx: Context){
    const {
      page = 1,
      pageSize = 10,
      keyword = '',
      state = 1,
      publish = 1,
      tag,
      type,
      date,
      star
    } = ctx.query;
    // 过滤条件
    const options: {
      sort: any,
      page: number,
      limit: number,
      populate: string[],
      select?: string
    } = {
      sort: { create_at: -1 },
      page: Number(page),
      limit: Number(pageSize),
      populate: ['tag'],
      select: '-content'
    }

    // 参数
    const querys: {
      $or?: any,
      state?: number,
      publish?: number,
      type?: number,
      createAt?: any,
      tag?: any
    } = {}
    // 后台请求的filter

    // 如果是前台请求，则重置公开状态和发布状态
    if (!authIsVerified(ctx.request)) {
      querys.state = 1
      querys.publish = 1
    }
    console.log(querys, options);
    // 查询
    const result = await Article
      .paginate(querys, options)
      .catch(e=>ctx.throw(500, '服务器内部错误'+e))
    if(result){
      console.log(result, '*'.repeat(10))
      handleSuccess({
        ctx,
        data:{
          pagination:{
            total: result.total,
            page: result.page,
            total_page: result.pages,
            page_size: result.limit
          },
          list: result.docs
        },
        message: 'success'
      })
    }else{
      handleError({
        ctx, message:'fail'
      })
    }
  }
  public static async postArt (ctx: Context){
    const res = (
      new Article(ctx.request.body)
      .save()
      .catch(err=>ctx.throw(500, '服务器错误'))
    )
    if(res){
      handleSuccess({ctx, message:'添加文章成功'})
    }else handleError({ctx, message:'添加文章失败'})
  }
  public static async getArt(ctx: Context){
    const _id = ctx.params.id
    console.log(_id, '*'.repeat(10))
    if (!_id) {
      handleError({ ctx, message: '无效参数' })
      return false
    }
    const res = (await Article
      .findById(_id)
      .populate('tag')
      .catch(err => ctx.throw(500, err+'服务器内部错误')) as IArticle)
    if (res) {
    // 每次请求，views 都增加一次
    console.log(res)
    res.meta.views += 1
    res.save()
    handleSuccess({ ctx, message: '文章获取成功', data: res })

    } else handleError({ ctx, message: '获取文章失败' })
  }
}