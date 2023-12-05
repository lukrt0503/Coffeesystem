import { Association, DataTypes, Model, Optional, Op } from "sequelize";
import { sequelize } from "../db";
import { Account } from "./account";
import { Following } from "./following";
import { Schedule } from "./schedule";
import { Waiting } from "./waiting";

export interface CustomerAttributes {
  customer_id: number;
  name: string;
  phone: string;
  address: string;
  email: string;
  account_id: number;
  avatar: string;
  age: number;
}

interface CustomerCreationAttributes
  extends Optional<CustomerAttributes, "customer_id"> {}

class Customer
  extends Model<CustomerAttributes, CustomerCreationAttributes>
  implements CustomerAttributes
{
  public customer_id!: number;
  public name!: string;
  public phone!: string;
  public address!: string;
  public email!: string;
  public account_id!: number;
  public avatar!: string;
  public age!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public readonly account?: Account;
  public readonly followings?: Following[];
  public readonly schedules?: Schedule[];
  public readonly waiting?: Waiting;
  public static associations: {
    account: Association<Customer, Account>;
    followings: Association<Customer, Following>;
    schedules: Association<Customer, Schedule>;
    waiting: Association<Customer, Waiting>;
  };
  static async getCustomers(): Promise<Customer[]> {
    const customers = await Customer.findAll();
    return customers;
  }
  static async searchCustomers(name: string): Promise<Customer[]> {
    try {
      const customers = await Customer.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
      });
      return customers;
    } catch (error) {
      console.error(error);
      throw new Error("Error searching customers");
    }
  }
  static async detailCustomer(customer_id: number): Promise<Customer | null> {
    try {
      const customer = await Customer.findByPk(customer_id);
      return customer;
    } catch (error) {
      throw new Error("Not found");
    }
  }
  static async updateCustomer(
    updatedData: Partial<CustomerAttributes>
  ): Promise<[number, Customer[]]> {
    try {
      const [updatedRowsCount, updatedCustomer] = await Customer.update(
        updatedData,
        {
          where: { customer_id: updatedData.customer_id },
          returning: true,
        }
      );

      if (
        updatedRowsCount === 0 ||
        !updatedCustomer ||
        updatedCustomer.length === 0
      ) {
        throw new Error("Banner not found or unable to update");
      }

      return [updatedRowsCount, updatedCustomer];
    } catch (error) {
      throw new Error("Unable to update banner");
    }
  }
  static async getCustomersBanned() {
    try {
      const customers = await Customer.findAll({
        include: [
          {
            model: Account,
            as: "account",
            where: { is_banned: 1 },
          },
        ],
      });
      return customers;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching banned customers");
    }
  }
}

Customer.init(
  {
    customer_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
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
      type: new DataTypes.STRING(150),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(30),
      allowNull: false,
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    avatar: {
      type: new DataTypes.STRING(1045),
      allowNull: false,
    },
  },
  {
    tableName: "customer",
    sequelize: sequelize,
  }
);
export { Customer };
//Customer
Account.hasMany(Customer, { foreignKey: "account_id", as: "customers" });
Customer.belongsTo(Account, { foreignKey: "account_id", as: "account" });
//Following
Following.belongsTo(Customer, { foreignKey: "customer_id", as: "customer" });
Customer.hasMany(Following, { foreignKey: "customer_id", as: "followings" });
//Schedule
Schedule.belongsTo(Customer, { foreignKey: "customer_id", as: "customer" });
Customer.hasMany(Schedule, { foreignKey: "customer_id", as: "schedules" });
//Waiting
Waiting.belongsTo(Customer, { foreignKey: "customer_id", as: "customer" });
Customer.hasMany(Waiting, { foreignKey: "customer_id", as: "waiting" });
