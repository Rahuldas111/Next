import { initUser } from './User';
import { initRole } from './Role';
import { initCategory } from './Category';
import { initSubCategory } from './SubCategory';
import { initBlog } from './Blog';
import sequelize from '../database/connect';

const models = {
  User: initUser(sequelize),
  Role: initRole(sequelize),
  Category: initCategory(sequelize),
  SubCategory: initSubCategory(sequelize),
  Blog: initBlog(sequelize)
};


Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models));

export { sequelize, models };