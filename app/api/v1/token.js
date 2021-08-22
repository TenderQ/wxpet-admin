const Router = require('koa-router')
const { TokenValidator, NotEmptyValidator } = require('../../validators')
const { LoginType, UserAuth } = require('../../lib/enum')
const User = require('../../models/user')
const { generateToken } = require('../../../core/utils')
const WXManager = require('../../services/wx')
const Auth = require('../../../middlewares/auth')

const router = new Router({
  prefix: '/v1/token'
})

// 获取Token
router.post('/', async (ctx) => {
  const context = await new TokenValidator().validate(ctx)
  const { type, account, secret } = context.data.body
  let token
  switch(type) {
    case LoginType.USER_NAME:
      token = await usernameLogin(account, secret)
      break
    case LoginType.USER_MINI_PROGRAM:
      token = await WXManager.codeToToken(account)
      break
    case LoginType.ADMIN_NAME:
      break
    default:
      throw new global.errors.ParameterException('无法使用此登录方式')
  }

  ctx.success(token)
})

router.post('/verify', async (ctx) => {
  const v = await new NotEmptyValidator().validate(ctx)
  const result = Auth.verifyToken(v.data.body.token)
  ctx.success('token验证通过')
})

async function usernameLogin(account, secret) {
  const user = await User.verifyUserNamePassword(account, secret)
  return generateToken(user.id, UserAuth.COMMON)
}

module.exports = router