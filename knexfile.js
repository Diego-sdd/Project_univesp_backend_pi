// Update with your config settings.

const databaseConfig = require('./src/config/database');

module.exports = {
  development: {
    client: 'mysql',
    connection: databaseConfig.default,
    searchPath: ['public'],
    migrations: {
      directory: './src/database/migrations',
    },
  },

  production: {
    client: 'mysql',
    connection: { ...databaseConfig.default, ssd: true },
    searchPath: ['public'],
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './src/database/migrations',
      tableName: 'knex_migrations',
    },
  },
};