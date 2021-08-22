const Router = require('koa-router')
const router = new Router()
const { HttpException } = require('../../../core/http-exception')

router.get('/v1/pet/list', (ctx, next) => {

})

router.get('/v1/pet/info/:id', (ctx, next) => {
  const path = ctx.params
  const { query, headers, body } = ctx.request
  ctx.body = path
})

module.exports = router