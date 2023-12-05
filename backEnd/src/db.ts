import { Sequelize } from 'sequelize';
import { createPool, Pool, PoolOptions } from 'mysql2/promise';

const dbConfig: PoolOptions = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'coffee_service',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const dbConnection: Pool = createPool(dbConfig);
export default dbConnection;


const sequelize = new Sequelize({
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'coffee_service',
  pool: {
    ...dbConfig,
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});


export { sequelize };
