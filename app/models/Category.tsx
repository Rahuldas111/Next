import { DataTypes, Model, Sequelize } from 'sequelize';

class Category extends Model {
  public name !: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // define association here
  static associate(models: any) {
    // User.belongsTo(models.Role, {foreignKey: 'role_id'});
  }
}

export function initCategory(sequelize: Sequelize) {
  Category.init(
    {
      name: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'Categories',
    }
  );
  return Category;
}

