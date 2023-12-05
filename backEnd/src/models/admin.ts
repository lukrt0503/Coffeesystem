import { Association, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db'
import { Account } from './account';

interface AdminAttributes {
    admin_id: number;
    account_id: number;
    name: string;
    phone: string;
    address: string;
    email: string;
}

interface AdminCreationAttributes extends Optional<AdminAttributes, 'admin_id'> { }

class Admin extends Model<AdminAttributes, AdminCreationAttributes> implements AdminAttributes {
    public admin_id!: number;
    public account_id!: number;
    public name!: string;
    public phone!: string;
    public address!: string;
    public email!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
    public readonly account?: Account;
    public static associations: {
        account: Association<Admin, Account>;
    };
}

Admin.init(
    {
        admin_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        account_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: new DataTypes.STRING(30),
            allowNull: false,
        },
        phone: {
            type: new DataTypes.STRING(15),
            allowNull: false,
        },
        address: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: new DataTypes.STRING(30),
            allowNull: false,
        },
    },
    {
        tableName: 'admin',
        sequelize: sequelize,
    }
);
export { Admin };
