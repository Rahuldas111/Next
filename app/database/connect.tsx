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
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Validate the server's certificate against the CA
      ca: process.env.NEXT_CA_PEM
    }
  }
});

export default sequelize;