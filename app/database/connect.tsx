import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  database: process.env.NEXT_DATABASE,
  username: process.env.NEXT_USERNAME,
  password: process.env.NEXT_PASSWORD,
  host: process.env.NEXT_HOST,
  port:  Number(process.env.NEXT_PORT),
  dialect: 'postgres',
  dialectModule: require('pg'),
  logging: false,
});

export default sequelize;