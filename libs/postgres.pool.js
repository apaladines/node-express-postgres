const { Pool } = require('pg');
const { config } = require('./../config/config');

let URI = '';
const options = {}
if (config.isProd) {
  options.connectionString = config.dbUrl;
  options.ssl = {
    rejectUnauthorized: false
  }
} else {
  const USER = encodeURIComponent(config.dbUser);
  const PASS = encodeURIComponent(config.dbPassword);
  const URI = `postgres://${USER}:${PASS}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
  options.connectionString = URI;
}

// const pool = new Pool({
//   host: 'localhost',
//   port: 5432,
//   user: 'admin',
//   password: 'admin123',
//   database: 'my_store_db'
// });

const pool = new Pool(options);

module.exports = pool;
