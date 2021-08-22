const { Validator, Rule } = require('../../core/validator')

// Token校验器
class TokenValidator extends Validator {
  constructor() {
    super()

    this.account = [
      new Rule('isLength', '不符合账号规则', { min: 4, max: 32 })
    ]
    // 登录密码，使用微信小程序登录时不需要输入
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength', '至少6个字符', { min: 6, max: 128 })
    ]
  }

  validateLoginType(vals) {
    if (!vals.body.type) {
      throw new Error('type不能为空')
    }
    if (!LoginType.isThisType(vals.body.type)) {
      throw new Error('type参数不合法')
    }
  }
}

module.exports = {
  TokenValidator
}