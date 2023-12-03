import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import { User } from '../user/user.model';

export interface EmployeeAttributes {
    userId: number,
    firstName: string,
    lastName: string;
    position: string;
}




class Employee extends Model<EmployeeAttributes> implements EmployeeAttributes {
    public userId!: number;
    public firstName!: string;
    public lastName!: string;
    public position!: string;
}


Employee.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: User,
                key: 'userId',
            },
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
    },
    {
        sequelize,
        tableName: 'employee',
    }
)


export {Employee};