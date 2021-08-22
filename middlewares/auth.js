const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
const { UserAuth } = require('../app/lib/enum')
const { security } = require('../config')

class Auth {
  constructor(level) {
    this.level = level || 1
    
    Auth.USER = UserAuth.COMMON
    Auth.ADMIN = UserAuth.ADMIN
    Auth.SUPER_ADMIN = UserAuth.SUPER_ADMIN
  }

  get check() {
    // token check
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req)
      let errMsg = 'token不合法'

      if (!userToken || !userToken.name) {
        throw new global.errors.Forbidden()
      }
      try {
        var decode = jwt.verify(userToken.name, security.secretKey)
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          errMsg = 'token已过期'
        }

        throw new global.errors.Forbidden(errMsg)
      }

      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }
      await next()
    }
  }

  // 验证token是否有效
  static verifyToken(token) {
    try {
      jwt.verify(token, security.secretKey)
      return true;
    } catch (e) {
      return false
    }
  }
}

module.exports = Auth