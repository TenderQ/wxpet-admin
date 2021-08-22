const { HttpException } = require('../core/http-exception')
const { responseError } = require('../core/response')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    // 开发环境
    const isHttpException = error instanceof HttpException
    const isDev = global.config.environment === 'dev'
    const requestUrl = `${ctx.method} ${ctx.path}`

    if (isDev && !isHttpException) {
      throw error
    }

    // 生成环境
    if (isHttpException) {
      ctx.error({
        code: error.code,
        message: error.msg,
        errorCode: error.errorCode,
        request: requestUrl
      })
    } else {
      ctx.error(500, '出现了未知情况!')
    }
  }
}

module.exports = catchError