import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db'

interface ImageAttributes {
    image_id: number;
    image: string;
}

interface ImageCreationAttributes extends Optional<ImageAttributes, 'image_id'> { }

class Image extends Model<ImageAttributes, ImageCreationAttributes> implements ImageAttributes {
    public image_id!: number;
    public image!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Image.init(
    {
        image_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        image: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        }
    },
    {
        tableName: 'image',
        sequelize: sequelize,
    }
);

export { Image };
