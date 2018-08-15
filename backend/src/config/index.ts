import common from './common';

const env = process.env.NODE_ENV || 'development'

const sessionConf = {
    key: 'cacivy', /** (string) cookie key (default is koa:sess) */
    maxAge: 1000 * 60 * 60 * 12, /** (number) maxAge in ms (default is 1 days) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
}

export default { env, ...common, sessionConf}