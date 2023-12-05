import { Association, DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db";
import { Customer } from "./customer";
import { User } from "./user";

interface WaitingAttributes {
  waiting_id: number;
  customer_id: number;
  address: string;
  email: string;
  phone: string;
  status: number;
  coffeeShopName: string;
}

interface WaitingCreationAttributes
  extends Optional<WaitingAttributes, "waiting_id"> {}

class Waiting
  extends Model<WaitingAttributes, WaitingCreationAttributes>
  implements WaitingAttributes
{
  public waiting_id!: number;
  public customer_id!: number;
  public address!: string;
  public email!: string;
  public phone!: string;
  public coffeeShopName!: string;
  public status!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public readonly customer?: Customer;
  public static associations: {
    customer: Association<Waiting, Customer>;
  };
  static async requestWaiting(waitingData: any) {
    try {
      const newWaiting = await Waiting.create(waitingData);
      return newWaiting;
    } catch (error) {
      console.log(error);
      throw new Error("Unable to new waiting");
    }
  }
  static async acceptWaiting(waitingData: any) {
    try {
      const acceptWaiting = await User.create(waitingData);
      return acceptWaiting;
    } catch (error) {
      console.log(error);
      throw new Error("Unable to accept waiting");
    }
  }
  static async denyWaiting(id: any) {
    try {
      const denyWaiting = await Waiting.destroy({
        where: { waiting_id: id },
      });
      return denyWaiting;
    } catch (error) {
      console.log(error);
      throw new Error("Unable to new waiting");
    }
  }
}

Waiting.init(
  {
    waiting_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
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
    phone: {
      type: new DataTypes.STRING(15),
      allowNull: false,
    },
    coffeeShopName: {
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "waiting",
    sequelize: sequelize,
  }
);
export { Waiting };