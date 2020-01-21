import koaRouter from 'koa-router'
import demoController from '../api/demoController'

const router = new koaRouter()

router.prefix('/api')
router.get('/demo', demoController.demo)

export default router
