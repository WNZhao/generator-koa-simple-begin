// koa开发目录结构分配及相关中间件的使用

import Koa from 'koa'
import statics from 'koa-static'
import path from 'path'
import helmet from 'koa-helmet'
import koaBody from 'koa-body'
import jsonutil from 'koa-json'
import cors from '@koa/cors'
import compose from 'koa-compose';
import routers from './routes/routes'

const app = new Koa()

const middleware = compose([
  koaBody(),
  statics(path.join(__dirname, '../public')),
  cors(),
  jsonutil({pretty: false, param: 'pretty'}),
  helmet()
])

console.log(process.env.NODE_ENV)

const isDevMode = (process.env.NODE_ENV === 'production') ? false : true

if(!isDevMode){
  app.use()
}

app.use(middleware)
app.use(routers())

app.listen(3000, () => {
  console.log('web serve started at port: ' + 3000)
})
