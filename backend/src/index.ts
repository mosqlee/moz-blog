import * as Koa from 'koa';
import * as Logger from 'koa-logger';
import * as Static from 'koa-static';
import * as koaBody from 'koa-body'  // post body 解析
import config from './config';
import router from './routes'
import * as mongodb from './mongodb'
import * as mongoosePaginate from 'mongoose-paginate'
import * as types from './types'
const app = new Koa();

// data server
mongodb.connect()

// mongoosePaginate.paginate.options = {
//   limit: config.APP.LIMIT
// }
app.use(Logger());

app.use(koaBody({
  jsonLimit: '10mb',
  formLimit: '10mb',
  textLimit: '10mb'
}))
app
  .use(router.routes())
  // .use(router.allowedMethods())
app.use(Static(__dirname + '/../static'))
app.use(Static(__dirname + '/../doc'))
// app.use(session(config.sessionConf, app));
app.listen(config.APP.PORT);

console.log('Server running on port' + config.APP.PORT);