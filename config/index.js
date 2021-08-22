module.exports = {
  environment: 'dev', // dev or prod
  port: 4000,
  database: {
    host: '127.0.0.1',
    port: 3306,
    dbName: 'wxpet',
    user: 'root',
    password: '123456'
  },
  security: {
    secretKey: 'CyVtNnpwlzCAhWqwsyLELI3MYPMFbDwcu5nRzdRCeJ0mP6Ri9x6XK4',
    expiresIn: 60 * 60 * 24 * 30
  },
  // 微信小程序设置
  wxapp: {
    appId: '',
    appSecret: '',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  }
}