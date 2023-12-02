import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import { User } from '../user/user.model';

export interface TokenAttributes {
  refreshToken: string;
  userId: number;
}

class Token extends Model<TokenAttributes> implements TokenAttributes {
  public refreshToken!: string;
  public userId!: number;

}

Token.init(
  {
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: User,
        key: 'userId',
      },
    },
  },
  {
    sequelize,
    tableName: 'tokens',
  }
);


//   Token.belongsTo(User, { foreignKey: 'userId' });
  
//   Token.sync()
//     .then(() => {
//       console.log('Таблица пользователей (Tokens) создана или уже существует');
//     })
//     .catch((error) => {
//       console.error('Ошибка при создании таблицы пользователей:', error);
//     });
  
  export { Token };