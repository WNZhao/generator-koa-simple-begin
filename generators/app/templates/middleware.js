const Koa = require("koa");
const app = new Koa();

const middleware = function(ctx, next) {
  console.log("this is a middleware!");
  console.log(ctx.request.path);
  // next();
};

const middleware1 = function(ctx, next) {
  console.log("this is a middleware11!");
  console.log(ctx.request.path);
  next();
};
const middleware2 = function(ctx, next) {
  console.log("this is a middleware22!");
  console.log(ctx.request.path);
  next();
};
app.use(middleware1)
app.use(middleware2)
app.use(middleware)
app.listen(3000)
