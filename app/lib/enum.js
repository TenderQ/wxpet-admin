function isThisType(val) {
  for (let key in this) {
    if (this[key] === val) {
      return true
    }
  }
  return false
}

// 登陆类型
const LoginType = {
  USER_NAME: 100,
  USER_EMAIL: 101,
  USER_MOBILE: 102,
  ADMIN_NAME: 200,
  USER_MINI_PROGRAM: 1001,
  isThisType
}

// 用户权限设置
const UserAuth = {
  COMMON: 8,
  ADMIN: 16,
  SUPER_ADMIN: 32
}

module.exports = {
  LoginType,
  UserAuth
}