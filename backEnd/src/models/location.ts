import { Association, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db'
import { Event } from './event';
import { User } from './user';

interface LocationAttributes {
    location_id: number;
    address: string;
    user_id: number;
}

interface LocationCreationAttributes extends Optional<LocationAttributes, 'location_id'> { }

class Location extends Model<LocationAttributes, LocationCreationAttributes> implements LocationAttributes {
    public location_id!: number;
    public address!: string;
    public user_id!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
    public readonly user?: User;
    public readonly events?: Event[];
    public static associations: {
        user: Association<Location, User>;
        events: Association<Location, Event>;
    };
    static async listLocation(): Promise<Location[]> {
        const locations = await Location.findAll();
        return locations
    }
    static async listLocationById(locationId: number): Promise<Location[]> {
        const locations = await Location.findAll({
            where: { location_id: locationId }
        });
        return locations
    }
    static async addLocation(locationData: LocationCreationAttributes): Promise<Location> {
        try {
            const location = await Location.create(locationData);
            return location;
        } catch (error) {
            throw new Error('Unable to add location');
        }
    }
    static async deleteLocation(locationId: number) {
        try {
            await Location.destroy({
                where: { location_id: locationId },
            });
            return 0;
        } catch (error) {
            throw new Error('Unable to delete banner');
        }
    }
}

Location.init(
    {
        location_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        address: {
            type: new DataTypes.STRING(1045),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'location',
        sequelize: sequelize,
    }
);
export { Location };