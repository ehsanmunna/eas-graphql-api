const Sequelize = require('sequelize');
const { database, user, password, host } = require('./connection-input');
const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mssql'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
    logging: console.log,
    timezone: '+06:00', // for writng
  });

// const sequelize = new Sequelize(`mssql://${user}:${password}@${host}/${database}`);

testConnection();

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = sequelize;