import * as Koa from 'koa'
declare module "koa" {
  interface Request extends Koa.BaseRequest{
      body?: any;
      rawBody: {} | null | undefined;
  }
}
