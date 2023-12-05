import { Association, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db'
import { GroupImage } from './groupImage';
import { User } from './user';

interface ServiceAttributes {
    service_id: number;
    name: string;
    description: string;
    user_id: number;
    groupImage_id: number;
}

interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'service_id'> { }

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
    public service_id!: number;
    public name!: string;
    public description!: string;
    public user_id!: number;
    public groupImage_id!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
    public readonly user?: User;
    public readonly groupImage?: GroupImage;
    public static associations: {
        user: Association<Service, User>;
        groupImage: Association<Service, GroupImage>;
    };
    static async listServices(): Promise<Service[]> {
        const services = await Service.findAll();
        return services
    }
    static async getUserServices(userId: number): Promise<Service[]> {
        const services = await Service.findAll({
            where: {
                user_id: userId
            }
        });
        return services
    }
    static async detailService(news_id: number): Promise<Service | null> {
        try {
            const services = await Service.findByPk(news_id);
            return services;
        } catch (error) {
            throw new Error('Not found');
        }
    }
    static async addService(newsData: any): Promise<Service> {
        try {
            const services = await Service.create(newsData);
            return services;
        } catch (error) {
            console.log(error)
            throw new Error('Unable to add services');
        }
    }
    static async updateService(updatedData: Partial<ServiceAttributes>): Promise<[number, Service[]]> {
        try {
            const [updatedRowsCount, updatedServices] = await Service.update(updatedData, {
                where: { service_id: updatedData.service_id },
                returning: true,
            });

            if (updatedRowsCount === 0 || !updatedServices || updatedServices.length === 0) {
                throw new Error('Banner not found or unable to update');
            }

            return [updatedRowsCount, updatedServices];
        } catch (error) {
            throw new Error('Unable to update banner');
        }
    }
    static async removeService(serviceId: number) {
        try {
            await Service.destroy({
                where: { service_id: serviceId },
            });
            return 0;
        } catch (error) {
            throw new Error('Unable to delete news');
        }
    }
}

Service.init(
    {
        service_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(50),
            allowNull: false,
        },
        description: {
            type: new DataTypes.STRING(1045),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        groupImage_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: 'service',
        sequelize: sequelize,
    }
);
export { Service };
