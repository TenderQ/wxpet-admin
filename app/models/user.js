const { db } = require('../../core/database')
const { Sequelize, Model } = require('sequelize')
const bcrypt = require('bcryptjs')

class User extends Model {
  // 用户登录验证用户名密码
  static async verifyUserNamePassword(username, plainPassword) {
    const user = await User.findOne({
      where: { username }
    })
    if (!user) {
      throw new global.errors.NotFound('用户不存在')
    }
    const correct = bcrypt.compareSync(plainPassword, user.password)
    if (!correct) {
      throw new global.errors.AuthFailed('密码不正确')
    }
    return user
  }

  // 根据微信openid查找用户
  static async getUserByOpenId(openid) {
    const user = await User.findOne({
      where: { openid }
    })
    return user
  }

  // 根据微信openid注册
  static async registerByOpenid(openid) {
    return await User.create({ openid })
  }
}

User.init({
  // 主键
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING(128),
    unique: true
  },
  password: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  phone: Sequelize.BIGINT(11),
  nickname: Sequelize.STRING,
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
  sequelize: db,
  tableName: 'user'
})

module.exports = User