import { Association, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db'
import { Event } from './event';
import { News } from './news';
import { Service } from './service';

interface GroupImageAttributes {
    groupImage_id: number;
    image_id: number;
}

interface GroupImageCreationAttributes extends Optional<GroupImageAttributes, 'groupImage_id'> { }

class GroupImage extends Model<GroupImageAttributes, GroupImageCreationAttributes> implements GroupImageAttributes {
    public groupImage_id!: number;
    public image_id!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
    public readonly event?: Event;
    public readonly news?: News;
    public readonly service?: Service;
    public static associations: {
        events: Association<GroupImage, Event>;
        news: Association<GroupImage, News>;
        service: Association<GroupImage, Service>;
    };
}

GroupImage.init(
    {
        groupImage_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        image_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: 'groupImage',
        sequelize: sequelize,
    }
);
export { GroupImage };

Service.belongsTo(GroupImage, { foreignKey: 'groupImage_id', as: 'groupImage' });
News.belongsTo(GroupImage, { foreignKey: 'groupImage_id', as: 'groupImage' });
GroupImage.hasOne(News, { foreignKey: 'groupImage_id', as: 'news' });
GroupImage.hasOne(Service, { foreignKey: 'groupImage_id', as: 'service' });
// GroupImage.hasOne(Event, { foreignKey: 'groupImage_id', as: 'event' });