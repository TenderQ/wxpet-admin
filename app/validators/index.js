const { Validator, Rule } = require('../../core/validator')
const { RegisterValidator } = require('./user')
const { TokenValidator } = require('./token')
const { LoginType } = require('../lib/enum')

class PositiveIntValidator extends Validator {
  constructor() {
    super()
    this.id = [
      new Rule('isInt', '需要是正整数', { min: 1 })
    ]
  }
}

class NotEmptyValidator extends Validator {
  constructor() {
    super()
    this.token = [
      new Rule('isLength', '不允许为空', { min: 1 })
    ]
  }
}

module.exports = {
  PositiveIntValidator,
  NotEmptyValidator,
  RegisterValidator,
  TokenValidator
}