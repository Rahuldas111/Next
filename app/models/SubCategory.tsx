import { DataTypes, Model, Sequelize } from 'sequelize';

class SubCategory extends Model {
  public cat_id !: String;
  public name !: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // define association here
  static associate(models: any) {
    SubCategory.belongsTo(models.Category, {foreignKey: 'cat_id'});
  }
}

export function initSubCategory(sequelize: Sequelize) {
  SubCategory.init(
    {
      cat_id: {
        type: DataTypes.STRING
      },
      name: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'SubCategories',
    }
  );
  return SubCategory;
}

