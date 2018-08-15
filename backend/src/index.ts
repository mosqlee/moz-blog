import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as Logger from 'koa-logger';
import * as Static from 'koa-static';
import * as session from 'koa-session';
import CONFIG from './config';

const app = new Koa();
const router = new Router();

router.get('/*', async (ctx:any) => {
    ctx.body = 'Hello World!';
});

app.use(Logger());
app.use(router.routes());
app.use(Static(__dirname + '/../static'))
app.use(Static(__dirname + '/../doc'))
app.use(session(CONFIG.sessionConf, app));
app.listen(CONFIG.PORT);

console.log('Server running on port'+CONFIG.PORT);