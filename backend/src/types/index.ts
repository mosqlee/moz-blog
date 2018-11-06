export class RouterConfig  {
    method:string;
    route:string;
    handlers:Array<Function>;
}

declare module "koa" {
    interface Request {
        body?: any;
        rawBody: {} | null | undefined;
    }
    interface Context {
      params: any;
    }
  }