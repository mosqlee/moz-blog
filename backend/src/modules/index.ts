import * as glob from 'glob';
import * as Router from 'koa-router';

import CONF from '../config';
import {RouterConfig} from '../types';
exports = module.exports = function initModules(app:any){
    glob(`${__dirname}/*`, {ignore: '**/index.js'}, (err, matches)=>{
        if(err) throw err;
        matches.forEach(mod => {
            const router = require(`${mod}/router`);
            const routes = router.default;
            const baseUrl = router.baseUrl;
            const instance:any = new Router({prefix:'/'+CONF.VERSION + baseUrl})
            routes.forEach((config: RouterConfig)=>{
                const {
                    method = '',
                    route ='',
                    handlers = []
                } = config;
                const lastHandler = handlers.pop();

                instance[method.toLowerCase()](route, ...handlers, async function(ctx:{}){
                    return await lastHandler(ctx);
                });
                app.use(instance.routes())
                app.use(instance.allowMethods())
            })
        });
    })
}