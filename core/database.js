const Sequelize = require('sequelize')
const {
  host,
  port,
  dbName,
  user,
  password
} = require('../config').database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: true,
  define: {
    timestamps: true,
    paranoid: true,
    createdAt: 'create_time',
    updatedAt: 'update_time',
    deletedAt: 'delete_time',
    underscored: true
  }
})

sequelize.sync()

module.exports = {
  db: sequelize
}