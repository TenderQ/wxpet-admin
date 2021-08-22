const requireDirectory = require('require-directory')
const Router = require('koa-router')

// app初始化管理器
class InitManager {
  static initCore(app) {
    // 入口方法
    InitManager.app = app
    
    InitManager.initLoadRouters()
    InitManager.loadHttpException()
    InitManager.loadConfig()
  }

  // 初始化路由
  static initLoadRouters() {
    const apiDir = `${process.cwd()}/app/api`
    requireDirectory(module, apiDir, {
      visit: whenLoadModule
    })
    
    function whenLoadModule(module) {
      if (module instanceof Router) {
        InitManager.app.use(module.routes())
      }
    }
  }

  static loadHttpException() {
    const errors = require('./http-exception')
    global.errors = errors
  }

  static loadConfig(path = '') {
    const configPath = path || process.cwd() + '/config'
    const config = require(configPath)
    global.config = config
  }
}

module.exports = InitManager