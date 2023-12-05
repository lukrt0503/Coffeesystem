import { Association, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db'
import { Customer } from './customer';
import { User } from './user';

interface FollowingAttributes {
    following_id: number;
    user_id: number;
    customer_id: number;
}

interface FollowingCreationAttributes extends Optional<FollowingAttributes, 'following_id'> { }

class Following extends Model<FollowingAttributes, FollowingCreationAttributes> implements FollowingAttributes {
    public following_id!: number;
    public user_id!: number;
    public customer_id!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
    public readonly user?: User;
    public readonly customer?: Customer;
    public static associations: {
        user: Association<Following, User>;
        customer: Association<Following, Customer>;
    };
    static async getFollowingUsers(userId: number): Promise<any[]> {
        const followings = await Following.findAll({
            where: {
                user_id: userId
            }
        });
        const convertedFollowing = followings.map(async (item) => {
            const user = await User.findByPk(item.user_id);
            const customer = await Customer.findByPk(item.customer_id);
            return {
                customer: {
                    customerId: customer?.customer_id,
                    name: customer?.name,
                    phone: customer?.phone,
                    address: customer?.address,
                    email: customer?.email,
                    avatar: customer?.avatar
                },
                user: {
                    userId: user?.user_id,
                    address: user?.address,
                    email: user?.email,
                    phone: user?.phone,
                    coffeeShopName: user?.coffeeShopName,
                    avatar: user?.avatar
                },
                followed: true
            }
        });
        return Promise.all(convertedFollowing);
    }
    static async getFollowingCustomers(customerId: number): Promise<any[]> {
        const followings = await Following.findAll({
            where: {
                customer_id: customerId
            }
        });
        const convertedFollowing = followings.map(async (item) => {
            const user = await User.findByPk(item.user_id);
            const customer = await Customer.findByPk(item.customer_id);
            return {
                customer: {
                    customerId: customer?.customer_id,
                    name: customer?.name,
                    phone: customer?.phone,
                    address: customer?.address,
                    email: customer?.email,
                    avatar: customer?.avatar
                },
                user: {
                    userId: user?.user_id,
                    address: user?.address,
                    email: user?.email,
                    phone: user?.phone,
                    coffeeShopName: user?.coffeeShopName,
                    avatar: user?.avatar
                },
                followed: true
            }
        });
        return Promise.all(convertedFollowing);
    }

    static async addFollow(followingData: FollowingAttributes): Promise<Following> {
        try {
            const follow = await Following.create(followingData);
            return follow;
        } catch (error) {
            throw new Error('Unable to add follow');
        }
    }

    static async removeFollow(followingData: FollowingAttributes) {
        try {
            await Following.destroy({
                where: {
                    following_id: followingData.following_id,
                    customer_id: followingData.customer_id,
                    user_id: followingData.user_id
                }
            });
            return 0;
        } catch (error) {
            throw new Error('Unable to delete banner');
        }
    }
}

Following.init(
    {
        following_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: 'following',
        sequelize: sequelize,
    }
);
export { Following };
Following.hasOne(User, { foreignKey: 'user_id', as: 'user' });