const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const cors = require('@koa/cors')
const koaBody = require('koa-body')
const json = require('koa-json')

router.get('/', ctx => {
  console.log(ctx)
  console.log(ctx.request)
  ctx.body = 'Hello world'
})

router.post('/api/user', async (ctx) => {
  let {body} = ctx.request
  let header = ctx.header
  ctx.response.type = 'json'
  if (!header.role || header.role != 'admin') {
    // ctx.throw(401,'unauthorized post',{code:401,msg:'unauthorized post'})
    // ctx.throw(401,{code:-1,message:'unauthorized post'})
    ctx.throw(401, 'unauthorized post', {code: 401, message: 'unauthorized post'})
  }

  const {name, email} = body
  if (!name || !email) {
    ctx.throw(404, 'name and email not allwon', {code: 404, message: 'name 和 email 不能为空'})
  }
  ctx.response.status = 200
  ctx.response.body = {
    code: 200,
    data: {
      name: name,
      email: email
    },
    message: 'ok'
  }
})

// post 时 使用 await data = await parsePostData(ctx) ,如果不用body-parse中间件时这么用
function parsePostData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postData = '';
      ctx.req.on('data', (dataChunk) => {
        console.log('收到数据----->' + dataChunk)
        postData += dataChunk
      })
      ctx.req.on('end', () => {
        console.log('收到数据----->' + postData)
        resolve(postData)
      })
    } catch (e) {
      reject(e)
    }
  })

}


router.get('/api', ctx => {
  console.log(ctx)
  console.log(ctx.request)
  const params = ctx.request.query
  console.log(params.name)
  console.log(params.age)
  ctx.body = {
    name: params.name,
    age: params.age
  }
})

router.get('/async', async (ctx) => {
  let result = await new Promise(resolve => {
    setTimeout(() => {
      resolve('Hello world 2s later!')
    }, 2000)
  })
  ctx.body = result
})

router.post('/post', async (ctx) => {
  let {body} = ctx.request;
  console.log(body)
  console.log(ctx.request)
  ctx.body = {
    ...body
  }
})

// 处理 error 拦截 各种错误
const handler = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500
    ctx.response.body = {
      code: ctx.response.status,
      message: err.message
    }
  }
}

app.use(koaBody())
app.use(cors())
app.use(handler)
app.use(json({pretty: false, param: 'pretty'}))
app.use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
