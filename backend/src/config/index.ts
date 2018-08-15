const argv = require('yargs').argv
import common from './common';

const env = process.env.NODE_ENV || 'development'

const sessionConf = {
  key: 'cacivy', /** (string) cookie key (default is koa:sess) */
  maxAge: 1000 * 60 * 60 * 12, /** (number) maxAge in ms (default is 1 days) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
}

export const MONGODB = {
  uri: `mongodb://127.0.0.1:${argv.dbport || '27017'}/my_blog`,
  username: argv.db_username || 'DB_username',
  password: argv.db_password || 'DB_password'
}

export const AUTH = {
  jwtTokenSecret: argv.auth_key || 'my_blog',
  defaultUsername: argv.auth_default_username || 'jkchao',
  defaultPassword: argv.auth_default_password || '123456'
}

export const APP = {
  ROOT_PATH: '/api',
  LIMIT: 16,
  PORT: 8000
}
export const INFO = {
  name: 'moz_blog',
  version: '1.0.0',
  author: 'mozLee',
  site: 'http://zengyupei.cn',
  powered: ['Vue2', 'Node.js', 'MongoDB', 'koa', 'Nginx']
}
export default { env, ...common, sessionConf, AUTH, MONGODB, APP, INFO }