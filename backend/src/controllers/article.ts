import { Context } from 'koa'

import { handleSuccess, IParams, handleError } from '../utils/handle'

import authIsVerified from '../utils/auth'

import * as Config from '../config'

import Article, { IArticle } from '../model/article'

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
    const authVerified = authIsVerified(ctx.request)
    // 如果是前台请求，则重置公开状态和发布状态
    if(authVerified.code !== 100){
      querys.state = 1
      querys.publish = 1
    }
    // 查询
    const result = await Article
      .paginate(querys, options)
      .catch(e=>ctx.throw(500, '服务器内部错误'+e))
    if(result){
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
  // 新增
  public static async postArt (ctx: Context){
    const authVerified = authIsVerified(ctx.request);
    
    if(authVerified.code !== 100){
      handleError({ctx, message:authVerified.message});
      return false;
    }
    const {name, id} = authVerified;
    const createTime = Date.parse(new Date().toString())/1000; 
    ctx.request.body.createAt = createTime;
    ctx.request.body.updateAt = createTime;
    ctx.request.body.auth = name;
    ctx.request.body.authId = id;
    const res = await (
      new Article(ctx.request.body)
      .save()
      .catch(err=>ctx.throw(500, err))
    )
    if(res){
      handleSuccess({ctx, message:'添加文章成功'})
    }else handleError({ctx, message:'添加文章失败'})
  }
  public static async putArt (ctx: Context){
    const authVerified = authIsVerified(ctx.request);
    if(authVerified.code !== 100){
      handleError({ctx, message: authVerified.message});
      return false;
    }
    const _id = ctx.request.body._id;
    const {title, detail, category, img, intro} = ctx.request.body;
    delete ctx.request.body.createAt;
    delete ctx.request.body.updateAt;
    if(!_id){
      handleError({ctx, message:"无效参数！"})
      return false;
    }
    if(!title || !detail || !category || !img || !intro){
      handleError({ctx, message:"标题， 详情， 分类， 缩略图， 简介必填！"});
      return false;
    }
    const res = await Article.findByIdAndUpdate(_id, ctx.request.body)
    if(res){
      handleSuccess({ctx, message:"更新文章成功"})
    }else {
      handleError({ctx, message:"更新文章失败"})
    }
    
  }
  // 获取详情
  public static async getArt(ctx: Context){
    const _id = ctx.params.id
    if (!_id) {
      handleError({ ctx, message: '无效参数' })
      return false
    }
    const res = (await Article
      .findOne({id:_id})
      .populate('tag')
      .catch(err => ctx.throw(500, err+'服务器内部错误')) as IArticle)
    if (res) {
    // 每次请求，views 都增加一次,后端请求除外
    const authVerified = authIsVerified(ctx.request);
    if(authVerified.code !== 100){
      res.meta.views += 1
      res.save()
    }
    handleSuccess({ ctx, message: '文章获取成功', data: res })

    } else handleError({ ctx, message: '获取文章失败' })
  }
}