import { DataTypes, Model, Sequelize } from 'sequelize';

class Role extends Model {
  public name !: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // define association here
  static associate(models: any) {
  }
}

export function initRole(sequelize: Sequelize) {
  Role.init(
    {
      name: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'Roles',
    }
  );
  return Role
}
