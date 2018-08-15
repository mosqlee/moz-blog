import { Context } from 'koa'

import { handleSuccess, IParams, handleError } from '../utils/handle'

import authIsVerified from '../utils/auto'

import * as Config from '../config'

export default class ArticleController {
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

  }
  public static async postArt (ctx: Context){
    
  }
}