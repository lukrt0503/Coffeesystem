import { Association, DataTypes, Model, Op, Optional } from "sequelize";
import { sequelize } from "../db";
import { Account } from "./account";
import { Banner } from "./banner";
import { Event } from "./event";
import { Following } from "./following";
import { Location } from "./location";
import { News } from "./news";
import { Service } from "./service";
import { Customer } from "./customer";

interface UserAttributes {
  user_id: number;
  address: string;
  email: string;
  phone: string;
  coffeeShopName: string;
  account_id: number;
  avatar: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "user_id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public user_id!: number;
  public address!: string;
  public email!: string;
  public phone!: string;
  public coffeeShopName!: string;
  public account_id!: number;
  public avatar!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public readonly account?: Account[];
  public readonly locations?: Location[];
  public readonly banners?: Banner[];
  public readonly events?: Event[];
  public readonly followings?: Following[];
  public readonly news?: News[];
  public readonly services?: Service[];
  public static associations: {
    account: Association<User, Account>;
    locations: Association<User, Location>;
    banners: Association<User, Banner>;
    events: Association<User, Event>;
    followings: Association<User, Following>;
    news: Association<User, News>;
    services: Association<User, Service>;
  };
  static async getUsers(): Promise<User[]> {
    const users = await User.findAll();
    return users;
  }
  static async searchUsers(name: string): Promise<User[]> {
    try {
      const users = await User.findAll({
        where: {
          coffeeShopName: {
            [Op.like]: `%${name}%`,
          },
        },
      });
      return users;
    } catch (error) {
      console.error(error);
      throw new Error("Error searching customers");
    }
  }
  static async detailUser(user_id: number): Promise<User | null> {
    try {
      const user = await User.findByPk(user_id);
      return user;
    } catch (error) {
      throw new Error("Not found");
    }
  }
  static async updateUser(
    updatedData: Partial<UserCreationAttributes>
  ): Promise<[number, any[]] | null> {
    try {
      const account = await Account.findByPk(updatedData.user_id);
      if (account) {
        const user = await User.findOne({
          where: { account_id: account.account_id },
        });
        const customer = await Customer.findOne({
          where: { account_id: account.account_id },
        });
        if (user) {
          const [updatedRowsCount, updatedUser] = await User.update(
            updatedData,
            {
              where: { user_id: user?.user_id },
              returning: true,
            }
          );

          if (
            updatedRowsCount === 0 ||
            !updatedUser ||
            updatedUser.length === 0
          ) {
            throw new Error("Banner not found or unable to update");
          }
          return [updatedRowsCount, updatedUser];
        } else {
          const [updatedRowsCount, updatedCustomer] = await Customer.update(
            updatedData,
            {
              where: { customer_id: customer?.customer_id },
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
        }
      }
      return null;
    } catch (error) {
      throw new Error("Unable to update banner");
    }
  }
  static async getUsersBanned() {
    try {
      const users = await User.findAll({
        include: [
          {
            model: Account,
            as: "account",
            where: { is_banned: 1 },
          },
        ],
      });
      return users;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching banned users");
    }
  }
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    address: {
      type: new DataTypes.STRING(150),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(30),
      allowNull: false,
    },
    phone: {
      type: new DataTypes.STRING(15),
      allowNull: false,
    },
    coffeeShopName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    avatar: {
      type: new DataTypes.STRING(1045),
      allowNull: false,
    },
  },
  {
    tableName: "user",
    sequelize: sequelize,
  }
);
export { User };

//Location
Location.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(Location, { foreignKey: "user_id", as: "locations" });
//Service
Service.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(Service, { foreignKey: "user_id", as: "services" });
//News
News.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(News, { foreignKey: "user_id", as: "news" });

User.belongsTo(Account, { foreignKey: "account_id", as: "account" });
// User.hasMany(Banner, { foreignKey: 'user_id', as: 'banners' });
//Event
Event.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(Event, { foreignKey: "user_id", as: "events" });
