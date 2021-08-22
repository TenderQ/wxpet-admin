const { unset } = require('lodash')
const defaultResponse = {
  code: 200,
  data: [],
  message: 'success'
};

/**
 * response
 * @param ctx
 * @param data 返回数据
 * @param code 必须。错误码 || [错误码, 错误描述] 100-999
 * @param message 错误描述 , 可以传入自定义对象
 */
const response = (ctx, data, code, message) => {
  let responseBody = {
    code,
    data,
    message
  }
  if (typeof code === 'string') {
    responseBody.message = code
    responseBody.code = defaultResponse.code
  }
  if (typeof code === 'object') {
    responseBody = Object.assign({}, defaultResponse, responseBody, code)
  }
  if (data === null) {
    unset(responseBody, 'data')
  }
  ctx.body = responseBody
  ctx.status = responseBody.code
}

/**
 * response 成功
 * @param ctx
 * @param data 数据
 * @param code 错误码 || [错误码, 错误描述]
 * @param message 错误描述
 */
function responseSuccess(ctx, data, code = 200, message = 'success') {
  // 传入字符串时默认为message参数
  if (arguments.length === 2 && typeof data === 'string') {
    message = data
    data = null
  }
  if (typeof code === 'object') {
    code = Object.assign({
      message: 'success',
      code: 200
    }, code)
  }
  response(ctx, data, code, message)
}

/**
 * response 异常
 * @param ctx
 * @param code 错误码 || [错误码, 错误描述]
 * @param message 错误描述
 */
function responseError(ctx, code = 500, message = 'error') {
  if (typeof code === 'object') {
    code = Object.assign({
      message: 'error',
      code: 500
    }, code)
  }
  response(ctx, null, code, message);
}

module.exports = {
  responseSuccess,
  responseError
}