import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  database: 'postgres',
  username: 'postgres',
  password: '12345',
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  dialectModule: require('pg'),
  logging: false,
});

export default sequelize;