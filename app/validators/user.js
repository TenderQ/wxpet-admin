const { Validator, Rule } = require('../../core/validator')
const User = require('../models/user')

class RegisterValidator extends Validator {
  constructor() {
    super()

    this.username = [
      new Rule('isLength', '名称长度必须在4~32之间', {
        min: 4,
        max: 32
      })
    ]
    this.email = [
      new Rule('isEmail', 'Email格式错误')
    ]
    this.phone = [
      new Rule('isOptional'),
      new Rule('isMobilePhone', '电话号码格式错误')
    ]
    this.password1 = [
      new Rule('isLength', '密码至少6个字符，最20个字符', {
        min: 6,
        max: 20
      }),
      new Rule('matches', '密码需要包含字母、数字和特殊字符', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]
    this.password2 = this.password1
    this.nickname = [
      new Rule('isOptional'),
      new Rule('isLength', '昵称长度必须在4~32之间', {
        min: 4,
        max: 32
      })
    ]
  }

  validatePassword(vals) {
    const psw1 = vals.body.password1
    const psw2 = vals.body.password2
    if (psw1 !== psw2) {
      throw new Error('两次输入的密码不一致，请重新输入')
    }
  }

  async validateEmail(vals) {
    const email = vals.body.email
    const user = await User.findOne({
      where: { email }
    })
    if (user) {
      throw new Error('Email已存在')
    }
  }

  async validateUsername(vals) {
    const username = vals.body.username
    const user = await User.findOne({
      where: { username }
    })
    if (user) {
      throw new Error('用户已存在')
    }
  }
}

module.exports = {
  RegisterValidator
}