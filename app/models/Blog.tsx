import { DataTypes, Model, Sequelize } from 'sequelize';

class Blog extends Model {
  public cat_id !: String;
  public sub_cat_id !: String;
  public title !: string;
  public sub_title !: string;
  public slug !: string;
  public description !: string;
  public image !: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // define association here
  static associate(models: any) {
    Blog.belongsTo(models.Category, {foreignKey: 'cat_id'});
    Blog.belongsTo(models.SubCategory, {foreignKey: 'sub_cat_id'});
  }
}

export function initBlog(sequelize: Sequelize) {
  Blog.init(
    {
      cat_id: {
        type: DataTypes.STRING
      },
      sub_cat_id: {
        type: DataTypes.STRING
      },
      title: {
        type: DataTypes.STRING
      },
      sub_title: {
        type: DataTypes.STRING
      },
      slug: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.STRING
      },
    },
    {
      sequelize,
      modelName: 'Blogs',
    }
  );
  return Blog;
}

