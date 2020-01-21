/*
*  路由汇总
* */

import demoRoutes from './routerDemo'
import combineRouters from 'koa-combine-routers'

module.exports = combineRouters(
  demoRoutes
)
