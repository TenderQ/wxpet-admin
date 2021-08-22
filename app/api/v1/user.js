const Router = require('koa-router')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

const { RegisterValidator } = require('../../validators')
const Auth = require('../../../middlewares/auth')

const router = new Router({
  prefix: '/v1/user'
})

// 注册
router.post('/register', async (ctx) => {
  const context = await new RegisterValidator().validate(ctx)
  const { username, nickname, password2, email, phone } = context.data.body
  const salt = bcrypt.genSaltSync(10)
  const password = bcrypt.hashSync(password2, salt) // 密码加密
  const user = {
    username,
    nickname,
    email,
    phone,
    password
  }
  const result = await User.create(user)
  ctx.success({}, '注册成功')
})

// 登录
router.post('/login', new Auth().check, async (ctx) => {
  ctx.success(ctx.auth)
})

module.exports = router