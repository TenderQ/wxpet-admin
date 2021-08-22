const axios = require('axios')
const util = require('util')
const { wxapp } = require('../../config')
const { generateToken } = require('../../core/utils')
const { UserAuth } = require('../lib/enum')
const User = require('../models/user')

class WXManager {
  static async codeToToken(code) {
    const url = util.format(wxapp.loginUrl, wxapp.appId, wxapp.appSecret, code)

    const result = await axios.get(url)
    if (result.status !== 200) {
      throw new global.errors.AuthFailed('openid获取失败')
    }
    const { errcode, errmsg } = result.data.errcode
    if (errcode) {
      throw new global.errors.AuthFailed('openid获取失败: ' + errmsg, errcode)
    }

    const user = User.getUserByOpenId(result.data.openid)
    if (!user) {
      user = User.registerByOpenid(result.data.openid)
    }
    return generateToken(user.id, UserAuth.COMMON)
  }
}

module.exports = WXManager