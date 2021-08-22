const Koa = require('koa')
const parser = require('koa-bodyparser')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')
const { port } = require('./config')
const { responseSuccess, responseError } = require('./core/response')

const app = new Koa()

app.use(async (ctx, next) => {
  ctx.success = responseSuccess.bind(null, ctx);
  ctx.error = responseError.bind(null, ctx);
  await next();
})
app.use(catchError)
app.use(parser())

InitManager.initCore(app)

app.listen(port)