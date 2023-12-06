import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import { Token } from '../token/token.model';
import { Employee } from '../employee/employee.model';

export interface UserAttributes {
    userId: number;
    password: string;
    email: string;
    isActivated: boolean;
    role: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
    public userId!: number;
    public password!: string;
    public email!: string;
    public isActivated!: boolean;
    public role!: string

   
}

User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActivated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true,
        },

    },
    {
        sequelize,
        tableName: 'users',
    }
);

User.hasOne(Token, {
    foreignKey: 'userId',
  });
  
  // Token.belongsTo(User, {
  //   foreignKey: 'userId',
  // });

  Employee.belongsTo(User, {
    foreignKey: 'userId',
  });






  User.sync()
  .then(() => {
    console.log('Таблица пользователей (users) создана или уже существует');
    // Token.sync()
    //   .then(() => {
    //     console.log('Таблица токенов (tokens) создана или уже существует');
    //   })
    //   .catch((error) => {
    //     console.error('Ошибка при создании таблицы токенов:', error);
    //   });
      Employee.sync()
      .then(() => {
        console.log('Таблица сотрудников (Employee) создана или уже существует');
      })
      .catch((error) => {
        console.error('Ошибка при создании таблицы сотрудников:', error);
      });
  })
  .catch((error) => {
    console.error('Ошибка при создании таблицы пользователей:', error);
  });

export { User };
