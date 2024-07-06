import { DataTypes, Model, Sequelize } from 'sequelize';

class User extends Model {
  public name !: string;
  public email !: string;
  public password !: string;
  public role_id !: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  id: any;
  Role: any;

  // define association here
  static associate(models: any) {
    User.belongsTo(models.Role, {foreignKey: 'role_id'});
  }
}

export function initUser(sequelize: Sequelize) {
  User.init(
    {
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      role_id: {
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );
  return User;
}

