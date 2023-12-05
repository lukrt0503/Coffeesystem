import { Association, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db'
import { Admin } from './admin';
import { Customer } from './customer';

interface AccountAttributes {
    account_id: number;
    username: string;
    password: string;
    is_banned: boolean;
    forget_code: string;
}

interface AccountCreationAttributes extends Optional<AccountAttributes, 'account_id'> { }

class Account extends Model<AccountAttributes, AccountCreationAttributes> implements AccountAttributes {
    public account_id!: number;
    public username!: string;
    public password!: string;
    public is_banned!: boolean;
    public forget_code!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
    public readonly admin?: Admin;
    public readonly customers?: Customer[];
    public static associations: {
        admin: Association<Account, Admin>;
        customers: Association<Account, Customer>;
    };
}

Account.init(
    {
        account_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: new DataTypes.STRING(20),
            allowNull: false,
        },
        password: {
            type: new DataTypes.STRING(20),
            allowNull: false,
        },
        is_banned: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        forget_code: {
            type: new DataTypes.STRING(10),
            allowNull: false,
        },
    },
    {
        tableName: 'account',
        sequelize: sequelize,
    }
);
export { Account };
Admin.belongsTo(Account, { foreignKey: 'account_id', as: 'account' });
Account.hasOne(Admin, { foreignKey: 'account_id', as: 'admin' });